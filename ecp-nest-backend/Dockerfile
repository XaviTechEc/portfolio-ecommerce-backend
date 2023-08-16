# Dev stage 
FROM node:18.17-alpine as dev
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
CMD ["yarn", "start:dev"]

# Installing dev dependencies
FROM  node:18.17-alpine as dev-deps
WORKDIR /app 
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Builder 
FROM node:18.17-alpine as builder
WORKDIR /app 
COPY --from=dev-deps /app/node_modules ./node_modules
COPY ./ ./ 
# RUN yarn test 
RUN yarn build 

# Installing prod dependencies 
FROM node:18.17-alpine as prod-deps 
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --prod --frozen-lockfile

# Prod Stage 
FROM node:18.17-alpine as prod 
WORKDIR /app
ENV APP_VERSION=${APP_VERSION}
COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
RUN yarn cache clean --force
EXPOSE 3000
CMD ["node" "dist/main.js"]