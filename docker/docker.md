
## install 

brew cask install docker

## cmd

```
docker pull node:8 // 下载镜像
docker build . (.是构建上下文，被ADD 或 COPY 指令所引用)

// 启动容器
docker run 镜像名 -v /data test

docker-compose up
docker-compose build

docker inspect
docker exec -it xx /bin/bash

// 备份
docker run --rm --volumes-from mysql -v $(pwd)/backup:/backup debian cp -r /var/lib/mysql /backup/

// mac上要先运行这条命令才能cd到/var/lib/docker里
// https://stackoverflow.com/questions/38532483/where-is-var-lib-docker-on-mac-os-x
screen ~/Library/Containers/com.docker.docker/Data/com.docker.driver.amd64-linux/tty
```

## Dockerfile

```
COPY 从主机复制文件到镜像
WORKDIR 对任何后续的 RUN、CMD、ENTRYPOINT、ADD 或 COPY 指令设置工作目录
```

## 阿里云镜像

```
https://mqnyhl01.mirror.aliyuncs.com
```

登陆控制台，会为每个用户生成一个镜像地址