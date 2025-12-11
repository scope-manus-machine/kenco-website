# Environment Variables Reference

This document lists all environment variables needed for the Kenco website deployment.

## Required Variables

### Database
```bash
DATABASE_URL=postgresql://kenco_user:YOUR_PASSWORD@localhost:5432/kenco_website
```
- PostgreSQL connection string
- Update with your actual database credentials

### AWS Credentials
```bash
AWS_ACCESS_KEY_ID=your_aws_access_key_here
AWS_SECRET_ACCESS_KEY=your_aws_secret_key_here
AWS_REGION=ap-southeast-2
```
- Required for SES (email sending) and S3 (file storage)
- Get from AWS IAM console

### Email Configuration
```bash
SES_FROM_EMAIL=noreply@kenco.nz
SES_TO_EMAIL=web@kenco.nz
```
- SES_FROM_EMAIL: Sender email (must be verified in AWS SES)
- SES_TO_EMAIL: Recipient for contact form submissions

### Security
```bash
JWT_SECRET=your_random_secret_minimum_32_characters_long
```
- Generate with: `openssl rand -base64 32`
- Keep this secret and secure

### Application
```bash
NODE_ENV=production
PORT=3000
```

### Frontend
```bash
VITE_APP_TITLE=Kenco Ltd - Infection Control Solutions
VITE_APP_LOGO=/logo.svg
VITE_APP_ID=kenco-website
```

## Optional Variables

### OAuth (if using Manus authentication)
```bash
OAUTH_SERVER_URL=https://api.manus.im
OWNER_NAME=Kenco Admin
OWNER_OPEN_ID=your_owner_id_here
VITE_OAUTH_PORTAL_URL=https://oauth.manus.im
```

### Analytics
```bash
VITE_ANALYTICS_WEBSITE_ID=your_analytics_id
VITE_ANALYTICS_ENDPOINT=https://analytics.yourdomain.com
```

### Forge API (Manus features)
```bash
BUILT_IN_FORGE_API_KEY=your_forge_api_key
BUILT_IN_FORGE_API_URL=https://api.manus.im
VITE_FRONTEND_FORGE_API_KEY=your_frontend_forge_key
VITE_FRONTEND_FORGE_API_URL=https://api.manus.im
```

## Setting Variables in Plesk

1. Go to your domain in Plesk
2. Click **Node.js**
3. Scroll to **Environment Variables**
4. Add each variable with its value
5. Click **Apply**
6. Restart the application

## Security Notes

- Never commit `.env` files to Git
- Keep AWS credentials secure
- Rotate JWT_SECRET periodically
- Use strong database passwords
- Verify email addresses in AWS SES before using
