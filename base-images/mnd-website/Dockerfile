# Dockerfile to build the image that contains
# all which is required too build and run the
# mnd-website application
FROM node:latest
MAINTAINER Paolo Scanferla <paolo.scanferla@mondora.com>
RUN git clone https://github.com/mondora/mnd-website.git
RUN npm i -g node-static bower gulp
