FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm install

FROM base AS build
WORKDIR /app
COPY . .
RUN npm run prisma:generate
RUN npm run build

FROM node:20-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=4556
COPY --from=base /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/scripts ./scripts
COPY --from=build /app/node_modules/.prisma ./node_modules/.prisma
COPY package*.json ./
EXPOSE 4556
HEALTHCHECK --interval=10s --timeout=5s --retries=10 \
  CMD wget -qO- "http://127.0.0.1:${PORT}/health" || exit 1
CMD ["npm", "run", "start:docker"]
