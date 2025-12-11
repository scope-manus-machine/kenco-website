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
- [ ] Create and start Docker container with environment variables
- [ ] Run database migrations in container
- [ ] Configure nginx reverse proxy in Plesk
- [ ] Enable SSL certificate
- [ ] Test live website at kenco.nz
- [ ] Fix Dockerfile to properly exclude dev dependencies from production runtime
- [ ] Rebuild Docker image with fixed Dockerfile
- [ ] Restart container and verify it runs successfully
- [ ] Fix Dockerfile COPY path for client build output
