docker build -t nginx-custom:1.13.1 .

docker run --name nginx -v /home/hadoop/docker_nginx/nginx.conf:/etc/nginx/nginx.conf:ro \
           -v /home/hadoop/output/nginx/logs:/var/log/nginx \
           -v /home/hadoop/docker_nginx/html:/usr/share/nginx/html:ro \
           -d -p 80:80 nginx-custom:1.13.1