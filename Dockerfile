# Use an official Ubuntu as a parent image
FROM ubuntu:20.04

# Set environment variables to prevent interactive prompts during installation
ENV DEBIAN_FRONTEND=noninteractive

# Install necessary packages
RUN apt-get update && apt-get install -y \
    curl \
    gnupg2 \
    ca-certificates \
    nginx \
    openssl \
    && rm -rf /var/lib/apt/lists/*

# Install Node.js 20
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs \
    && npm install -g npm@latest

# Set the working directory
WORKDIR /app

# Copy the package.json files for both frontend and backend to install dependencies
COPY frontend/package.json frontend/package-lock.json ./frontend/
COPY backend/package.json backend/package-lock.json ./backend/

# Install frontend dependencies
RUN cd frontend && npm install

# Install backend dependencies
RUN cd backend && npm install

# Copy the rest of the frontend and backend source code
COPY frontend/ frontend/
COPY backend/ backend/

# Build the React frontend
RUN cd frontend && npm run build

# Copy built frontend to Nginx static directory
RUN cp -r frontend/build/* /var/www/html/

# Nginx configuration
RUN echo "server { \
    listen 443 ssl; \
    server_name task.cipherroad.com; \
    ssl_certificate /etc/ssl/certs/nginx-selfsigned.crt; \
    ssl_certificate_key /etc/ssl/private/nginx-selfsigned.key; \
    location / { \
        root /var/www/html; \
        index index.html; \
        try_files \$uri \$uri/ /index.html; \
    } \
    location /api { \
        proxy_pass http://localhost:8000; \
        proxy_http_version 1.1; \
        proxy_set_header Upgrade \$http_upgrade; \
        proxy_set_header Connection 'upgrade'; \
        proxy_set_header Host \$host; \
        proxy_cache_bypass \$http_upgrade; \
    } \
}" > /etc/nginx/sites-available/default

# Expose the necessary ports
EXPOSE 443

# Start Nginx and the backend server
CMD service nginx start && cd backend && node server.js
