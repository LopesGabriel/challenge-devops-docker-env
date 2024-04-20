FROM node:18 as build

WORKDIR /usr/app/src

COPY package*.json .

RUN npm install

COPY . .

RUN npm run db:generate
RUN npm run build

FROM node:18-alpine3.19

WORKDIR /usr/app/src

RUN npm install -g prisma

COPY --from=build /usr/app/src/package*.json .
COPY --from=build /usr/app/src/dist ./dist
COPY --from=build /usr/app/src/node_modules ./node_modules
COPY ./prisma ./prisma

RUN npm prune --production

EXPOSE 3000

ENTRYPOINT [ "npm", "run", "start:prod" ]