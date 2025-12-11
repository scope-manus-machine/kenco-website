# Plesk Deployment Guide for Kenco Website

This guide walks through deploying the Kenco website to a Plesk server.

## Prerequisites

- Plesk Obsidian 18.0+ or newer
- Node.js Extension installed in Plesk
- PostgreSQL database support
- SSH access to the server
- Domain configured in Plesk (e.g., kenco.nz)

## Project Structure

This is a full-stack Node.js application with:
- **Frontend**: React 19 + Vite (SPA)
- **Backend**: Node.js + tRPC API
- **Database**: PostgreSQL with Drizzle ORM
- **Email**: AWS SES integration
- **File Storage**: AWS S3

## Deployment Steps

### 1. Prepare Plesk Environment

#### Install Node.js Extension
1. Log in to Plesk
2. Go to **Extensions** → Search for "Node.js"
3. Install the **Node.js** extension
4. Ensure Node.js version **18.x or 20.x** is available

#### Create PostgreSQL Database
1. Go to **Databases** → **Add Database**
2. Database name: `kenco_website`
3. Create user: `kenco_user`
4. Set a strong password
5. Note the connection details

### 2. Set Up Domain

1. Add domain in Plesk (or use existing): `kenco.nz`
2. Enable SSL certificate (Let's Encrypt)
3. Set document root to: `/httpdocs`

### 3. Deploy Application Files

#### Option A: Git Deployment (Recommended)

1. In Plesk, go to your domain → **Git**
2. Click **Add Repository**
3. Repository URL: `https://github.com/scope-manus-machine/kenco-website.git`
4. Branch: `main`
5. Deploy to: `/httpdocs/kenco-app`
6. Click **OK**

#### Option B: Manual Upload

1. Clone repository locally:
   ```bash
   git clone https://github.com/scope-manus-machine/kenco-website.git
   ```
2. Upload via FTP/SFTP to `/httpdocs/kenco-app`

### 4. Configure Node.js Application

1. Go to domain → **Node.js**
2. Click **Enable Node.js**
3. Configuration:
   - **Node.js version**: 20.x (or latest LTS)
   - **Application mode**: Production
   - **Application root**: `/httpdocs/kenco-app`
   - **Application startup file**: `dist/index.js`
   - **Custom environment variables**: (see section below)

### 5. Set Environment Variables

In Plesk Node.js settings, add these environment variables:

```bash
# Database
DATABASE_URL=postgresql://kenco_user:YOUR_PASSWORD@localhost:5432/kenco_website

# AWS Credentials (for SES email and S3 storage)
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=ap-southeast-2

# Email Configuration
SES_FROM_EMAIL=noreply@kenco.nz
SES_TO_EMAIL=web@kenco.nz

# JWT Secret (generate a random string)
JWT_SECRET=your_random_secret_here_min_32_chars

# OAuth (if using Manus OAuth, otherwise can be removed)
OAUTH_SERVER_URL=https://api.manus.im
OWNER_NAME=Kenco Admin
OWNER_OPEN_ID=your_owner_id

# Application
NODE_ENV=production
PORT=3000
VITE_APP_TITLE=Kenco Ltd - Infection Control Solutions
VITE_APP_LOGO=/logo.svg
```

### 6. Install Dependencies and Build

SSH into your Plesk server:

```bash
cd /var/www/vhosts/kenco.nz/httpdocs/kenco-app

# Install dependencies
npm install --production=false

# Build the application
npm run build

# Run database migrations
npm run db:push
```

### 7. Configure Reverse Proxy

The Node.js app runs on port 3000. Configure Plesk to proxy requests:

1. Go to domain → **Apache & nginx Settings**
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

### 8. Start the Application

1. Go to domain → **Node.js**
2. Click **NPM Install** (if not done via SSH)
3. Click **Run Script** → Select `build`
4. Click **Restart App**

The application should now be running!

### 9. Set Up Auto-Deployment (Optional)

#### Using GitHub Webhooks

1. In Plesk, go to domain → **Git** → **Deploy Settings**
2. Enable **Pull updates automatically**
3. Copy the webhook URL
4. In GitHub repository → **Settings** → **Webhooks** → **Add webhook**
5. Paste webhook URL
6. Content type: `application/json`
7. Select: **Just the push event**
8. Click **Add webhook**

#### Create Deploy Script

Create `/httpdocs/kenco-app/deploy.sh`:

```bash
#!/bin/bash
cd /var/www/vhosts/kenco.nz/httpdocs/kenco-app

# Pull latest code
git pull origin main

# Install dependencies
npm install --production=false

# Build application
npm run build

# Run migrations
npm run db:push

# Restart Node.js app
plesk bin site --update kenco.nz -nodejs-restart
```

Make it executable:
```bash
chmod +x deploy.sh
```

## Troubleshooting

### Application won't start
- Check Node.js logs in Plesk → Node.js → **Logs**
- Verify all environment variables are set
- Ensure database connection is working

### Database connection errors
- Verify PostgreSQL is running
- Check DATABASE_URL format
- Ensure database user has proper permissions

### Email not sending
- Verify AWS SES credentials
- Check SES sending limits (sandbox vs production)
- Verify sender email is verified in AWS SES

### Build fails
- Ensure Node.js version is 18.x or higher
- Check for sufficient disk space
- Review build logs for specific errors

## Monitoring

- **Application logs**: Plesk → Domain → Node.js → Logs
- **Web server logs**: Plesk → Domain → Logs
- **Database**: Plesk → Databases → phpPgAdmin

## Backup

Regular backups through Plesk:
1. Go to **Backup Manager**
2. Schedule automatic backups
3. Include: Files, Databases, Mail

## Security Checklist

- ✅ SSL certificate enabled
- ✅ Firewall configured
- ✅ Database user has minimal permissions
- ✅ Environment variables secured
- ✅ Regular security updates
- ✅ Fail2ban enabled (if available)

## Support

For issues specific to:
- **Plesk**: Contact your hosting provider
- **Application code**: Check GitHub repository issues
- **AWS services**: AWS Support or documentation
