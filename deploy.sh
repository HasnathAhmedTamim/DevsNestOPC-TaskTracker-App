#!/bin/bash

# Deployment script for Task Tracker App

echo "🚀 Starting deployment process..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Run this script from the project root."
    exit 1
fi

echo "📦 Installing dependencies..."
npm install

echo "📦 Installing backend dependencies..."
cd backend && npm install && cd ..

echo "🏗️ Building frontend..."
npm run build

echo "✅ Build complete! Your app is ready for deployment."
echo ""
echo "📁 Frontend build files are in: ./dist/"
echo "🔧 Backend files are in: ./backend/"
echo ""
echo "Next steps:"
echo "1. For Vercel: Run 'vercel' command or connect GitHub repo"
echo "2. For Netlify: Upload 'dist' folder or connect GitHub repo"
echo "3. For Railway/Render: Deploy backend from 'backend' folder"
echo ""
echo "Don't forget to set your environment variables!"
echo "- MONGO_URI (your MongoDB Atlas connection string)"
echo "- JWT_SECRET (your JWT secret key)"
