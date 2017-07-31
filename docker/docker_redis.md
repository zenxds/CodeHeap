####创建Dockerfile 文件，然后添加如下内容：
>>>
FROM redis:3.2

MAINTAINER leizhu

ENV REDIS_HOME /usr/local

RUN mkdir $REDIS_HOME/conf  \

&& RUN echo "cluster-enabled yes" > redis.conf  \

&& RUN echo "cluster-config-file nodes.conf" >> redis.conf  \

&& RUN echo "port 7001" >> redis.conf  \

&& RUN echo "#bind 127.0.0.1" >> redis.conf 

WORKDIR $REDIS_HOME/conf

EXPOSE 7001

>>>

####创建dockers镜像：docker build -t leizhu:redisbase7001 .

####创建dockers容器：docker run -d --name redis01 -p 7001:7001 --net=host leizhu:cluster7001  

####此时只创建好了一个节点，然后把RUN echo "port 7001" >> redis.conf 改为RUN echo "port 7002" >> redis.conf

####EXPOSE 7001 改为 EXPOSE 7002
```
重复在创建5个即可

最后一步

下载一个 redis-x.x.x.tar.gz 包

然后解压缩

tar zxvf  redis-x.x.x.tar.gz 

然后

####gem  install  redis  （报没有-bash:gem comond not found）请先安装ruby ：yum -y install ruby
```

