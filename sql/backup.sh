#!/bin/bash
source /etc/profile
cd /home/admin/docker-compose/mysql-backup
t=$(date +%Y-%m-%d_%H_%M_%S)
ctuSqlName=${t}_ctu.sql
officialSqlName=${t}_official.sql
tarName=${t}.tar
docker exec mysql sh -c 'mysqldump ctu -uctu -pcTu123456 > /ctu.sql && mysqldump official -uofficial -p\$Dx.123i --ignore-table=official.log --ignore-table=official.report_top_detail> /official.sql && exit'
docker cp mysql:/ctu.sql /home/admin/docker-compose/mysql-backup
docker cp mysql:/official.sql /home/admin/docker-compose/mysql-backup
docker exec mysql sh -c 'rm -rf /ctu.sql /official.sql && exit'
mv ctu.sql ${ctuSqlName}
mv official.sql ${officialSqlName}
tar -zcvf ${tarName} ${ctuSqlName} ${officialSqlName}
scp ${tarName} admin@10.154.147.29:/mydata/mysqldatabak
rm -rf ${ctuSqlName} ${officialSqlName} ${tarName}