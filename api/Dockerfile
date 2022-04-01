# Basic Docker file that we can use for production deployment later on
FROM node:14.17.5

ENV NODE_ENV production
ENV PORT="3000"

RUN mkdir -p /usr/src/app
WORKDIR usr/src/app

COPY . . 

RUN npm install -g typescript
RUN npm install
RUN npm install --dev

EXPOSE 3000

CMD ["npm","run", "dev"]
