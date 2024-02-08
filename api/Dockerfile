FROM node:16-alpine

WORKDIR /usr/src/api

COPY package*.json ./

RUN npm install --force

COPY . .

EXPOSE 3000

CMD ["node", "index.js"]
