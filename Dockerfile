FROM node:10.16.0-alpine


# Create app directory
RUN mkdir -p /usr/src/api-starter
WORKDIR /usr/src/api-starter

COPY package.json /usr/src/api-starter/
RUN apk update && apk upgrade \
	&& apk add --no-cache git \
	&& apk --no-cache add --virtual builds-deps build-base python \
	&& npm install -g nodemon gulp node-gyp node-pre-gyp && npm install\
	&& npm rebuild bcrypt --build-from-source

# Bundle app source
COPY . /usr/src/api-starter

EXPOSE 3023

CMD ["npm", "start"]

