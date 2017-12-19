
```
docker run --name nginx \
  -v $PWD/nginx.conf:/etc/nginx/nginx.conf:ro \
  -v $PWD/conf.d:/etc/nginx/conf.d \
  -v $PWD/cert:/root/cert \
  -v $PWD/logs:/var/log/nginx \
  -v $PWD/html:/usr/share/nginx/html:ro \
  -p 80:80 \
  -p 443:443 \
  -d nginx

```