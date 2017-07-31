#### Dockerfile
```
FROM mysql:5.7.17

ENV TZ=Asia/Shanghai
ENV LANG zh_CN.UTF-8

RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime; \
	    echo $TZ > /etc/timezone; \
		\
	    echo "default-character-set=utf8" >> /etc/mysql/conf.d/mysql.cnf

COPY init.sql /docker-entrypoint-initdb.d
```  
> [init.sql](init.sql)为初始化sql脚本 

#### Build MySQL镜像
`docker build -t "mysql:5.7.17-dx" .`


#### 运行MySQL容器
```shell
# 当前目录下运行
docker run --name mysql -p 3306:3306 \
           --restart always\
           #-v $PWD/mysql/config/config-file.cnf:/etc/mysql/conf.d \
           -v $PWD/mysql/datadir:/var/lib/mysql \
           -v $PWD/mysql/logs:/logs \
           #-v $PWD/mysql/docker-entrypoint-initdb.d:/docker-entrypoint-initdb.d \
           -e MYSQL_ROOT_PASSWORD=ScTu31* \
           -e MYSQL_DATABASE=ctu \
           -e MYSQL_USER=ctu \
           -e MYSQL_PASSWORD="cTu123456" \
           -d mysql:5.7.17-dx \
           --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci
```