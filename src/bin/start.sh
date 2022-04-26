#!/bin/bash

python manage.py compress
python manage.py collectstatic --noinput

gunicorn --bind :8000 thalles.wsgi:application