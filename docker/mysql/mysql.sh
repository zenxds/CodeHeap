docker run --name mysql \
  -p 3306:3306 \
  --restart always \
  -v $PWD/datadir:/var/lib/mysql \
  -v $PWD/logs:/logs \
  -v $PWD/my.cnf:/etc/mysql/conf.d/mysql.cnf \
  -e MYSQL_ROOT_PASSWORD=mysql_root \
  -e MYSQL_DATABASE=deploy \
  -d mysql:latest