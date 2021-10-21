FROM node:14.16.1-alpine

ENV DEBUG=false

WORKDIR /usr/src/app
RUN apk update \ 
 && apk add ffmpeg \ 
 && rm -rf /usr/src/app/src
COPY --chown=node:node  . .
RUN npm ci \ 
&& npm install -g typescript \ 
 && tsc
 

USER node

CMD [ "node", "dist/bot.js" ]