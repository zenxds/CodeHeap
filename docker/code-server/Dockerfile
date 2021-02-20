# docker build . -t zenxds/code-server:latest
FROM codercom/code-server:latest

USER root

ENV TZ Asia/Shanghai
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime \
  && echo $TZ > /etc/timezone \
  && apt-get update \
  && curl -fsSL https://deb.nodesource.com/setup_12.x | bash - \
  && apt-get install -y nodejs zsh \
  && npm i -g yarn

USER coder
RUN sh -c "$(curl -fsSL https://cdn.jsdelivr.net/gh/ohmyzsh/ohmyzsh@master/tools/install.sh)"
  # && curl -o- https://cdn.jsdelivr.net/gh/nvm-sh/nvm@v0.37.2/install.sh | bash \
  # && export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")" \
  # && [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" \
  # && nvm install 12 \
  # && nvm use 12