# Alternative: Local MongoDB Setup

## Option A: MongoDB Community Server
1. Download: https://www.mongodb.com/try/download/community
2. Install MongoDB Community Server
3. Start MongoDB service
4. Update .env: `MONGO_URI=mongodb://localhost:27017/tasktracker`

## Option B: MongoDB with Docker
```bash
# Pull and run MongoDB container
docker run -d -p 27017:27017 --name mongodb mongo:latest

# Update .env
MONGO_URI=mongodb://localhost:27017/tasktracker
```

## Option C: Use MongoDB Atlas (Recommended)
Follow the ATLAS_SETUP.md guide for cloud database (FREE tier available)
