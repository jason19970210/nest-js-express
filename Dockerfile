# FROM node:16
# https://hub.docker.com/layers/node/library/node/lts-slim/images/sha256-bdda9a45df06759f459ec0b4b36646300d9eefa14a0c69a582ab595f5110265c?context=explore
FROM node:lts-slim@sha256:bdda9a45df06759f459ec0b4b36646300d9eefa14a0c69a582ab595f5110265c

# Create non-root user
# RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

RUN groupadd -r node \
   && useradd -m -r -g node node

USER nodejs

# Create app directory
# WORKDIR /usr/src/app
WORKDIR /home/node/app

# Install app dependencies
COPY package*.json ./

# change to user named `node`
# USER node

RUN npm ci --only=production
# RUN npm build

# Bundle app source
# COPY . .
COPY --chown=node:node . .

RUN apk add dumb-init

# External Port
EXPOSE 8082

CMD ["dumb-init", "node", "dist/main" ]