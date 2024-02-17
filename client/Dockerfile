FROM node:latest

WORKDIR /app

COPY ./package.json .
COPY ./package-lock.json .


RUN npm install

COPY . .

ENV URLS = 'http://localhost:5173'

EXPOSE 5173

CMD [ "npm" , "run" , "start" ]