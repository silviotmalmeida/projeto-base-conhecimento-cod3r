#!/bin/bash

echo "Iniciando o backend..."

#iniciando o mongodb
docker container exec base-conhecimento bash -c "systemctl start mongod.service"

sleep 1

#iniciando o postgresql
docker container exec base-conhecimento bash -c "service postgresql start"

sleep 1

# usando o servidor de desenvolvimento
docker container exec base-conhecimento bash -c "cd /usr/src/app/backend; npm i; npm start; exit"

# usando o servidor de produção
# docker container exec base-conhecimento bash -c "cd /usr/src/app/backend; npm i; npm run production; exit"

sleep 1
