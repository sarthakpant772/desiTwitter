FROM node:16-alpine

WORKDIR /app

COPY ./package.json .

RUN npm install

COPY . .

ENV URLS = 'http://localhost:8080'

EXPOSE 5173

CMD [ "npm" , "run" , "start" ]