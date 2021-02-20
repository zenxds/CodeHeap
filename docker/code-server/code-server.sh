docker run --name code-server \
  -p 127.0.0.1:8090:8080 \
  -p 9000:9000 \
  -v $PWD/.config:/home/coder/.config \
  -v $PWD/project:/home/coder/project \
  -v ~/.ssh:/home/coder/.ssh \
  -u "$(id -u):$(id -g)" \
  -e "DOCKER_USER=$USER" \
  zenxds/code-server:latest

# codercom/code-server
# docker stop code-server && docker rm code-server