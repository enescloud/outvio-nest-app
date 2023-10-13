#!/bin/bash

# Build redis
docker-compose -f ./docker/docker-compose.yml up redis --build -d

# Build Mongo
docker-compose -f ./docker/docker-compose.yml up mongors --build -d

sleep 5
# Init mongo
docker exec mongors mongosh --quiet --eval "load('./scripts/rs-init.js')"

# Create connect to mongors container from local
echo 127.0.0.1 mongors | sudo tee -a /etc/hosts

# Push Prisma.schema to db
npx prisma db push