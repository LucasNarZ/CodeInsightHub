FROM node:18.19.1

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY server.js .
COPY db.js .
COPY ./src ./src


EXPOSE 4000

CMD ["node", "server.js"]