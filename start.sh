#!/usr/bin/env bash

docker-compose build
docker-compose up -d
docker-compose run backend python manage.py migrate
docker-compose run backend python manage.py test
docker-compose run backend python manage.py loaddata ./users/fixtures/users.json