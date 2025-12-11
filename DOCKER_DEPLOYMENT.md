# Docker Deployment Guide for Kenco Website

This guide shows how to deploy the Kenco website using Docker on your Plesk server.

---

## Prerequisites

- Docker installed on your Plesk server
- Docker Compose installed (optional, but recommended)
- SSH access to your server
- PostgreSQL database already set up in Plesk

---

## Step 1: Install Docker on Plesk Server

SSH into your server and install Docker:

```bash
# Update package index
sudo apt-get update

# Install Docker
sudo apt-get install -y docker.io

# Start and enable Docker
sudo systemctl start docker
sudo systemctl enable docker

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Verify installation
docker --version
docker-compose --version
```

---

## Step 2: Clone Repository

```bash
# Navigate to your web directory
cd /var/www/vhosts/kenco.nz

# Clone the repository (if not already done)
git clone https://github.com/scope-manus-machine/kenco-website.git app

# Or if already cloned, pull latest changes
cd app
git pull origin main
```

---

## Step 3: Create Environment File

Create a `.env` file in the project root with your environment variables:

```bash
cd /var/www/vhosts/kenco.nz/app
nano .env
```

Add these variables (replace with your actual values):

```bash
# Database
DATABASE_URL=postgresql://kenco_user:YOUR_DB_PASSWORD@localhost:5432/kenco_website

# AWS Credentials
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_REGION=ap-southeast-2

# Email Configuration
SES_FROM_EMAIL=noreply@kenco.nz
SES_TO_EMAIL=web@kenco.nz

# Security
JWT_SECRET=nW4ivhTtzp0swpcghJHzWXAdW1UKeN8ABr41zGNbfD5mWro+xanSy+Css/MiR4KW

# Application
NODE_ENV=production
PORT=3000

# Frontend
VITE_APP_TITLE=Kenco Ltd - Infection Control Solutions
VITE_APP_LOGO=/logo.svg

# Optional OAuth (can leave empty if not using)
OAUTH_SERVER_URL=
OWNER_NAME=
OWNER_OPEN_ID=
VITE_OAUTH_PORTAL_URL=
```

Save and exit (Ctrl+X, then Y, then Enter).

---

## Step 4: Build and Run with Docker Compose (Recommended)

```bash
# Build and start the container
docker-compose up -d --build

# Check if container is running
docker-compose ps

# View logs
docker-compose logs -f kenco-website
```

---

## Step 5: Run Database Migrations

After the container starts, run migrations:

```bash
docker-compose exec kenco-website npm run db:push
```

---

## Step 6: Configure Nginx Reverse Proxy in Plesk

1. Go to Plesk → **kenco.nz** → **Apache & nginx Settings**
2. Add to **Additional nginx directives**:

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

3. Click **OK**

---

## Step 7: Enable SSL Certificate

1. Go to **kenco.nz** → **SSL/TLS Certificates**
2. Install **Let's Encrypt** certificate
3. Select both domain and www subdomain
4. Click **Get it free**

---

## Step 8: Test Your Website

Visit **https://kenco.nz** and verify:
- Homepage loads
- Navigation works
- Contact form submits
- Email is received

---

## Alternative: Manual Docker Commands (Without Docker Compose)

If you prefer not to use docker-compose:

### Build the image:
```bash
docker build -t kenco-website .
```

### Run the container:
```bash
docker run -d \
  --name kenco-website \
  -p 3000:3000 \
  --env-file .env \
  --restart unless-stopped \
  kenco-website
```

### Run migrations:
```bash
docker exec kenco-website npm run db:push
```

---

## Updating the Application

When you push changes to GitHub:

```bash
# Pull latest code
cd /var/www/vhosts/kenco.nz/app
git pull origin main

# Rebuild and restart
docker-compose up -d --build

# Or with manual Docker:
docker stop kenco-website
docker rm kenco-website
docker build -t kenco-website .
docker run -d --name kenco-website -p 3000:3000 --env-file .env --restart unless-stopped kenco-website
```

---

## Useful Docker Commands

```bash
# View running containers
docker ps

# View all containers (including stopped)
docker ps -a

# View logs
docker logs kenco-website
docker logs -f kenco-website  # Follow logs in real-time

# Stop container
docker stop kenco-website

# Start container
docker start kenco-website

# Restart container
docker restart kenco-website

# Remove container
docker rm kenco-website

# Remove image
docker rmi kenco-website

# Execute command in running container
docker exec -it kenco-website sh

# View container resource usage
docker stats kenco-website
```

---

## Docker Compose Commands

```bash
# Start services
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs -f

# Rebuild and restart
docker-compose up -d --build

# View status
docker-compose ps

# Execute command in service
docker-compose exec kenco-website sh
```

---

## Troubleshooting

### Container won't start
```bash
# Check logs
docker logs kenco-website

# Common issues:
# - Database connection error → Check DATABASE_URL
# - Port already in use → Check if another service uses port 3000
# - Build errors → Check Dockerfile and dependencies
```

### Database connection issues
```bash
# If using localhost in DATABASE_URL, try:
# - Use 172.17.0.1 (Docker bridge IP)
# - Or use host.docker.internal (on some systems)
# - Or add --network="host" to docker run command
```

### Can't access website
```bash
# Check if container is running
docker ps

# Check if port is accessible
curl http://localhost:3000

# Check nginx configuration in Plesk
```

---

## Backup and Restore

### Backup
```bash
# Export container
docker export kenco-website > kenco-website-backup.tar

# Save image
docker save kenco-website > kenco-website-image.tar

# Backup database (from Plesk)
pg_dump kenco_website > kenco-db-backup.sql
```

### Restore
```bash
# Import container
docker import kenco-website-backup.tar kenco-website

# Load image
docker load < kenco-website-image.tar

# Restore database
psql kenco_website < kenco-db-backup.sql
```

---

## Security Best Practices

- ✅ Never commit `.env` file to Git
- ✅ Use strong passwords for database
- ✅ Keep Docker and images updated
- ✅ Run containers as non-root user (already configured in Dockerfile)
- ✅ Use Docker secrets for sensitive data in production
- ✅ Regularly update dependencies (`npm audit fix`)
- ✅ Monitor container logs for suspicious activity

---

## Performance Optimization

### Limit container resources:
```bash
docker run -d \
  --name kenco-website \
  --memory="512m" \
  --cpus="1.0" \
  -p 3000:3000 \
  --env-file .env \
  kenco-website
```

### Or in docker-compose.yml:
```yaml
services:
  kenco-website:
    # ... other config ...
    deploy:
      resources:
        limits:
          cpus: '1.0'
          memory: 512M
```

---

## Support

- **Docker issues**: Docker documentation
- **Application errors**: Check GitHub repository
- **Plesk configuration**: Contact hosting provider
