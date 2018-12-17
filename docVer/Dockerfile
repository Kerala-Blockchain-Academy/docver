

FROM nginx:stable

RUN mkdir -p /usr/share/docVer \
    && apt-get update \
    && apt-get install --no-install-recommends --no-install-suggests -y curl nano

COPY ./dist/docVer /usr/share/docVer

COPY nginx.conf /etc/nginx/nginx.conf
