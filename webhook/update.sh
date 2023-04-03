#!/bin/sh

APP_PATH='/home/rocketpeer'
APP_BRANCH='master'
APP_CONTAINERS='mysql phpmyadmin sveltekit webhook'
APP_DB_MIGRATE='cargo prisma db push'

RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;36m'
YELLOW='\033[0;33m'
CLR='\033[0m' # No Color

display()
{
    echo "${YELLOW}${1}${CLR}"
}

display "Updating ${APP_PATH}"
cd $APP_PATH

display "Shutting down all containers"
docker compose down

display "Pulling branch master"
git pull origin $APP_BRANCH

display "Migrating database"
cd backend/ && cargo prisma db push
cd $APP_PATH

display "Starting rebuild of containers"
docker compose up -d $APP_CONTAINERS --build

display "App updated"