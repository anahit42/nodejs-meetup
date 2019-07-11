FROM keymetrics/pm2:8-alpine
MAINTAINER priotix

RUN apk add --no-cache python build-base

COPY package.json package-lock.json /tmp/api-users/

RUN cd /tmp/api-users && npm install
RUN npm cache clean --force

RUN mkdir -p /var/www/api-users && cp -a /tmp/api-users/node_modules /var/www/api-users

WORKDIR /var/www/api-users
ADD . /var/www/api-users

CMD ["pm2-runtime", "start", "pm2.config.json"]
