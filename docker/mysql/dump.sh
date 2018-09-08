# Backup
docker exec CONTAINER /usr/bin/mysqldump -u root -pPASSWORD DATABASE > backup.sql
docker exec CONTAINER /usr/bin/mysqldump -u root -pPASSWORD DATABASE | gzip > backup.sql.gz

# Restore
cat backup.sql | docker exec -i CONTAINER /usr/bin/mysql -u root -pPASSWORD DATABASE
gunzip < backup.sql.gz | docker exec -i CONTAINER /usr/bin/mysql -u root -pPASSWORD DATABASE