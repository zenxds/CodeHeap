FROM node:8

ENV APP_DIR /home

ENV TZ Asia/Shanghai

RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime \
    && echo $TZ > /etc/timezone

WORKDIR $APP_DIR

COPY . $APP_DIR

RUN yarn install --production --registry=https://registry.dingxiang-inc.com \
    && yarn global add pm2 \
    && yarn cache clean

EXPOSE 3000

# Entrypoint
# CMD ["pm2", "start", "server/app.js", "--name", "yapi"]
CMD ["npm", "start"]
