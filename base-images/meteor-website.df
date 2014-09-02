# Dockerfile to build an image that contains
# all which is required to build and run the
# meteor-website application
FROM node:latest
MAINTAINER Paolo Scanferla <paolo.scanferla@mondora.com>
RUN curl https://install.meteor.com/ | sh
RUN git clone https://github.com/mondora/meteor-website.git
RUN npm i -g meteorite
