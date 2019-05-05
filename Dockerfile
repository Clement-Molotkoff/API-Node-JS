FROM debian:stretch

MAINTAINER Molotkoff Clement <molotk_c@etna-alternance.net>

RUN apt-get update && apt-get install curl -y
RUN cd ~ && curl -sL https://deb.nodesource.com/setup_10.x | bash -
RUN apt-get install nodejs build-essential -y
RUN apt-get install git -y
RUN mkdir /home/API/

COPY API /home/API/

ENTRYPOINT cd /home/API && \
           npm install && \
           npm run dev

WORKDIR /home/API

EXPOSE 3000