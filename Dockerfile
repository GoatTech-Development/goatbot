FROM node:17
# Create app directory
WORKDIR /usr/src/goatbot

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
RUN npm install
RUN apt-get update
RUN apt-get install -y telnet
RUN apt-get install -y netcat
RUN apt-get install -y iputils-ping

# If you are building your code for production
# RUN npm ci --only=production
# Bundle app source
COPY . .
CMD [ "node", "index.js" ]