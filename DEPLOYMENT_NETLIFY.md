# Netlify + Railway Deployment Guide

## Frontend Deployment (Netlify)

### Prerequisites
1. Create a Netlify account at https://netlify.com
2. Build your React app

### Steps
1. **Build the frontend:**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify:**
   - Option A: Drag and drop the `dist` folder to Netlify dashboard
   - Option B: Connect GitHub repository

3. **Configure environment variables in Netlify:**
   ```
   VITE_API_URL=https://your-backend-url.railway.app
   ```

### Netlify Configuration
Create `netlify.toml` in project root:

```toml
[build]
  publish = "dist"
  command = "npm run build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  NODE_VERSION = "18"
```

## Backend Deployment (Railway)

### Prerequisites
1. Create a Railway account at https://railway.app
2. Connect your GitHub repository

### Steps
1. **Create new Railway project**
2. **Deploy from GitHub repository**
3. **Set environment variables:**
   ```
   MONGO_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=your_jwt_secret_key
   PORT=5000
   ```

4. **Railway will automatically:**
   - Detect Node.js app
   - Install dependencies
   - Start with `npm start`

### Alternative: Render
Similar to Railway, but:
1. Create account at https://render.com
2. Connect GitHub repo
3. Choose "Web Service"
4. Set build command: `cd backend && npm install`
5. Set start command: `cd backend && npm start`
