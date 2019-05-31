FROM node:boron

RUN curl -o /usr/local/bin/jq http://stedolan.github.io/jq/download/linux64/jq && \
  chmod +x /usr/local/bin/jq

# Create app directory
RUN mkdir -p /usr/src/starter-service
WORKDIR /usr/src/starter-service

# Install app dependencies
COPY package.json /usr/src/starter-service/
RUN npm install

# Bundle app source
COPY . /usr/src/starter-service

EXPOSE 3023

