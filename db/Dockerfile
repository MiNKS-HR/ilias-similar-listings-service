FROM node:latest
RUN mkdir -p /user/src/database
WORKDIR /user/src/database
COPY package.json /user/src/database
RUN npm install mongoose
COPY . /user/src/database
EXPOSE 3003
CMD ["npm", "seed_database"]