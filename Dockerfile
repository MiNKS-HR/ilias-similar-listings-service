FROM node:latest
RUN mkdir -p /user/src/similar
WORKDIR /user/src/similar
COPY package.json /user/src/similar
RUN npm install
COPY . /user/src/similar
EXPOSE 3003
CMD ["npm", "start"]