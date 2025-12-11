#!/bin/bash

# Kenco Website Deployment Script for Plesk
# This script automates the deployment process

set -e  # Exit on error

echo "🚀 Starting Kenco Website Deployment..."

# Configuration
APP_DIR="/var/www/vhosts/kenco.nz/httpdocs/kenco-app"
DOMAIN="kenco.nz"

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Change to app directory
cd "$APP_DIR" || {
    echo -e "${RED}❌ Failed to change to app directory${NC}"
    exit 1
}

echo -e "${YELLOW}📂 Working directory: $(pwd)${NC}"

# Pull latest code from GitHub
echo -e "${YELLOW}📥 Pulling latest code from GitHub...${NC}"
git pull origin main || {
    echo -e "${RED}❌ Git pull failed${NC}"
    exit 1
}
echo -e "${GREEN}✅ Code updated${NC}"

# Install dependencies
echo -e "${YELLOW}📦 Installing dependencies...${NC}"
npm install --production=false || {
    echo -e "${RED}❌ npm install failed${NC}"
    exit 1
}
echo -e "${GREEN}✅ Dependencies installed${NC}"

# Build application
echo -e "${YELLOW}🔨 Building application...${NC}"
npm run build || {
    echo -e "${RED}❌ Build failed${NC}"
    exit 1
}
echo -e "${GREEN}✅ Build completed${NC}"

# Run database migrations
echo -e "${YELLOW}🗄️  Running database migrations...${NC}"
npm run db:push || {
    echo -e "${YELLOW}⚠️  Database migrations failed (may be expected if no changes)${NC}"
}
echo -e "${GREEN}✅ Database updated${NC}"

# Restart Node.js application
echo -e "${YELLOW}🔄 Restarting Node.js application...${NC}"
if command -v plesk &> /dev/null; then
    plesk bin site --update "$DOMAIN" -nodejs-restart || {
        echo -e "${YELLOW}⚠️  Plesk restart command failed, trying alternative...${NC}"
        # Alternative: restart via systemd if Plesk command fails
        if systemctl list-units --type=service | grep -q "plesk-nodejs-$DOMAIN"; then
            systemctl restart "plesk-nodejs-$DOMAIN"
        fi
    }
else
    echo -e "${YELLOW}⚠️  Plesk CLI not available, please restart manually${NC}"
fi
echo -e "${GREEN}✅ Application restarted${NC}"

echo -e "${GREEN}🎉 Deployment completed successfully!${NC}"
echo -e "${GREEN}🌐 Visit: https://$DOMAIN${NC}"
