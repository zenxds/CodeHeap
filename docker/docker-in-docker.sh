docker run -it --rm \
  -v /var/run/docker.sock:/var/run/docker.sock \
  ubuntu:latest bash

# install docker inside
apt update && apt --yes install wget
wget -O /bin/docker https://master.dockerproject.org/linux/x86_64/docker
chmod 7 /bin/docker