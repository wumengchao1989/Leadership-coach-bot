FROM node:18-alpine
COPY . /app
WORKDIR /app
RUN npm install
ENTRYPOINT ["npm", "start"]