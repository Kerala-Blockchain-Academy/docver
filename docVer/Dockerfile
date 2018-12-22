

FROM node:lts-jessie

RUN apt-get update \
    && apt-get install --no-install-recommends --no-install-suggests -y curl nano \
    && apt-get install -y nginx

RUN npm install -g @angular/cli \
    && mkdir -p /usr/share/docVer/src


WORKDIR /usr/share/docVer

COPY ./e2e .
COPY ./angular.json .
COPY ./nginx.conf .
COPY ./package.json .
COPY ./tsconfig.json .
COPY ./patch.js .

RUN ls \
    && npm install

RUN ln -sf /dev/stdout /var/log/nginx/access.log \
	&& ln -sf /dev/stderr /var/log/nginx/error.log

EXPOSE 80 4200