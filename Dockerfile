# ── Stage 1: Build React/Vite frontend ──────────────────────────────────────
FROM node:22-alpine AS frontend-builder

WORKDIR /app

# Copy package files and install dependencies
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile

# Copy source and build
COPY . .
RUN pnpm run build

# ── Stage 2: Python Flask server ─────────────────────────────────────────────
FROM python:3.11-slim AS production

WORKDIR /app

# Install Python dependencies
COPY server/requirements.txt ./requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy Flask server
COPY server/app.py ./app.py

# Copy built React app from stage 1
COPY --from=frontend-builder /app/dist ./dist

# Expose port
EXPOSE 8080

# Start gunicorn
CMD ["gunicorn", "app:app", "--bind", "0.0.0.0:8080", "--workers", "2", "--timeout", "120", "--access-logfile", "-"]
