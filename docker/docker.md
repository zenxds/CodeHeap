
## install 

brew cask install docker

## cmd

```
docker pull node:8 // 下载镜像
docker build . -t xx/xx(.是构建上下文，被ADD 或 COPY 指令所引用)

// 启动容器
docker run --rm --it --name myname -v /data -d 镜像名 /bin/bash

docker-compose up
docker-compose build

docker inspect
docker exec -it xx /bin/bash

                 --cap-add=SYS_ADMIN
docker run -t -i --privileged zenxds/chrome /bin/bash

// 备份
sudo docker run --rm --volumes-from 2d15f7f011fa -v $(pwd):/backup ubuntu tar cvf /backup/backup.tar /var/lib/mysql

// mac上要先运行这条命令才能cd到/var/lib/docker里
// https://stackoverflow.com/questions/38532483/where-is-var-lib-docker-on-mac-os-x
screen ~/Library/Containers/com.docker.docker/Data/com.docker.driver.amd64-linux/tty

docker volume rm $(docker volume ls -qf dangling=true)

// 关掉已经停止的容器，并删除volume
docker rm -v $(docker ps -aq -f status=exited)
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
volumes:
  - ~/.ssh:/root/.ssh
  - ~/.gitconfig:/root/.gitconfig
```

## 阿里云镜像

```
https://mqnyhl01.mirror.aliyuncs.com
```

登陆控制台，会为每个用户生成一个镜像地址