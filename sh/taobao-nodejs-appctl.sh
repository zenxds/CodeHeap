#!/bin/bash

ulimit -c unlimited
export PATH=/opt/taobao/install/node.js/bin:/bin:/usr/bin:$PATH

BIN_ROOT=$(cd $(dirname $0); pwd -P)
cd ${BIN_ROOT}/..
APP_HOME=`pwd` # e.g. /home/admin/my-app
TARGET_DIR=${APP_HOME}/target # e.g. /home/admin/my-app/target
APP_NAME=`basename ${APP_HOME}` # e.g. my-app
APP_ARCHIVE=${TARGET_DIR}/${APP_NAME}.tgz # e.g. /home/admin/my-app/target/my-app.tgz
PROJECT_ROOT=${TARGET_DIR}/${APP_NAME} # e.g. /home/admin/my-app/target/my-app
NODE_BIN=/opt/taobao/install/node.js/bin/node
STDOUT_LOG=${APP_HOME}/logs/nodejs_stdout.log
NGINXCTL=/home/admin/cai/bin/nginxctl
CUSTOM_APPCTL=""
HAS_JAVA=false

PROG_NAME=$0
ACTION=$1

cd ${BIN_ROOT}

# export these for alinode
export NODE_LOG_DIR=${APP_HOME}/logs/
export ENABLE_NODE_LOG=YES

if [ -f "${APP_HOME}/bin/setenv.sh" ]; then
    source ${APP_HOME}/bin/setenv.sh || echo "Something went wrong when sourcing setenv.sh. Continuing..."
fi

checkuser() {
    user=`id -nu`
    if [[ ${user} != 'admin' ]]; then
        echo "Stop! Only admin can run this script!"
        exit 3
    fi
}

start_echo() {
    local output=$1
    if [ ${ACTION} = 'restart' ] || [ ${ACTION} = 'start' ] || [ ${ACTION} = 'pubstart' ]; then
        echo $1
        if [[ ${output} == *"Halted"* ]]; then
            exit 1;
        fi
    fi
}

checkuser

# use ${NODEJS_PORT} from setenv.sh
if [ -n "${NODEJS_PORT}" ]; then
    NODE_PORT=${NODEJS_PORT};
    start_echo "Using existing NODE_PORT: ${NODE_PORT}"
else
    NODE_PORT=6001
    start_echo "Using default NODE_PORT: ${NODE_PORT}";
fi

if [ -z "${NODE_STARTUP_TIMEOUT}" ]; then
    NODE_STARTUP_TIMEOUT=20
fi

if [ ! -d "${APP_HOME}/logs" ]; then
    mkdir -p ${APP_HOME}/logs
fi

setenv () {
    if [ -z "${NODE_ENV}" ]; then
        if [ -f ${NODE_APP_DIR}/bin/.env ]; then
            export NODE_ENV=$(cat ${NODE_APP_DIR}/bin/.env)
            start_echo "Using NODE_ENV from ${NODE_APP_DIR}/bin/.env: ${NODE_ENV}"
        elif [ -f ${NODE_APP_DIR}/.env ]; then
            export NODE_ENV=$(cat ${NODE_APP_DIR}/.env)
            start_echo "Using NODE_ENV from ${NODE_APP_DIR}/.env: ${NODE_ENV}"
        else
            export NODE_ENV="production"
            start_echo "Using default NODE_ENV: production"
        fi
    else
        start_echo "Using existing NODE_ENV: ${NODE_ENV}"
    fi

    local _TMPDIR=`${CUSTOM_NODE_BIN} -p 'require("os").tmpdir()'`

    if [ ! -w ${_TMPDIR} ]; then
        export TMPDIR=/tmp
    fi

    export HOME=/home/admin

    if [ -z "${HARMONY}" ]; then
        local MODULES=$(${NODE_BIN} -p "process.versions.modules")
        if [[ "${MODULES}" -lt 48 ]]; then
            start_echo "Enabling harmony flag."
            HARMONY="--harmony"
        else
            start_echo "Not enabling harmony flag"
        fi
    else
        start_echo "Using existing harmony flag: ${HARMONY}"
    fi
}


usage() {
    echo "Usage: ${PROG_NAME} {start|stop|status|pubstart|restart|online|offline|pid|env}"
    exit 1;
}

get_pid() {
    PID=`ps ax | grep ${NODE_BIN} | grep -v grep | grep ${APP_NAME} | awk '{print $1}'`
}

prepare() {
    get_pid
}

extract() {
    if [ -f ${APP_ARCHIVE} ]; then
        cd ${TARGET_DIR}

        # should always make sure old files are deleted before extracting
        rm -rf ${PROJECT_ROOT} 2>/dev/null
        rm -rf ${TARGET_DIR}/nodejs 2>/dev/null

        tar zxf ${APP_ARCHIVE} || { start_echo "Failed to extract app archive. Halted"; }
    else
        start_echo "Failed to find app archive: ${APP_ARCHIVE}. Halted";
    fi
}

if [[ $# -lt 1 ]]; then
    usage
fi


# do extract the archive if nothing is found so we can bootstrap
if [ ! -d ${PROJECT_ROOT} ] && [ ! -d ${APP_HOME}/target/nodejs ]; then
    start_echo "Node.js app directory not found. Extracting app archive to bootstrap."
    extract
    start_echo "App archive extracted successfully."
fi



# in case nodejs dir is under %app%.war
if [ -d "${PROJECT_ROOT}.war/nodejs" ]; then
    mv "${PROJECT_ROOT}.war/nodejs" ${TARGET_DIR}
fi

# check app type: just node or java + node
if [ -d "${TARGET_DIR}/nodejs" ] && [ -d "${PROJECT_ROOT}.war" ]; then
    HAS_JAVA=true
    NODE_APP_DIR=${TARGET_DIR}/nodejs
    touch /home/admin/.has_java
elif [ -d ${PROJECT_ROOT} ]; then
    NODE_APP_DIR=${PROJECT_ROOT}
else
    start_echo "Failed to locate Node.js app dir. Halted."
fi

NODE_MODULES_DIR=${NODE_APP_DIR}/node_modules
CUSTOM_NODE_BIN=${NODE_MODULES_DIR}/node/bin/node

if [ ! -d ${NODE_MODULES_DIR} ]; then
    start_echo "${NODE_MODULES_DIR} does not exist! Halted.";
fi

if [[ -f ${CUSTOM_NODE_BIN} ]]; then
    NODE_BIN=${CUSTOM_NODE_BIN}
    chmod a+x ${NODE_BIN}
fi

# in case /opt/taobao/install/node.js/bin/node doesn't exist
if [ ! -f ${NODE_BIN} ]; then
    start_echo "Failed to locate Node.js binary. Halted."
fi

if [ -d ${NODE_MODULES_DIR}/.bin ]; then
    chmod a+x ${NODE_MODULES_DIR}/.bin/*
fi

# /home/admin/%AppName%/target/%AppName%/node_modules/.bin/appctl
if [[ -f ${NODE_MODULES_DIR}/.bin/appctl ]]; then
    CUSTOM_APPCTL=${NODE_APP_DIR}/node_modules/.bin/appctl
fi

for portal in '/bin/server.js' '/dispatch.js' ; do
    if [[ -f ${NODE_APP_DIR}${portal} ]] ; then
        PORTAL=${NODE_APP_DIR}${portal}
        break
    fi
done

setenv


check_errs() {
  if [ "${1}" -ne "0" ]; then
    echo "ERROR # ${1} : ${2}"
    exit ${1}
  fi
}

#start nodejs
start() {
    get_pid
    if [[ -z "${PID}" ]]; then
        echo "Starting ${APP_NAME}..."
        if [[ -f ${CUSTOM_APPCTL} ]]; then
            echo "${CUSTOM_APPCTL} start"
            bash ${CUSTOM_APPCTL} start >> ${STDOUT_LOG} 2>&1 &
            wait $!
            check_errs ${PIPESTATUS[0]} "Failed to start Node.js app, please refer to log file ${STDOUT_LOG}"
        else
            echo "Using Node.js`${NODE_BIN} -v`(${NODE_BIN})."
            cd ${NODE_APP_DIR}
            nohup ${NODE_BIN} ${HARMONY} ${PORTAL} 2>&1 | awk '{ print strftime("%Y-%m-%d %H:%M:%S"), $0; fflush(); }' >> ${STDOUT_LOG} &
            sleep 5
        fi
        get_pid
        if [ -z "${PID}" ]; then
            echo "Failed to start Node.js app, please refer to log file ${STDOUT_LOG} "
            exit 1;
        fi
        echo "Successfully started Node.js app. PID=${PID}"
    else
        echo "${APP_NAME} is already running, PID=${PID}"
    fi
}

stop() {
    # java + node app does not need to stop nginx here
    nginx_num=`ps -ef |grep nginx |grep -v grep -c`
    if [[ ${nginx_num} -ge 1 ]] && [[ ! "${HAS_JAVA}" = true ]]; then
        ${NGINXCTL} stop > /dev/null
    fi

    get_pid

    if [[ ! -z "${PID}" ]]; then
        echo "Waiting ${APP_NAME} stop for 5s ..."
        if [[ -f ${CUSTOM_APPCTL} ]]; then
            echo "${CUSTOM_APPCTL} stop"
            bash ${CUSTOM_APPCTL} stop
        else
            kill -15 ${PID}
            sleep 5
        fi
        node_num=`ps ax | grep ${NODE_BIN} |grep -v grep| grep ${APP_NAME}|wc -l`
        if [[ ${node_num} != 0 ]]; then
            ps ax | grep ${NODE_BIN} |grep -v grep| grep ${APP_NAME}|grep -v nodejsctl|awk '{print $2}'|xargs kill -9
            ipcs -s | grep 0x | awk '{print $2}' | xargs -n1 ipcrm -s  > /dev/null 2>&1
            ipcs -m | grep 0x | awk '{print $2}' | xargs -n1 ipcrm -m  > /dev/null 2>&1
        fi
        if [[ -f ${STDOUT_LOG} ]]; then
            mv -f ${STDOUT_LOG} "${STDOUT_LOG}.`date '+%Y%m%d%H%M%S'`"
        fi
    else
        echo "${APP_NAME} is not running"
    fi
}
# used to check the whole app is working fine.
# if you want to just check node start up please used preload.sh
status() {
        get_pid
        local status_code=$(curl -s -o /dev/null -w "%{http_code}" "http://127.0.0.1:${NODE_PORT}/check.node");
        if [[  -n ${PID} ]] && [ ${status_code} = '200' ]; then
            echo "Status check passed."
        else
            echo "Status check failed."
            exit 1;
        fi
}

backup() {
    if [[ -f "${APP_HOME}/target/${APP_NAME}.tgz" ]]; then
        if [[ ! -d "${APP_HOME}/target/backup" ]]; then
            mkdir -p "${APP_HOME}/target/backup"
        fi
        tgz_time=`/usr/bin/stat -c '%y' ${APP_HOME}/target/${APP_NAME}.tgz|cut -c 1-19 | sed -e 's/[: -]//g'`
        cp -f ${APP_HOME}/target/${APP_NAME}.tgz ${APP_HOME}/target/backup/${APP_NAME}.${tgz_time}.tgz
    fi
}

startnginx() {
    countdown=${NODE_STARTUP_TIMEOUT}
    while [[ ${countdown} -gt 0 ]]; do
      sleep 1
      ret=$(curl -s "http://127.0.0.1:${NODE_PORT}/check.node")
      if [[ "${ret}" = *"success"* ]]; then
         echo "Node.js startup health check passed."
        break
      fi
      ((countdown--));
    done;
    if [[ "${ret}" != *"success"* ]]; then
        echo "Node.js startup health check timed out! Halted.";
    fi
    if [[  ! "${HAS_JAVA}" = true ]]; then
        if [[ "${ret}" = *"success"* ]]; then
            ${NGINXCTL} start > /dev/null
            sleep 5
            REC_NUM=`curl -o /dev/null -s -w %{http_code} "http://127.0.0.1/status.taobao"`
            if [[ ${REC_NUM} != 200 ]]; then
                ret=`curl -s "http://127.0.0.1/check.node"`
                if [[ "${ret}" = *"success"* ]]; then
                    echo "Nginx started successfully, but doesn't properly proxy_pass to Node.js app"
                else
                    echo "Failed to start Nginx or Nginx is misconfigured, http code of status.taobao is ${REC_NUM}"
                    exit 1
                fi
            else
                echo "Nginx started successfully."
            fi
        else
            echo "App failed to start, please see ${STDOUT_LOG}"
            exit 1
        fi
    fi
}


online() {
    if [[ ! -d ${NODE_APP_DIR}/public/ ]]; then
        mkdir ${NODE_APP_DIR}/public/
    fi
    touch -m ${NODE_APP_DIR}/public/status.taobao
    echo "Created file: ${NODE_APP_DIR}/public/status.taobao"
}

offline() {
    rm -f ${NODE_APP_DIR}/public/status.taobao
    echo "File status.taobao removed, putting ${APP_NAME} offline in 5s..."
    sleep 5
    echo "${APP_NAME} is now offline."
}

check_env() {
    get_pid
    if [ -z "${PID}" ]; then
        echo "Cannot find any Node.js process."
        exit 1;
    else
        for pid in ${PID};  do
            echo -e "\n"
            echo "PID ${pid}:"
            cat /proc/${pid}/environ | tr '\0' '\n' | grep NODE
        done
    fi
}

case "${ACTION}" in
    extract)
        extract
    ;;
    start)
        start
        online
        startnginx
    ;;
    status)
        status
    ;;
    stop)
        offline
        stop
    ;;
    pubstart)
        offline
        stop
        extract
        start
        online
        startnginx
    ;;
    online)
        online
    ;;
    offline)
        offline
    ;;
    restart)
        offline
        stop
        start
        online
        startnginx
    ;;
    pid)
        get_pid && echo ${PID}
    ;;
    env)
        check_env
    ;;
    *)
        usage
    ;;
esac
