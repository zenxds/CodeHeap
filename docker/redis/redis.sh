docker run --name redis \
  --restart always \
  -p 6379:6379 \
  -v $PWD/data:/data \
  -d redis:latest \
  redis-server --appendonly yes
