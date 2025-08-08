FROM node:23-alpine

WORKDIR /home/site/wwwroot

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
