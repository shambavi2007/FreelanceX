# FreelanceX Deployment Guide

## Prerequisites
- Node.js 16+
- MongoDB Atlas account
- Cloudinary account (for file uploads)
- Domain name (for production)

## Environment Setup

### Backend (.env)
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/freelancex
JWT_SECRET=your_super_secret_jwt_key
CLIENT_URL=https://your-frontend-domain.com
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Frontend (.env)
```env
VITE_API_URL=https://your-backend-domain.com/api
VITE_SOCKET_URL=https://your-backend-domain.com
```

## Deployment Options

### 1. Heroku Deployment
```bash
# Install Heroku CLI
npm install -g heroku

# Login to Heroku
heroku login

# Create app
heroku create freelancex-app

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set MONGODB_URI=your_mongodb_uri
heroku config:set JWT_SECRET=your_jwt_secret

# Deploy
git push heroku main
```

### 2. Vercel (Frontend) + Railway (Backend)
```bash
# Frontend (Vercel)
npm install -g vercel
vercel --prod

# Backend (Railway)
# Connect GitHub repo to Railway
# Set environment variables in Railway dashboard
```

### 3. DigitalOcean Droplet
```bash
# SSH into droplet
ssh root@your_server_ip

# Install Node.js and PM2
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
npm install -g pm2

# Clone repository
git clone https://github.com/yourusername/freelancex.git
cd freelancex

# Install dependencies
npm run install-all

# Build frontend
npm run build

# Start with PM2
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

## Database Setup
1. Create MongoDB Atlas cluster
2. Whitelist server IP addresses
3. Create database user
4. Get connection string

## File Upload Setup
1. Create Cloudinary account
2. Get API credentials
3. Configure upload presets

## SSL Certificate
```bash
# Using Certbot for Let's Encrypt
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com
```

## Monitoring
- Use PM2 for process management
- Set up log rotation
- Configure health checks
- Monitor database performance