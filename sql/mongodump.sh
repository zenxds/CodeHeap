#!/bin/bash
source /etc/profile

TIME=$(TZ=Asia/Shanghai date +%Y%m%d%H%M%S)

backupDir=/home/dx/repository/dx-yapi/backup
containerName=dx-yapi-mongo

docker exec ${containerName} sh -c "mongodump -h 127.0.0.1:27017 -d yapi -u root -p yapi --authenticationDatabase admin --gzip --archive=/root/${TIME}.gz"
docker cp ${containerName}:/root/${TIME}.gz ${backupDir}
docker exec ${containerName} sh -c "rm -f /root/${TIME}.sql && exit"

# scp ${tarName} ubuntu@10.105.23.199:/dxdata/mysql-backup/portal
# rm -rf ${sqlName} ${tarName}

# t=$(date +%Y-%m-%d_%H_%M_%S)
# docker run --rm --volumes-from dx-yapi-mongo -v $(pwd)/backup:/backup ubuntu tar cvf /backup/${t}.tar /data/db