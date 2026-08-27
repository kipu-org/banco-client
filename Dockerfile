FROM node:24.13.0-alpine AS base

# ---------------
# Setup: pnpm, pnpm store path
# ---------------
FROM base AS setup

RUN npm i -g pnpm@9.15.9

ENV PNPM_HOME=/usr/local/bin
ENV PNPM_STORE_DIR=/pnpm/store
ENV CI=true

RUN apk add --no-cache libc6-compat

WORKDIR /app

# ---------------
# Install dependencies (cached on manifests only)
# ---------------
FROM setup AS deps

COPY package.json pnpm-lock.yaml ./

RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    pnpm install --frozen-lockfile --ignore-scripts

# ---------------
# Build app (full source)
# ---------------
FROM deps AS build

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

COPY . .

RUN pnpm run build

# ---------------
# Final App
# ---------------
FROM base

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN mkdir .next

COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
COPY --from=build /app/public ./public

# ---------------
# Install AWSCLI
# ---------------
RUN apk add --no-cache python3 py3-pip
RUN pip3 install --upgrade pip --break-system-packages
RUN pip3 install --no-cache-dir awscli --break-system-packages
RUN rm -rf /var/cache/apk/*

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

COPY ./scripts/startup.sh /startup.sh
ENTRYPOINT ["sh", "/startup.sh" ]
