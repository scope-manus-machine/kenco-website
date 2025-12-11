# Complete Plesk Setup Guide for Kenco Website

Follow these steps in order to deploy your website to Plesk.

---

## Part 1: Create AWS Account & Get Credentials (for Email)

### Step 1: Create AWS Account (if you don't have one)
1. Go to https://aws.amazon.com
2. Click **Create an AWS Account**
3. Follow the signup process (requires credit card, but SES free tier covers 62,000 emails/month)

### Step 2: Create IAM User for SES
1. Log in to AWS Console
2. Go to **IAM** (Identity and Access Management)
3. Click **Users** → **Create user**
4. User name: `kenco-ses-user`
5. Click **Next**
6. Select **Attach policies directly**
7. Search and select: **AmazonSESFullAccess**
8. Click **Next** → **Create user**

### Step 3: Create Access Keys
1. Click on the user you just created (`kenco-ses-user`)
2. Go to **Security credentials** tab
3. Scroll to **Access keys** → Click **Create access key**
4. Select **Application running outside AWS**
5. Click **Next** → **Create access key**
6. **IMPORTANT**: Copy both:
   - **Access key ID** (e.g., AKIAIOSFODNN7EXAMPLE)
   - **Secret access key** (e.g., wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY)
7. **Save these somewhere safe** - you won't see the secret again!

### Step 4: Verify Email Address in SES
1. Go to **Amazon SES** in AWS Console
2. Click **Verified identities** → **Create identity**
3. Select **Email address**
4. Enter: `noreply@kenco.nz`
5. Click **Create identity**
6. Check your email and click the verification link
7. Repeat for `web@kenco.nz`

### Step 5: Request Production Access (Important!)
By default, SES is in "sandbox mode" - you can only send to verified emails.

1. In SES console, click **Account dashboard**
2. Click **Request production access**
3. Fill in the form:
   - **Mail type**: Transactional
   - **Website URL**: https://kenco.nz
   - **Use case**: Contact form notifications for infection control products website
   - **Compliance**: Confirm you won't send spam
4. Submit request (usually approved within 24 hours)

**For now, you can test with sandbox mode** - just verify both sender and recipient emails.

---

## Part 2: Set Up Database in Plesk

1. Log in to Plesk
2. Go to **Databases** → **Add Database**
3. Fill in:
   - **Database name**: `kenco_website`
   - **Database server**: PostgreSQL (select if multiple options)
4. Click **OK**
5. Create database user:
   - **Username**: `kenco_user`
   - **Password**: (generate strong password - **save it!**)
6. Grant user access to the database
7. **Note the connection details** - you'll need:
   - Host: `localhost` (or IP shown)
   - Port: `5432` (default PostgreSQL)
   - Database: `kenco_website`
   - User: `kenco_user`
   - Password: (what you set)

---

## Part 3: Deploy Code from GitHub to Plesk

1. In Plesk, go to **Domains** → **kenco.nz**
2. Click **Git** in the left sidebar
3. Click **Add Repository**
4. Configure:
   - **Repository URL**: `https://github.com/scope-manus-machine/kenco-website.git`
   - **Repository path**: `/kenco-app`
   - **Branch to deploy**: `main`
5. Click **OK**
6. Wait for code to download
7. Click **Pull Updates** if needed

---

## Part 4: Configure Node.js in Plesk

1. Go to **kenco.nz** → **Node.js**
2. Click **Enable Node.js**
3. Configure settings:
   - **Node.js version**: **22.21.1** (recommended LTS)
   - **Application mode**: **Production**
   - **Application root**: `/kenco-app`
   - **Application startup file**: `dist/index.js`
   - **Application URL**: (leave default)

---

## Part 5: Set Environment Variables

Scroll down to **Environment Variables** section in Node.js settings.

Add these variables one by one (click **+ Add Variable** for each):

### Required Variables

```bash
# Database Connection
DATABASE_URL=postgresql://kenco_user:YOUR_DB_PASSWORD@localhost:5432/kenco_website
```
Replace `YOUR_DB_PASSWORD` with the password you created in Part 2.

```bash
# AWS Credentials (from Part 1, Step 3)
AWS_ACCESS_KEY_ID=your_access_key_from_aws
AWS_SECRET_ACCESS_KEY=your_secret_key_from_aws
AWS_REGION=ap-southeast-2
```

```bash
# Email Configuration
SES_FROM_EMAIL=noreply@kenco.nz
SES_TO_EMAIL=web@kenco.nz
```

```bash
# Security (use this generated secret)
JWT_SECRET=nW4ivhTtzp0swpcghJHzWXAdW1UKeN8ABr41zGNbfD5mWro+xanSy+Css/MiR4KW
```

```bash
# Application
NODE_ENV=production
PORT=3000
```

```bash
# Frontend
VITE_APP_TITLE=Kenco Ltd - Infection Control Solutions
VITE_APP_LOGO=/logo.svg
```

### Optional Variables (can skip for now)

```bash
# OAuth (only if using Manus features - can skip)
OAUTH_SERVER_URL=https://api.manus.im
OWNER_NAME=Kenco Admin
OWNER_OPEN_ID=not_configured
VITE_OAUTH_PORTAL_URL=https://oauth.manus.im
```

---

## Part 6: Build and Deploy

### Via Plesk UI:

1. In Node.js settings, scroll to **NPM**
2. Click **NPM install** button (wait for completion)
3. Click **Run script** → Select `build` → Click **Run**
4. Wait for build to complete
5. Click **Run script** → Select `db:push` → Click **Run** (sets up database)
6. Click **Restart App** button

### Via SSH (Alternative - more control):

```bash
# SSH into your server
ssh your-server

# Navigate to app directory
cd /var/www/vhosts/kenco.nz/httpdocs/kenco-app

# Install dependencies
npm install --production=false

# Build application
npm run build

# Run database migrations
npm run db:push

# Restart via Plesk
plesk bin site --update kenco.nz -nodejs-restart
```

---

## Part 7: Configure Reverse Proxy

1. Go to **kenco.nz** → **Apache & nginx Settings**
2. Scroll to **Additional nginx directives**
3. Add this configuration:

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

4. Click **OK**

---

## Part 8: Enable SSL Certificate

1. Go to **kenco.nz** → **SSL/TLS Certificates**
2. Click **Install** next to **Let's Encrypt**
3. Select:
   - ✅ Secure the domain name kenco.nz
   - ✅ Secure the www subdomain
4. Enter email for notifications
5. Click **Get it free**
6. Wait for certificate to be issued

---

## Part 9: Test Your Website

1. Visit **https://kenco.nz** in your browser
2. Check that the homepage loads
3. Navigate to **Contact** page
4. Fill out and submit the contact form
5. Check `web@kenco.nz` email for the test message

---

## Troubleshooting

### Application won't start
- Check logs: **Node.js** → **Logs** tab
- Verify all environment variables are set correctly
- Ensure database connection string is correct

### Build fails
- Check Node.js version is 22.21.1
- Verify `npm install` completed successfully
- Check disk space: `df -h`

### Contact form doesn't send email
- Verify AWS SES credentials are correct
- Check if SES is still in sandbox mode
- Verify sender email is verified in AWS SES
- Check application logs for errors

### Database connection errors
- Verify DATABASE_URL format is correct
- Check PostgreSQL is running
- Verify database user has permissions

---

## Next Steps After Deployment

1. **Set up automatic deployments** (see PLESK_DEPLOYMENT.md)
2. **Configure backups** in Plesk Backup Manager
3. **Monitor application** via Node.js logs
4. **Set up monitoring** (optional - Uptime Robot, etc.)

---

## Support

- **Plesk issues**: Contact your hosting provider
- **Application code**: GitHub repository
- **AWS SES**: AWS Support documentation
