# syntax=docker/dockerfile:1

FROM node:24.18.0-slim AS deps
WORKDIR /app
RUN apt-get update && apt-get install -y --no-install-recommends python3 make g++ \
  && rm -rf /var/lib/apt/lists/*
COPY package.json package-lock.json ./
RUN npm ci

FROM node:24.18.0-slim AS build
WORKDIR /app
ARG NUXT_PUBLIC_API_BASE
ARG NUXT_PUBLIC_ADSENSE_ID
ENV NUXT_PUBLIC_API_BASE=${NUXT_PUBLIC_API_BASE} \
    NUXT_PUBLIC_ADSENSE_ID=${NUXT_PUBLIC_ADSENSE_ID}
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:24.18.0-slim AS runtime
WORKDIR /app
ENV NODE_ENV=production \
    HOST=0.0.0.0 \
    PORT=3000
RUN groupadd --system nuxt && useradd --system --gid nuxt --home-dir /app nuxt
COPY --from=build --chown=nuxt:nuxt /app/.output ./.output
USER nuxt
EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]