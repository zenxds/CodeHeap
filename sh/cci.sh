#!/bin/bash
# variables
export IMG_NAME=harbor.dx-corp.top/${CI_PROJECT_NAMESPACE}/${CI_PROJECT_NAME}
export IMG_VERSION=${CI_COMMIT_TAG:-${CI_COMMIT_REF_NAME/\//_}}
export SQL_BRANCH=${CI_COMMIT_TAG:-$CI_COMMIT_REF_NAME}
export COMMON_BRANCH=${CI_COMMIT_TAG:-$CI_COMMIT_REF_NAME}
export GIT_READ_TOKEN=AEqyV6xPKHEzes63BW7i
export DB_HOST=mysql-2.dx.corp
export DB_PORT=3306
export DB_NAME=ctu_atest_${CI_JOB_ID}
export DB_USER=ctu
export DB_PASSWORD=cTu123456
export DB_ADMIN_USER=root
export DB_ADMIN_PASSWD=ScTu31*
export HARBOR_USER=ci
export HARBOR_PASSWD=CciPci123
export TAF_RUNNER=harbor.dx-corp.top/aladdin/taf:0.2.4

export TAO_API=http://tao.dx.corp:19898/api/v1
export TAO_QS=namespace=${CI_PROJECT_NAMESPACE}\&project=${CI_PROJECT_NAME}\&branch=${CI_COMMIT_REF_NAME}\&owner=${CI_PIPELINE_ID}\&project_id=${CI_PROJECT_ID}

# internal variables
_lock_url="${TAO_API}/cci/lock?${TAO_QS}"
_trigger_cci_url="${TAO_API}/cci/trigger?${TAO_QS}"


function log() {
    echo `date "+%Y-%m-%dT%H:%M:%S%z"`"        "$1
}

function download_from_gitlab() {
    project_id=$1
    file_name=$2
    target_name=$3
    ref_name=${4:-master}
    curl -sNH "PRIVATE-TOKEN: ${GIT_READ_TOKEN}" "https://dev.dingxiang-inc.com:2020/api/v4/projects/${project_id}/repository/files/${file_name//\//%2F}/raw?ref=${ref_name}" -o ${target_name}
}

# functions
function fetch_settings_xml() {
    target=$1
    download_from_gitlab 555 settings-ci.xml ${target} master
}

function login_to_harbor() {
    docker login -u $HARBOR_USER -p $HARBOR_PASSWD harbor.dx-corp.top
}

function install_common() {
    repo_dir=$1
    fetch_settings_xml /root/.m2/settings.xml
    git clone --depth 1 https://gitlab-ci-token:${CI_JOB_TOKEN}@dev.dingxiang-inc.com:2020/ctu-group/ctu-common.git -b ${COMMON_BRANCH} || log "skip installing common"
    if [ -e ctu-common ]; then
        cd ctu-common
        mvn install -Dmaven.repo.local=${repo_dir} -Dmaven.test.skip=true -Dpmd.skip=true
        cd ..
    fi
}

function generate_startup_sh() {
    war_name=${1:-${CI_PROJECT_NAME}.war}
    startup_sh=${2:-startup.sh}

    echo '#!/bin/sh

JVM_LOG_DIR=/home/admin/logs/jvm
mkdir -p $JVM_LOG_DIR

if test -z $JVM_OPTION_SETTING; then
    JVM_OPTION_SETTING="-Xms1g -Xmx1g -Xss256k"
fi

JAVA_OPTS="-server $JVM_OPTION_SETTING -Dfile.encoding=UTF-8 -verbose:gc -Xloggc:${JVM_LOG_DIR}/gc.log`date +%Y-%m-%d-%H-%M` -XX:+UseParNewGC -XX:+UseConcMarkSweepGC -XX:+CMSIncrementalMode -XX:+PrintGCDetails -XX:+PrintGCTimeStamps -XX:+HeapDumpOnOutOfMemoryError -Xnoclassgc $*"

sleep 15  # wait other container startup
java $JAVA_OPTS -jar ' $war_name > $startup_sh
}

function build_war() {
    # include: compile, unit test, p3c check
    repo_dir=$1
    shift
    extra_args=$@
    fetch_settings_xml /root/.m2/settings.xml
    download_from_gitlab 555 p3c.xml p3c.xml master
    mvn package -U -Dmaven.repo.local=${repo_dir} -Dpmd.language=en $extra_args
    find . -name "*.war" | xargs -i cp {} $PWD/
}

function create_docker_image() {
    img_file=$1
    login_to_harbor
    docker build -t ${IMG_NAME}:${IMG_VERSION} .
    docker save ${IMG_NAME}:${IMG_VERSION} | gzip -c > $img_file
    docker rmi ${IMG_NAME}:${IMG_VERSION} || log "failed to remove image"
}

function run_maven_test() {
    repo_dir=$1
    fetch_settings_xml /root/.m2/settings.xml
    mvn clean test -U -Dmaven.repo.local=$repo_dir -Dpmd.skip=true
}

function init_sql() {
    download_from_gitlab 608 mysql-dump.sql mysql-dump.sql ${SQL_BRANCH}
    grep '{"message":"404 ' mysql-dump.sql && download_from_gitlab 608 mysql-dump.sql mysql-dump.sql master
    docker run --rm arey/mysql-client -h ${DB_HOST} -u ${DB_ADMIN_USER} -p"${DB_ADMIN_PASSWD}" -e "DROP DATABASE IF EXISTS ${DB_NAME}; CREATE DATABASE ${DB_NAME}; GRANT ALL PRIVILEGES ON ${DB_NAME}.* TO '${DB_USER}'@'%';"
    docker run --rm -v ${PWD}/mysql-dump.sql:/sql/mysql-dump.sql arey/mysql-client -h ${DB_HOST} -u ${DB_ADMIN_USER} -p"${DB_ADMIN_PASSWD}" -D ${DB_NAME} -e "source /sql/mysql-dump.sql"
}

function init_license() {
    download_from_gitlab 608 license.sql license.sql ${SQL_BRANCH}
    grep '{"message":"404 ' license.sql && download_from_gitlab 608 license.sql license.sql master
    docker run --rm -v ${PWD}/license.sql:/sql/license.sql arey/mysql-client -h ${DB_HOST} -u ${DB_ADMIN_USER} -p${DB_ADMIN_PASSWD} -D ${DB_NAME} -e "source /sql/license.sql"
}

function run_atest() {
    docker load < docker.tar.gz
    login_to_harbor
    cd atest && make at
}

function teardown_atest() {
    docker run --rm -v ${PWD}/logs:/logs -v ${PWD}/atest:/atest harbor.dx-corp.top/basic/alpine sh -c "chmod -R 777 /logs /atest"
    docker logs ${CI_JOB_ID} > ${PWD}/logs/docker.log 2>&1 || log "container stopped!"
    docker rm -f ${CI_JOB_ID} || log "atest docker already exit!"
    docker rmi ${IMG_NAME}:${IMG_VERSION} || log "failed to remove image"
    docker run --rm arey/mysql-client -h ${DB_HOST} -u ${DB_ADMIN_USER} -p"${DB_ADMIN_PASSWD}" -e "DROP DATABASE IF EXISTS ${DB_NAME}"
}

function lint_robotframework() {
    login_to_harbor
    docker run --rm -v ${PWD}/atest:/data harbor.dx-corp.top/aladdin/linter:0.1.7
}

function run_ptest() {
    cd ptest && make pt
}

function push_to_harbor() {
    docker load < docker.tar.gz
    login_to_harbor
    docker push ${IMG_NAME}:${IMG_VERSION}
    docker rmi ${IMG_NAME}:${IMG_VERSION} || log "failed to remove image"
}

function acquire_cci_lock() {
    log "acquire cci lock"
    while true
    do
        resp=$(curl -m 30 -o /dev/null -s -w "%{http_code}" ${_lock_url} || echo "000")
        if [ $resp -eq 200 ]; then
            log "got cci lock"
            break
        fi
        log "failed to acquire lock, sleep 5s to retry."
        sleep 5
    done
}

function trigger_dependent_cci() {
    # usually it is in common or sql module
    if [[ "$CI_COMMIT_REF_NAME" = "master" || "$CI_COMMIT_TAG" != "" ]]; then
        log "skip tag and master"
    else
        log "trigger dependent CCI"
        curl -m 30 -s --retry 5 ${_trigger_cci_url}
    fi
}

# code static analysis
function run_sa_check() {
    repo_dir=$1
    fetch_settings_xml /root/.m2/settings.xml
    _do_code_style_check $repo_dir
}

function _do_code_style_check() {
    repo_dir=$1
    log "do code style check..."  # p3c in compile phase
    log "fetch p3c.xml"
    download_from_gitlab 555 p3c.xml p3c.xml master
    mvn compile -U -Dmaven.repo.local=$repo_dir -Dpmd.language=en
}

# code sonar analysis
function run_sonar_check() {
    repo_dir=$1
    fetch_settings_xml /root/.m2/settings.xml
    download_from_gitlab 555 p3c.xml p3c.xml master
    mvn -fn test sonar:sonar -U -Dmaven.repo.local=${repo_dir} -Dpmd.language=en $extra_args -Dsonar.host.url=http://sonar.dx.corp -Dsonar.login=42430e4c7e2a7ca18417bd39201c5b649062d907 -Dmaven.repo.local=$repo_dir -Dsonar.branch=${CI_COMMIT_REF_NAME}
}

# generate cm parcel
# XXX: need python3
function generate_cm_parcel() {
    echo "skip cm parcel step"
    #ftp_dir=${1:-ctu}
    #download_from_gitlab 555 cm/create_parcel.py create_parcel.py master
    #python3 create_parcel.py ${CI_PROJECT_NAME/-/} ${IMG_VERSION} ${ftp_dir}
}
