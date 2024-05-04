# syntax=docker/dockerfile:1
FROM node:18-alpine
COPY . /server

WORKDIR /server

EXPOSE 5000

RUN npm install

CMD node app.js
