# --- STAGE 1: Dependencies ---
# Bu aşama, tüm (dev dahil) bağımlılıkları kurar.
FROM node:20-alpine AS deps

# Build argümanlarını build aşamasında kullanılabilir yap
ARG GIT_COMMIT="unknown"
ARG BUILD_DATE="unknown"
ARG SERVICE_VERSION="0.0.0"

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# --- STAGE 2: Builder ---
# Bu aşama, TypeScript kodunu JavaScript'e derler.
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# --- STAGE 3: Production ---
# Bu aşama, sadece üretim için gerekli dosyaları içeren son, hafif imajı oluşturur.
FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production

# --- HATA DÜZELTMESİ: package-lock.json'ı kopyala ---
COPY --from=builder /app/package.json /app/package-lock.json ./
COPY --from=builder /app/dist ./dist

# Sadece üretim bağımlılıklarını kur. package-lock.json sayesinde bu hızlı ve tutarlı olacaktır.
RUN npm ci --omit=dev

# Uygulamayı başlat
CMD ["node", "dist/index.js"]