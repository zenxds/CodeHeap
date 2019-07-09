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

# 删除的时候exclude
ls . | egrep -v vmax | xargs rm -rf

# 解压
tar zxvf a.tar.gz
# 压缩
tar zcvf a.tar.gz DirName