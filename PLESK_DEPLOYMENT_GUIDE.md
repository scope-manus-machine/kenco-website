# Plesk Docker Deployment Guide

Complete guide for deploying Manus web projects to Plesk servers using Docker. This guide captures all lessons learned from the Kenco website deployment.

---

## Prerequisites

### 1. Plesk Server Setup
- Docker installed: `sudo apt install docker.io docker-compose -y`
- Git installed: `sudo apt install git -y`
- PostgreSQL installed (if using database): `sudo apt install postgresql postgresql-contrib -y`

### 2. Project Requirements
- GitHub repository with your code
- GitHub personal access token (for private repos)
- Domain configured in Plesk
- SSL certificate enabled in Plesk

---

## Part 1: Database Setup (PostgreSQL)

### Install PostgreSQL
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib -y
```

### Configure PostgreSQL for Docker Access

1. **Allow Docker network connections:**
```bash
sudo nano /etc/postgresql/14/main/postgresql.conf
```

Find and change:
```
#listen_addresses = 'localhost'
```
To:
```
listen_addresses = '*'
```

2. **Allow Docker bridge network:**
```bash
echo "host    all             all             172.17.0.0/16           md5" | sudo tee -a /etc/postgresql/14/main/pg_hba.conf
```

3. **Restart PostgreSQL:**
```bash
sudo systemctl restart postgresql
```

4. **Verify PostgreSQL is listening on all interfaces:**
```bash
sudo netstat -tlnp | grep 5432
```
Should show `0.0.0.0:5432` (not just `127.0.0.1:5432`)

### Create Database and User

```bash
# Replace with your database name, username, and password
sudo -u postgres psql -c "CREATE DATABASE your_db_name;"
sudo -u postgres psql -c "CREATE USER your_db_user WITH PASSWORD 'your_secure_password';"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE your_db_name TO your_db_user;"
sudo -u postgres psql -d your_db_name -c "GRANT ALL ON SCHEMA public TO your_db_user;"
```

### Find Docker Bridge IP
```bash
ip addr show docker0 | grep "inet " | awk '{print $2}' | cut -d/ -f1
```
Usually returns `172.17.0.1` - use this in your DATABASE_URL.

---

## Part 2: Project Configuration

### 1. Ensure PostgreSQL Compatibility

**Check drizzle.config.ts:**
```typescript
import { defineConfig } from "drizzle-kit";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL is required to run drizzle commands");
}

export default defineConfig({
  schema: "./drizzle/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",  // ← Must be postgresql, not mysql
  dbCredentials: {
    url: connectionString,
  },
});
```

**Check drizzle/schema.ts:**
```typescript
// Must use pg-core, not mysql-core
import { integer, pgEnum, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";

// Use pgTable, not mysqlTable
export const users = pgTable("users", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  // ... rest of schema
});
```

**Check server/db.ts:**
```typescript
// Must use node-postgres, not mysql2
import { drizzle } from "drizzle-orm/node-postgres";

// Use onConflictDoUpdate, not onDuplicateKeyUpdate
await db.insert(users).values(values).onConflictDoUpdate({
  target: users.openId,
  set: updateSet,
});
```

### 2. Fix OAuth Configuration for Public Websites

**In client/src/const.ts:**
```typescript
export const getLoginUrl = () => {
  const oauthPortalUrl = import.meta.env.VITE_OAUTH_PORTAL_URL;
  const appId = import.meta.env.VITE_APP_ID;
  
  // Handle missing OAuth configuration (for public websites)
  if (!oauthPortalUrl || !appId) {
    return "/";
  }
  
  const redirectUri = `${window.location.origin}/api/oauth/callback`;
  const state = btoa(redirectUri);

  const url = new URL(`${oauthPortalUrl}/app-auth`);
  url.searchParams.set("appId", appId);
  url.searchParams.set("redirectUri", redirectUri);
  url.searchParams.set("state", state);
  url.searchParams.set("type", "signIn");

  return url.toString();
};
```

### 3. Ensure PostgreSQL Driver is Installed

**In package.json dependencies:**
```json
{
  "dependencies": {
    "pg": "^8.16.3"
  }
}
```

---

## Part 3: Docker Configuration

### Dockerfile Template

```dockerfile
# Multi-stage build for optimized production image

# Stage 1: Build stage
FROM node:22-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install ALL dependencies (needed for build and runtime with --packages=external)
RUN npm install

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Production stage
FROM node:22-alpine

WORKDIR /app

# Copy package files and install ALL dependencies
# Note: We need all deps because esbuild uses --packages=external
COPY package*.json ./
RUN npm install

# Copy built application from builder stage
COPY --from=builder /app/dist ./dist

# Copy necessary runtime files
COPY drizzle ./drizzle
COPY drizzle.config.ts ./drizzle.config.ts
COPY shared ./shared

# Expose port
EXPOSE 3000

# Set environment to production
ENV NODE_ENV=production
ENV PORT=3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/api/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Start the application
CMD ["node", "dist/index.js"]
```

### .dockerignore

```
node_modules
.git
.env
.env.*
dist
*.log
.DS_Store
.vscode
.idea
```

---

## Part 4: Deployment Steps

### 1. Clone Repository

```bash
# Choose deployment location (outside web root)
cd /opt

# Clone from GitHub
sudo git clone https://github.com/your-username/your-repo.git
cd your-repo

# For private repos, use token:
# sudo git clone https://YOUR_TOKEN@github.com/your-username/your-repo.git
```

### 2. Create Environment File

```bash
sudo nano /opt/your-repo/.env
```

**Template .env file:**
```bash
# Database (use Docker bridge IP, not host.docker.internal)
DATABASE_URL=postgresql://db_user:db_password@172.17.0.1:5432/db_name

# AWS Credentials (if using SES for email)
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_REGION=ap-southeast-2

# Email Configuration (if using SES)
SES_FROM_EMAIL=noreply@yourdomain.com
SES_TO_EMAIL=contact@yourdomain.com

# Security
JWT_SECRET=your_random_jwt_secret_here

# Application
NODE_ENV=production
PORT=3000

# Frontend Variables (for build-time)
VITE_APP_TITLE=Your Website Title
VITE_APP_LOGO=/logo.svg
```

**Important:** Use `172.17.0.1` (Docker bridge IP) instead of `host.docker.internal` in DATABASE_URL.

### 3. Build Docker Image

```bash
cd /opt/your-repo
sudo docker build -t your-app-name:latest .
```

### 4. Run Docker Container

```bash
sudo docker run -d \
  --name your-app-name \
  --restart unless-stopped \
  -p 3000:3000 \
  --env-file /opt/your-repo/.env \
  your-app-name:latest
```

### 5. Run Database Migrations

```bash
sudo docker exec -it your-app-name npm run db:push
```

**Verify tables were created:**
```bash
sudo -u postgres psql -d your_db_name -c "\dt"
```

### 6. Verify Container is Running

```bash
# Check container status
sudo docker ps

# Check logs
sudo docker logs your-app-name --tail 50

# Test local response
curl http://localhost:3000
```

---

## Part 5: Nginx Configuration in Plesk

### 1. Disable Apache Proxy Mode

1. Log into Plesk
2. Go to **Domains** → **yourdomain.com**
3. Click **Apache & nginx Settings**
4. Find and **disable** "Smart static files processing" or "Proxy mode"
5. Click **OK**

### 2. Reconfigure Domain

```bash
sudo /usr/local/psa/admin/bin/httpdmng --reconfigure-domain yourdomain.com
```

### 3. Add Proxy Configuration

```bash
sudo nano /var/www/vhosts/system/yourdomain.com/conf/vhost_nginx.conf
```

**Add this content:**
```nginx
location / {
    proxy_pass http://127.0.0.1:3000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_cache_bypass $http_upgrade;
}
```

### 4. Test and Reload Nginx

```bash
sudo nginx -t
sudo systemctl reload nginx
```

### 5. Test Live Website

```bash
curl -I https://yourdomain.com
```

---

## Part 6: AWS SES Email Configuration

### Domain Verification (Recommended)

1. **AWS Console** → **SES** → **Verified Identities** → **Create Identity**
2. Choose **Domain**
3. Enter your domain: `yourdomain.com`
4. Copy the DNS records (CNAME and TXT)
5. Add these records to your DNS provider (Route 53, Cloudflare, etc.)
6. Wait for verification (can take up to 48 hours)

### Individual Email Verification (Quick Alternative)

1. **AWS Console** → **SES** → **Verified Identities** → **Create Identity**
2. Choose **Email Address**
3. Enter: `noreply@yourdomain.com`
4. Check email inbox and click verification link
5. Update `.env` to use this email as `SES_FROM_EMAIL`

### Important Notes

- **Domain verification** allows sending from ANY email at that domain
- **Individual verification** only allows sending from that specific email
- If domain verification fails, check DNS records are correct
- SES sandbox mode requires verifying recipient emails too

---

## Part 7: Updating the Application

### Pull Latest Changes

```bash
cd /opt/your-repo
sudo git pull origin main
```

### Rebuild and Restart

```bash
sudo docker stop your-app-name
sudo docker rm your-app-name
sudo docker build -t your-app-name:latest .
sudo docker run -d \
  --name your-app-name \
  --restart unless-stopped \
  -p 3000:3000 \
  --env-file /opt/your-repo/.env \
  your-app-name:latest
```

### Run New Migrations (if schema changed)

```bash
sudo docker exec -it your-app-name npm run db:push
```

---

## Part 8: Troubleshooting

### Container Won't Start

```bash
# Check logs
sudo docker logs your-app-name

# Common issues:
# - Missing environment variables
# - Port 3000 already in use
# - Database connection failed
```

### Database Connection Refused

```bash
# Verify PostgreSQL is listening on all interfaces
sudo netstat -tlnp | grep 5432

# Should show: 0.0.0.0:5432
# If shows 127.0.0.1:5432, edit postgresql.conf and restart
```

### Nginx 502 Bad Gateway

```bash
# Check if container is running
sudo docker ps

# Check if app is responding locally
curl http://localhost:3000

# Check nginx error logs
sudo tail -f /var/www/vhosts/system/yourdomain.com/logs/proxy_error_log
```

### Email Not Sending

```bash
# Check container logs for SES errors
sudo docker logs your-app-name | grep -i "email\|ses"

# Common issues:
# - Email address not verified in AWS SES
# - Domain not verified in AWS SES
# - Wrong AWS region
# - Invalid AWS credentials
```

### Page Title Shows %VITE_APP_TITLE%

This means Vite environment variables weren't available during build. The fix requires passing build-time arguments to Docker (advanced topic - contact support if needed).

---

## Part 9: Security Checklist

- [ ] Use strong database passwords
- [ ] Use strong JWT_SECRET (generate with `openssl rand -base64 32`)
- [ ] Never commit .env files to Git
- [ ] Use HTTPS (SSL certificate enabled in Plesk)
- [ ] Keep Docker images updated
- [ ] Regularly update dependencies (`npm audit fix`)
- [ ] Limit database user permissions (don't use postgres superuser)
- [ ] Use firewall rules to restrict database access
- [ ] Enable Docker container restart policy (`--restart unless-stopped`)
- [ ] Monitor container logs for errors

---

## Part 10: Quick Reference Commands

### Docker Management
```bash
# List containers
sudo docker ps -a

# View logs
sudo docker logs your-app-name --tail 50
sudo docker logs -f your-app-name  # Follow logs

# Restart container
sudo docker restart your-app-name

# Stop container
sudo docker stop your-app-name

# Remove container
sudo docker rm your-app-name

# Remove image
sudo docker rmi your-app-name:latest

# Execute command in container
sudo docker exec -it your-app-name sh
```

### PostgreSQL Management
```bash
# Access PostgreSQL
sudo -u postgres psql

# List databases
sudo -u postgres psql -l

# Connect to database
sudo -u postgres psql -d your_db_name

# List tables
sudo -u postgres psql -d your_db_name -c "\dt"

# Backup database
sudo -u postgres pg_dump your_db_name > backup.sql

# Restore database
sudo -u postgres psql your_db_name < backup.sql
```

### Nginx Management
```bash
# Test configuration
sudo nginx -t

# Reload configuration
sudo systemctl reload nginx

# Restart nginx
sudo systemctl restart nginx

# View error logs
sudo tail -f /var/www/vhosts/system/yourdomain.com/logs/proxy_error_log
```

---

## Summary

This guide covers the complete deployment process from database setup to production deployment. Key lessons learned:

1. **PostgreSQL must listen on all interfaces** for Docker access
2. **Use Docker bridge IP** (172.17.0.1) in DATABASE_URL, not host.docker.internal
3. **Convert MySQL to PostgreSQL** syntax in schema, config, and db files
4. **Handle missing OAuth configuration** to prevent Invalid URL errors
5. **Disable Apache proxy mode** in Plesk before adding custom nginx config
6. **Verify email addresses or domains** in AWS SES before sending
7. **Include drizzle.config.ts** in Docker image for migrations
8. **Install pg driver** for PostgreSQL support

Following this guide will save hours of troubleshooting on future deployments!
