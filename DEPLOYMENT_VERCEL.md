# Vercel Deployment Guide

## Prerequisites
1. Create a Vercel account at https://vercel.com
2. Install Vercel CLI: `npm i -g vercel`
3. Connect your GitHub repository to Vercel

## Environment Variables Setup
In your Vercel dashboard, add these environment variables:

```
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret_key
```

## Deployment Steps

### Method 1: GitHub Integration (Recommended)
1. Push your code to GitHub
2. Connect your GitHub repo to Vercel
3. Vercel will automatically deploy on every push

### Method 2: Manual CLI Deployment
```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy from project root
vercel

# For production deployment
vercel --prod
```

## Project Structure for Vercel
```
task-tracker-app/
├── vercel.json          # Vercel configuration
├── package.json         # Frontend dependencies
├── src/                 # React frontend
├── backend/
│   ├── server.js       # API routes
│   └── package.json    # Backend dependencies
└── dist/               # Built frontend (auto-generated)
```

## Important Notes
- Vercel will build your frontend with `npm run build`
- Backend API will be available at `/api/*` routes
- Frontend will be served from root `/`
- Environment variables must be set in Vercel dashboard
