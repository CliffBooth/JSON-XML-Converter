FROM node as builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM node

WORKDIR /app

COPY package*.json ./

RUN npm ci --production

COPY --from=builder /app/dist ./dist

ENV PORT=8080

EXPOSE 8080

CMD ["npm", "start"]