# This stage installs our modules
FROM node:16-alpine

WORKDIR /app
COPY package.json ./

RUN npm i --omit=dev

FROM node:16-alpine

WORKDIR /app
COPY --from=0 /app .
COPY . .

EXPOSE 8080
CMD ["npm", "run", "up"]