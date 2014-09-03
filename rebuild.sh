#!/bin/bash
docker stop meteor-website
docker stop mnd-website
docker stop prerender
docker remove meteor-website
docker remove mnd-website
docker remove prerender
nodejs cmc.js meteor-website meteor-website.options.json
nodejs cmc.js mnd-website mnd-website.options.json
nodejs cmc.js prerender prerender.options.json
