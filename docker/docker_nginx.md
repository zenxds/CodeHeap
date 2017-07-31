##### 准备配置和目录
- 创建文件目录：  
`mkdir -p nginx && cd nginx`  
`mkdir html;mkdir logs`
- 提供配置文件nginx.conf,放到nginx目录下  

```
user  nginx;
worker_processes  1;

error_log  /var/log/nginx/error.log warn;
pid        /var/run/nginx.pid;


events {
    worker_connections  1024;
}


http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log  /var/log/nginx/access.log  main;

    sendfile        on;
    #tcp_nopush     on;

    keepalive_timeout  65;

    #gzip  on;
    upstream constid.dingxiang-inc.com {
        server 10.105.31.210:8080;
        server 10.105.122.126:8080;
    }

    server {
        listen       80;
        server_name  constid.dingxiang-inc.com;
        charset utf-8;

        location / {
            #root   html;
            root   /usr/share/nginx/html;
            index  index.html index.htm;
            proxy_pass      http://constid.dingxiang-inc.com;
            proxy_set_header  X-Real-IP  $remote_addr;
            client_max_body_size  10m;
        }

        location ~ ^/(WEB-INF)/ {
            deny all;
        }

        location ~ /\.ht {
            deny  all;
        }

        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   /usr/share/nginx/html;
        }
    }


}
```
- 复制静态文件(index.html,cs,js,image)到html目录下,完整结构如下：  

```
/your/path/nginx   
    |_nginx.conf  
    |_html  
        |_test.hml  
        |_fp.js  
        |_jquery.min.js  
    |_logs       
```

##### 启动  

`docker run --name nginx -v /your/path/nginx/nginx.conf:/etc/nginx/nginx.conf:ro \
           -v /your/path/nginx/logs:/var/log/nginx \
           -v /your/path/nginx/html:/usr/share/nginx/html:ro \
           -d -p 80:80 nginx:1.13.1
`