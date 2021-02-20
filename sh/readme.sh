#!/bin/bash

# exit if cmd code is not 0
set -e

VAR=/home/
echo $VAR

echo $(ls)
echo `ls`

# 杀掉进程
ps ax | grep http-server | grep 18860 | awk '{print $1}' | xargs kill

# 查看磁盘使用
du -sh $(pwd)/* | sort -nr
du -h --max-depth=1

# 加上空行
sh -c "cat build/index-private.js; echo; cat build/main.js; echo; cat build/init.js" > build/ua.js

# 可以在打开Mac的共享-远程登录
scp -r dashboard/* ubuntu@dingxiang-inc.com:/home/ubuntu/repository/ctu-portal/app/markets/console/dashboard

# 删除的时候exclude
ls . | egrep -v vmax | xargs rm -rf

# 解压
tar zxvf a.tar.gz
# 压缩
tar zcvf a.tar.gz DirName

# 查看端口占用
lsof -i :80
cat /etc/services | grep 443
netstat -tulpn | grep :80
ps aux | grep 443

# 内存占用
free -m

# 搜索文件
find 目录 -iname *php*

# 格式化
mkfs -t ext4 /dev/vdb
# 盘符挂载
mount /dev/vdb1 /dxdata

## 重启自动挂载
echo /dev/vdb1 /dxdata ext4 defaults 0 0 >> /etc/fstab

## awk查看日志某一列
cat access.log | awk '{print $9}'
## 统计IP排行
awk '{print $1}' access.log |sort |uniq -c|sort -n


## centos防火墙
systemctl status firewalld
systemctl start firewalld 
firewall-cmd --list-ports
firewall-cmd --zone=public --add-port=80/tcp --permanen
firewall-cmd --zone=public --add-service=http --permanen
firewall-cmd --reload

# -N disables executing a remote shell
ssh -N -L 9000:127.0.0.1:8886 zenxds@zenxds.com