FROM node:16

ENV DEBUG=false

WORKDIR /usr/src/app
RUN apk update \ 
 && apk add ffmpeg \ 
 && rm -rf /usr/src/app/src
COPY yarn.lock yarn.lock
COPY --chown=node:node  . .
RUN yarn \ 
 && yarn add -g typescript \ 
 && tsc
 

USER node

CMD [ "node", "dist/bot.js" ]