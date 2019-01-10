## 磁盘分配

```
/和swap是必须的，其余是推荐的

/
/boot         操作系统的内核和在启动系统过程中所要用到的文件
/swap         交换空间，大约内存大小
/var/log      日志
/home         用户主目录
/usr          用户的很多应用程序和文件都放在这个目录下，类似于windows下的program files目录
```

```
adduser zenxds
passwd zenxds
# 加到sudo组
usermod -a -G sudo或root zenxds
// or
visudo

＃ 切到新加的用户
su zenxds

git
zsh
oh-my-zsh
curl
wget
pip
docker
pip install docker-compose
npm install -g fkill pm2 yarn
```

```
# 生成ssh key
ssh-keygen -t rsa -b 4096 -C "xx@gmail.com"

# 将本地机器的ssh key加入到vps的authorized_keys里面，并修改权限
# 使用ssh-copy-id命令
vim ~/.ssh/authorized_keys
sudo chmod 600 ~/.ssh/authorized_keys && chmod 700 ~/.ssh/

# 编辑sshd_config
vim /etc/ssh/sshd_config
去掉 AuthorizedKeysFile .ssh/authorized_keys的注释
# 禁止root登陆
PermitRootLogin no

# 重启ssh服务
sudo service ssh restart
```

```
[安装最新版nodejs](https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions)

sudo apt-get install git mysql-server nginx php7.0 php7.0-fpm php7.0-mysql

# 下载wordpress，配置并复制到/var/www目录下
wget http://cn.wordpress.org/wordpress-4.8.1-zh_CN.tar.gz
tar -xzvf wordpress-4.8.1-zh_CN.tar.gz 
cp wp-config-sample.php wp-config.php
vim ~/wordpress/wp-config.php

sudo mkdir -p /var/www
sudo cp -r ~/wordpress/* /var/www
# 设置相关权限
cd /var/www/
sudo chown www-data:www-data * -R
sudo usermod -a -G www-data {username}

# 配置nginx
sudo ln -s /etc/nginx/sites-available/wordpress /etc/nginx/sites-enabled/wordpress

# 删除apache2
sudo apt-get purge apache2*

# 更新apt
apt-get update
apt-get upgrade
```