# MongoDB Atlas Setup Guide

## 🎯 **Current Status**
✅ Backend server is running on port 5000  
⚠️ MongoDB Atlas connection needs to be configured

## 📋 **Quick Setup Steps**

### Step 1: Create MongoDB Atlas Account
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Sign up for a free account
3. Create a new project called "TaskTracker"

### Step 2: Create a Cluster
1. Click "Create" to create a new cluster
2. Choose "FREE" tier (M0 Sandbox)
3. Select a cloud provider and region (closest to you)
4. Give your cluster a name (e.g., "Cluster0")
5. Click "Create Cluster"

### Step 3: Create Database User
1. Go to "Database Access" in the left sidebar
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Create username and password (remember these!)
5. Set user privileges to "Read and write to any database"
6. Click "Add User"

### Step 4: Configure Network Access
1. Go to "Network Access" in the left sidebar
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (for development)
4. Click "Confirm"

### Step 5: Get Connection String
1. Go to "Clusters" and click "Connect" on your cluster
2. Choose "Connect your application"
3. Select "Node.js" and version "4.1 or later"
4. Copy the connection string

### Step 6: Update .env File
Replace `<db_username>` and `<db_password>` in your `.env` file:

```env
MONGO_URI=mongodb+srv://your_username:your_password@cluster0.si806i3.mongodb.net/tasktracker?retryWrites=true&w=majority&appName=TaskTrackerApp
```

**Example:**
```env
MONGO_URI=mongodb+srv://john:mypassword123@cluster0.abc123.mongodb.net/tasktracker?retryWrites=true&w=majority&appName=TaskTrackerApp
```

## 🧪 **Testing the API**

Once MongoDB is configured, test these endpoints:

### 1. Health Check
```bash
curl http://localhost:5000/api/health
```

### 2. Get All Tasks
```bash
curl http://localhost:5000/api/tasks
```

### 3. Create a Task
```bash
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Task",
    "description": "This is a test task",
    "dueDate": "2025-12-31",
    "status": "Pending",
    "priority": "High"
  }'
```

### 4. Update a Task
```bash
curl -X PUT http://localhost:5000/api/tasks/TASK_ID \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Task",
    "status": "Completed"
  }'
```

### 5. Delete a Task
```bash
curl -X DELETE http://localhost:5000/api/tasks/TASK_ID
```

## 🚀 **What's Next?**

1. **Configure MongoDB Atlas** (follow steps above)
2. **Test API endpoints** with curl or Postman
3. **Update frontend** to use API instead of localStorage
4. **Add user authentication** (optional)

## 🛠 **Available Scripts**

```bash
# Run backend only
npm run dev

# Run both frontend and backend (from root directory)
npm run dev-fullstack
```

## 📁 **Current Backend Structure**

```
backend/
├── server.js          # Main server file with MongoDB Atlas integration
├── package.json       # Dependencies and scripts
├── .env               # Environment variables (update MONGO_URI)
├── .gitignore         # Git ignore file
└── README.md          # This guide
```

## 🔧 **Backend Features**

- ✅ Express.js server
- ✅ CORS enabled for frontend
- ✅ MongoDB Atlas ready (needs configuration)
- ✅ REST API endpoints for tasks CRUD
- ✅ Error handling and validation
- ✅ Helpful connection messages

Your backend is ready to connect to MongoDB Atlas! 🎉
