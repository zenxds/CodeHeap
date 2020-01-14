docker run --name mongo \
  --restart always \
  -p 27017:27017 \
  -v $PWD/yapi/mongodb:/data/db \
  -e MONGO_INITDB_ROOT_USERNAME=root \
  -e MONGO_INITDB_ROOT_PASSWORD=yapi \
  -d mongo:latest