# Dockerfile to build the image that contains
# all which is required too build and run the
# mnd-website application
FROM node:latest
MAINTAINER Paolo Scanferla <paolo.scanferla@mondora.com>
RUN git clone https://github.com/prerender/prerender.git
ADD server.js /prerender/server.js
RUN cd /prerender && npm install
