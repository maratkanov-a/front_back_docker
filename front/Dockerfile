FROM node:8.2.1

COPY ./front /front
WORKDIR /front

RUN npm install --prefix /front
RUN npm i -g webpack@1.9.11
RUN webpack

EXPOSE 3000

CMD ["node", "server.js"]