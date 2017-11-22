#FROM romeoz/docker-nginx-php:5.6

FROM ubuntu:16.04

RUN apt-get update \
	&& apt-get install -y -qq npm \
	&& apt-get install -y php php-cli php-xml \
	&& apt-get install -y git \
	&& apt-get install -y curl \
	&& curl -sL https://deb.nodesource.com/setup_6.x | bash \
	&& apt-get install -y nodejs \
    && rm -rf /var/lib/apt/lists/*

RUN mkdir -p /var/www/app/atenas
COPY . /var/www/app/atenas/

WORKDIR /var/www/app/atenas/

#VOLUME /var/www/app/atenas

RUN npm install --global bower
RUN npm install --global grunt
RUN bower install --allow-root
RUN npm install

RUN cd app/api && make install
RUN cd ../..
RUN pwd
RUN grunt build
RUN ls

#CMD tar -czf - dist
