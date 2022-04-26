#!/bin/bash

python manage.py compress
python manage.py collectstatic --noinput
python manage.py migrate

gunicorn --bind :8000 thalles.wsgi:application