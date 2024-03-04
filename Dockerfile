FROM node:21-alpine AS builder
WORKDIR /app
COPY ./package*.json ./
RUN npm ci
COPY ./ ./
EXPOSE 3000
RUN npm run build

FROM node:20.9.0-alpine
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
USER node
CMD ["node", "--unhandled-rejections=strict", "./dist/src/main.js"]
