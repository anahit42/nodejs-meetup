FROM keymetrics/pm2:8-alpine
MAINTAINER priotix

RUN apk add --no-cache python build-base

COPY package.json package-lock.json /tmp/service-mailer/

RUN cd /tmp/service-mailer && npm install
RUN npm cache clean --force

RUN mkdir -p /var/www/service-mailer && cp -a /tmp/service-mailer/node_modules /var/www/service-mailer

WORKDIR /var/www/service-mailer
ADD . /var/www/service-mailer

CMD ["pm2-runtime", "start", "pm2.config.json"]
