# Dockerfile to build the image that contains
# all which is required too build and run the
# mnd-website application
FROM dockerfile/nodejs
MAINTAINER Paolo Scanferla <paolo.scanferla@mondora.com>
WORKDIR /
RUN git clone https://github.com/prerender/prerender.git
ADD server.js /prerender/server.js
RUN cd /prerender && npm install
