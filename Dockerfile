FROM node:16.10.0-alpine AS base

ENV DEBUG=false

WORKDIR /usr/src/app
RUN apk update \ 
 && apk add ffmpeg \ 
 && rm -rf /usr/src/app/src
COPY --chown=node:node  . .
RUN npm ci \ 
&& npm install -g typescript \ 
 && tsc \ 
 

USER node

CMD [ "node", "dist/bot.js" ]