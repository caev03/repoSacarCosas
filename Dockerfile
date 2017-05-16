FROM node:latest

USER root

RUN apt-get update && apt-get install -y --force-yes\
  ca-certificates \
  curl \
  software-properties-common \
  --no-install-recommends && \
  curl -sSL https://www.virtualbox.org/download/oracle_vbox.asc | apt-key add - && \
  echo "deb http://download.virtualbox.org/virtualbox/debian jessie contrib" >> /etc/apt/sources.list.d/virtualbox.list && \
  apt-get update && \
  apt-get install -y --force-yes\
  virtualbox-5.0 \
  && rm -rf /var/lib/apt/lists/*
