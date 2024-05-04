# Use the standard Node 18 Alpine image
FROM node:18-alpine AS base

# Create a non-root user 'refine' in 'nodejs' group
RUN addgroup -S nodejs && adduser -S refine -G nodejs

# Set /app/refine as the working directory
WORKDIR /app/refine

FROM base AS deps

RUN apk add --no-cache libc6-compat

COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* .npmrc* ./

RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

COPY --from=deps /app/refine/node_modules ./node_modules

COPY . .

RUN npm run build

FROM base AS runner

ENV NODE_ENV production
 
COPY --from=deps /app/refine/public* ./public

RUN mkdir .next
RUN chown refine:nodejs .next

COPY --from=deps --chown=refine:nodejs /app/refine/.next/standalone* ./
COPY --from=deps --chown=refine:nodejs /app/refine/.next/static* ./.next/static

USER refine

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
