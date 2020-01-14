## 注意

只映射需要的目录，不要整个大目录映射

## install 

`curl -fsSL https://get.docker.com -o get-docker.sh`

## cmd

```
docker pull node:8 // 下载镜像
docker build . -t xx/xx(.是构建上下文，被ADD 或 COPY 指令所引用)

// 启动容器
docker run --rm -it --name myname -v /data -d 镜像名 /bin/bash

docker ps -s
docker inspect xx
docker exec -it xx /bin/bash

// 备份
sudo docker run --rm --volumes-from 85f8c8e73427 -v $(pwd):/backup ubuntu tar cvf /backup/backup.tar /var/data/cnpm_data

docker system prune

# 删除退出的容器(同时删除和容器关联的volumes): 
docker ps --filter status=dead --filter status=exited -aq | xargs -r docker rm -v

# 删除未使用的镜像: 
docker images --no-trunc | grep '<none>' | awk '{ print $3 }' | xargs -r docker rmi

# 删除没用的volume
docker volume rm `docker volume ls -f dangling=true |grep -v DRIVER|awk '{print $2}'`
```

## Dockerfile

```
COPY 从主机复制文件到镜像
WORKDIR 对任何后续的 RUN、CMD、ENTRYPOINT、ADD 或 COPY 指令设置工作目录

ENV TZ Asia/Shanghai

RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

apt-get install -qqy --no-install-recommends
```

## docker-compose

```
docker-compose up
docker-compose build
docker-compose up -d --build

volumes:
  - ~/.ssh:/root/.ssh
  - ~/.gitconfig:/root/.gitconfig
```

## 阿里云镜像

```
https://mqnyhl01.mirror.aliyuncs.com
```

登陆控制台，会为每个用户生成一个镜像地址

## node目录

```
/usr/src/app
```