# pull official base image
FROM node:16.14-alpine

# install yarn globally
RUN npm install --global --force yarn

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
RUN yarn install

# add app
COPY . ./

# start app
CMD ["yarn", "start"]