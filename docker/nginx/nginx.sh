# --net=host
docker run --name nginx-test \
  -v $PWD/nginx.conf:/etc/nginx/nginx.conf:ro \
  -v $PWD/conf.d:/etc/nginx/conf.d \
  -v $PWD/cert:/root/cert \
  -v $PWD/log:/var/log/nginx \
  -v $PWD/html:/usr/share/nginx/html \
  -p 8090:80 \
  -p 443:443 \
  -d nginx