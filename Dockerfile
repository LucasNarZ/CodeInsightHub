FROM node:18.19.1

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY server.ts .
COPY db.ts .
COPY tsconfig.json .
COPY ./src ./src
COPY redis-sessions.ts ./

EXPOSE 4000

CMD ["npm", "run", "server"]