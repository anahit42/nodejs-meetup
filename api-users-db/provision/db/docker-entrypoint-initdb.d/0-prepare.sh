#!/bin/bash

PROJ="api-users"

if [[ -z "${HOST_ENV+x}" ]];then
  HOST_ENV="development"

  echo "${PROJ}: Environment was not set explicitly, will continue in ${HOST_ENV}..."
fi

echo "${PROJ}: Environment is set to ${HOST_ENV}..."

echo "${PROJ}:${HOST_ENV} Running migrations..."

cp /docker-entrypoint-initdb.d/scripts/migrations.js.dist /docker-entrypoint-initdb.d/scripts/migrations.js
sed -i -e "s/{{db-pswd}}/${DB_PSWD}/g" /docker-entrypoint-initdb.d/scripts/migrations.js

mongo /docker-entrypoint-initdb.d/scripts/migrations.js

SCRIPTS_DIR="./docker-entrypoint-initdb.d/scripts/"
SEEDS_DIR="./docker-entrypoint-initdb.d/scripts/seeds"
SEEDS_FILE="./docker-entrypoint-initdb.d/scripts/seed.js"

if [ "${ENABLE_DB_SEED}" == "yes" ];then
  echo "${PROJ}:${HOST_ENV} Running seeding...."

  if [ -f $SEEDS_FILE ];then
    echo "Found $SEEDS_FILE, will try to run it"

    mongo --username=root --password=${MONGO_INITDB_ROOT_PASSWORD} --authenticationDatabase=admin "$SEEDS_FILE"
  fi

  # if directory /scripts exists , import all json files , collection names must match the file names
  if [ -d "$SEEDS_DIR" ]; then
    echo "Found $SEEDS_DIR, will try to import database dump files"

    for FILE in $SEEDS_DIR/*.json; do
      COLLECTION=$(basename "$FILE" .json)

      echo "Importing collection $COLLECTION from file ${FILE}"
      mongoimport --db ${PROJ} --username=root --password=${MONGO_INITDB_ROOT_PASSWORD} --authenticationDatabase=admin --collection $COLLECTION --file "${FILE}" --jsonArray
    done
  fi
fi
