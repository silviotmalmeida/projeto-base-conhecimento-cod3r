#!/bin/bash

echo "Iniciando o backend..."

# usando o servidor de desenvolvimento
docker container exec base-conhecimento bash -c "cd /usr/src/app/backend; npm i; npm start; exit"

# usando o servidor de produção
# docker container exec base-conhecimento bash -c "cd /usr/src/app/backend; npm i; npm run production; exit"

sleep 1
