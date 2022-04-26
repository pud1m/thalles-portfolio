# ORGANIZATION: THALLES
# AUTHOR: THALLES
# Date: Abril 23rd, 2020
#

FROM python:3.8
ENV PYTHONUNBUFFERED 1
LABEL Name=sara Version=1.0
RUN mkdir /code
WORKDIR /code
COPY src/requirements.txt /code/
COPY src/ /code/

ARG DJANGO_SECRET_KEY="b9pqdp%-%^_-mk=+z2#9ne)dw=z+8x26ek%fw@#kch80sh-856"
ARG DEBUG=0
ENV DJANGO_SECRET_KEY ${DJANGO_SECRET_KEY}
ENV DEBUG ${DEBUG}

#Installs python dependencies
RUN pip install -r requirements.txt

#Installs language pack for pt_BR
RUN apt-get update && DEBIAN_FRONTEND=noninteractive apt-get install -y locales
RUN sed -i -e 's/# pt_BR.UTF-8 UTF-8/pt_BR.UTF-8 UTF-8/' /etc/locale.gen && \
    dpkg-reconfigure --frontend=noninteractive locales && \
    update-locale LANG=pt_BR.UTF-8
ENV LANG pt_BR.UTF-8 

RUN echo "DON'T FORGET TO DISABLE SIMPLESERVER"

#CMD to run the local server
#ENTRYPOINT ["python", "manage.py", "runserver", "0.0.0.0:8000"]!
RUN chmod +x "bin/start.sh"
#RUN ["sh", "bin/start.sh"]
ENTRYPOINT ./bin/start.sh
#ENTRYPOINT ["sh", "bin/start.sh"]
#ENTRYPOINT ["gunicorn", "--bind", ":8000", "sara.wsgi:application"]