FROM node:16-alpine

WORKDIR /app
COPY package.json ./

RUN npm i --omit=dev
RUN npm install -g typescript

COPY . .

EXPOSE 8080
CMD ["npm", "run", "up"]