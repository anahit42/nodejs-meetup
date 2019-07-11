FROM mongo:3.6.8
MAINTAINER priotix

COPY provision/db/docker-entrypoint-initdb.d /docker-entrypoint-initdb.d
RUN chown -R mongodb:mongodb /docker-entrypoint-initdb.d
