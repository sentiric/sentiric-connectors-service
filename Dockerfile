# --- STAGE 1: Builder ---
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# --- STAGE 2: Production ---
FROM node:20-alpine
WORKDIR /app

# Bu ENV satırı aslında gereksiz kalıyor ama iyi bir pratiktir.
ENV NODE_ENV=production

COPY package*.json ./
RUN npm ci --omit=dev

COPY --from=builder /app/dist ./dist

# DÜZELTME: Doğrudan 'node' komutunu çağırmak yerine,
# package.json'daki 'start' script'imizi çalıştırıyoruz.
# Bu, NODE_ENV=production atamasının uygulanmasını garanti eder.
CMD ["npm", "run", "start"]