FROM node:16-alpine

# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

ENV REFRESH_TOKEN_SECRET='24988addb81954e8beecc1f1407ed2c3351beff540e2cbe9eb7bc9efd5acf9f9a48c6419a230746f3904735ed95478120d1107e9bd165ee5f9c54cbc51068396'
ENV JWT_SECRET='2f4054603aa5feec3dfa720dc411fdd725ac75d2a8dbceb35595bad8613dbc7dc6cbf32f7be435d7735e6e6a2f9067e9a250a046cad0f4d62137452d2b424e39'
ENV MONGO_URL='mongodb+srv://sarthak:sarthak@twitter.jn7liyx.mongodb.net/?retryWrites=true&w=majority'


EXPOSE 8080
CMD [ "npm", "start" ]
