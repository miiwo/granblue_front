FROM node:18-alpine AS base

# Install deps only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install deps based on preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
  if [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
  elif [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  else echo 'Lockfile not found.' && exit 1; \
  fi

# Rebuild source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Potentially add .env file copy command here
# COPY .env.production.sample .env.production
# ENV NEXT_TELEMETRY_DISABLED 1
RUN \
  if [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm run build; \
  elif [ -f yarn.lock ]; then yarn run build; \
  elif [ -f package-lock.json ]; then npm run build; \
  else echo 'Lockfile not found.' && exit 1; \
  fi


# ---------------------------------------------------
# PRODUCTION
# ---------------------------------------------------
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production
# ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --gid 1001 -S nodejs
RUN adduser --uid 1001 -S nextjs

# Copy public folder if have public assets
COPY --from=builder /app/public ./public

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Start running the server
USER nextjs
EXPOSE ${PORT}
ENV PORT ${PORT}
CMD HOSTNAME=0.0.0.0 node server.js