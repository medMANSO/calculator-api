FROM node:14.17.6
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "./"]
ENV PROD=true
RUN npm install && mv node_modules ../
COPY . .
EXPOSE 5000
CMD ["node", "server.js"]