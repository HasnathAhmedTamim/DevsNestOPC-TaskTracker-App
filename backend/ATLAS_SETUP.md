# MongoDB Atlas Quick Setup Guide

## 🎯 Follow These Steps:

### 1. Go to MongoDB Atlas
Open: https://www.mongodb.com/atlas

### 2. Create Free Account
- Click "Try Free"
- Sign up with email or GitHub

### 3. Create Cluster (FREE)
- Choose M0 Sandbox (FREE)
- Select AWS and closest region
- Name it "Cluster0"
- Click "Create Cluster"

### 4. Create Database User
- Go to "Database Access"
- Click "Add New Database User"
- Username: `taskuser`
- Password: `taskpass123` (or generate secure one)
- Privileges: "Read and write to any database"

### 5. Set Network Access
- Go to "Network Access"
- Click "Add IP Address"
- Choose "Allow Access from Anywhere"

### 6. Get Connection String
- Go to "Clusters"
- Click "Connect" → "Connect your application"
- Copy the connection string
- Should look like: `mongodb+srv://taskuser:taskpass123@cluster0.xxxxx.mongodb.net/...`

## 🔧 Example Connection String:
```
mongodb+srv://taskuser:taskpass123@cluster0.abc123.mongodb.net/tasktracker?retryWrites=true&w=majority
```

## 📝 Update Your .env:
Replace the MONGO_URI in your .env file with your actual connection string.

## ⚡ Quick Test:
After updating .env, your server will automatically restart and connect to MongoDB!
