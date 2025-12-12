# Project TODO

- [x] Add peter.carikas@kenco.nz as additional email recipient for contact form
- [x] Debug and fix contact form - emails not being received from live form
- [x] Verify all contact form files are correct and emails are actually being sent
- [x] Debug why contact form emails are not being received despite tests passing
- [x] Test real AWS SES integration with actual credentials
- [x] Fix email delivery issue and verify emails are received

## Docker Deployment on Plesk
- [x] Create Docker configuration files (Dockerfile, docker-compose.yml, .dockerignore)
- [x] Push Docker files to GitHub
- [x] Install Docker and Portainer on Plesk server
- [x] Clone code from GitHub to /opt/kenco-website
- [x] Build Docker image via SSH
- [x] Create and start Docker container with environment variables
- [x] Run database migrations in container
- [x] Configure nginx reverse proxy in Plesk
- [x] Enable SSL certificate
- [x] Test live website at kenco.nz
- [x] Fix Dockerfile to properly exclude dev dependencies from production runtime
- [x] Rebuild Docker image with fixed Dockerfile
- [x] Restart container and verify it runs successfully
- [x] Fix Dockerfile COPY path for client build output
- [x] Fix Dockerfile to copy drizzle.config.ts for database migrations
- [x] Fix drizzle config to work in Docker container (convert .ts to .js or update package.json)
- [x] Install pg (PostgreSQL driver) package for drizzle-kit
- [x] Clear drizzle meta files and regenerate for PostgreSQL
- [x] Convert drizzle schema from MySQL to PostgreSQL syntax

## Production Issues
- [ ] Fix "Invalid URL" JavaScript error on live website
- [ ] Fix contact form email sending in production environment
- [ ] Fix browser tab showing %VITE_APP_TITLE% instead of actual title
- [x] Add scroll to top when navigating between pages
- [x] Change email FROM to web@kenco.nz and TO to kendyl.carikas@kenco.nz and peter.carikas@kenco.nz
- [ ] Verify web@kenco.nz in AWS SES
- [ ] Add SPF and DKIM records to prevent spam
- [x] Add graceful error messages for contact form validation errors
- [x] Add server-side rate limiting to prevent spam and bot abuse

## SEO Optimization
- [x] Add meta tags (description, keywords, Open Graph, Twitter Cards)
- [x] Create sitemap.xml
- [x] Create robots.txt
- [x] Add structured data (JSON-LD schema)
- [x] Add canonical URLs
- [x] Create SEO component for dynamic meta tags
- [x] Create site.webmanifest for PWA support
- [ ] Add Google Analytics (requires GA4 Measurement ID)
- [ ] Add Google Search Console verification (requires verification file)
- [ ] Create og-image.jpg for social sharing
- [ ] Optimize images with alt tags
- [x] Make service cards equal height on desktop (flexible on mobile)

## Google Integrations (Current Task)
- [x] Complete Google Search Console verification
- [x] Set up Google Analytics 4 with Measurement ID
- [x] Create Google My Business listing guide
- [x] Test all Google integrations
