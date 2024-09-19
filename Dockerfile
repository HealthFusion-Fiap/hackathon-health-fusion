
FROM node:20-alpine as dev

RUN apk add git sudo bash

# Comando para rodar a aplicação
CMD cd "/app" &&\
  if [ "$WATCH_MODE" == "1" ];\
  then npm run watch;\
  else npm run build && npm run start; fi
