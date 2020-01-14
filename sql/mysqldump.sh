#!/bin/bash
source /etc/profile

backupDir=/home/ubuntu/mysql-backup
containerName=ctuportal_mysql_1
databaseName=portal

# must use " to use variables
# --ignore-table=official.log
docker exec ${containerName} sh -c "mysqldump ${databaseName} -uroot -pmysql_root > /${databaseName}.sql && exit"
docker cp ${containerName}:/${databaseName}.sql ${backupDir}
docker exec ${containerName} sh -c "rm -f /${databaseName}.sql && exit"

t=$(date +%Y-%m-%d_%H_%M_%S)
sqlName=${databaseName}_${t}.sql
tarName=${databaseName}_${t}.tar

cd ${backupDir}
mv ${databaseName}.sql ${sqlName}
tar -zcvf ${tarName} ${sqlName}
scp ${tarName} ubuntu@10.105.23.199:/dxdata/mysql-backup/portal
rm -rf ${sqlName} ${tarName}