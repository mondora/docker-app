#!/bin/bash
docker stop meteor-website
docker stop mnd-website
docker stop prerender
docker rm meteor-website
docker rm mnd-website
docker rm prerender
nodejs cmc.js meteor-website meteor-website.options.json
nodejs cmc.js mnd-website mnd-website.options.json
nodejs cmc.js prerender prerender.options.json
