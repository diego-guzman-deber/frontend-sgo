# ─── Stage 1: Build ───────────────────────────────────────────────────────────
FROM node:22-alpine AS builder

# Habilitar corepack para usar pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Copiar archivos de dependencias primero (optimiza caché de capas)
COPY package.json pnpm-lock.yaml ./

# Instalar dependencias sin modificar el lockfile
RUN pnpm install --frozen-lockfile

# Copiar el resto del código fuente
COPY . .

# Construir la app para producción
RUN pnpm run build

# ─── Stage 2: Serve ───────────────────────────────────────────────────────────
FROM nginx:1.27-alpine AS runner

# Copiar configuración personalizada de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiar los archivos estáticos del build
COPY --from=builder /app/dist /usr/share/nginx/html

# Exponer el puerto HTTP
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
