
    adduser zenxds
    # 加到sudo组
    usermod -a -G sudo zenxds
    ＃ 切到新加的用户
    su zenxds

    # 生成ssh key
    ssh-keygen -t rsa -C "xx@gmail.com"

    # 将本地机器的ssh key加入到vps的authorized_keys里面，并修改权限
    vim ~/.ssh/authorized_keys
    sudo chmod 600 ~/.ssh/authorized_keys && chmod 700 ~/.ssh/

    # 编辑sshd_config
    vim /etc/ssh/sshd_config
    去掉 AuthorizedKeysFile .ssh/authorized_keys的注释
    # 禁止root登陆
    PermitRootLogin no

    # 重启ssh服务
    sudo service ssh restart

    [安装最新版nodejs](https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions)

    sudo apt-get install git mysql-server nginx php5 php5-fpm php5-mysql

    # 下载wordpress，配置并复制到/var/www目录下
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