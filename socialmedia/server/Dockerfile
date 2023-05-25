FROM node:lts-alpine

RUN apk add --no-cache sqlite

WORKDIR /home/node/app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

CMD ["npm", "start"]

EXPOSE 5001

