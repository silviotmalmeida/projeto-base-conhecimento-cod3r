#!/bin/bash

echo "Iniciando o frontend..."

# usando o servidor de desenvolvimento
docker container exec base-conhecimento bash -c "cd /usr/src/app/frontend; npm i; npm run serve"

# usando o servidor de produção
#docker container exec base-conhecimento bash -c "cd /usr/src/app/frontend; npm i; npm run build"

sleep 1
