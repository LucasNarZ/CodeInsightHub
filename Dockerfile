FROM node:18.19.1

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY server.ts .
COPY db.ts .
COPY ./src ./src


EXPOSE 4000

CMD ["node", "server.ts"]