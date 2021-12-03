FROM node:10.15.0-alpine

ENV TIME_ZONE=Asia/Shanghai

RUN \
  mkdir -p /usr/src/app \
  && apk add --no-cache tzdata curl \
  && echo "${TIME_ZONE}" > /etc/timezone \ 
  && ln -sf /usr/share/zoneinfo/${TIME_ZONE} /etc/localtime 

WORKDIR /usr/src/app

COPY package.install.json /usr/src/app/package.json

COPY .npmrc /usr/src/app/.npmrc

RUN echo "//npm.pkg.github.com/:_authToken=91dc0844846feb3f9710a18c1113ba54ee02bebd" > ~/.npmrc

RUN npm i --production

COPY ./dist /usr/src/app

CMD npm run docker-start
