# Backend Setup Instructions

## Prerequisites
- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas)

## Installation Steps

### 1. Install Backend Dependencies
```bash
cd backend
npm install
```

### 2. Setup Environment Variables
Create `.env` file in the backend directory with:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/tasktracker
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=development
```

### 3. Start MongoDB
- **Local MongoDB**: `mongod`
- **MongoDB Atlas**: Use your connection string in MONGODB_URI

### 4. Start Backend Server
```bash
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Tasks
- `GET /api/tasks` - Get all user tasks (protected)
- `POST /api/tasks` - Create new task (protected)
- `PUT /api/tasks/:id` - Update task (protected)
- `DELETE /api/tasks/:id` - Delete task (protected)
- `PATCH /api/tasks/:id/toggle` - Toggle task status (protected)

### Health Check
- `GET /api/health` - Server health check

## Testing the API

### 1. Register a User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "password": "password123"}'
```

### 2. Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "password": "password123"}'
```

### 3. Create a Task (use token from login)
```bash
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"title": "Test Task", "description": "Test Description", "dueDate": "2025-12-31", "status": "Pending", "priority": "High"}'
```

## Next Steps
1. Install frontend dependencies: `npm install` (in root directory)
2. Update frontend to use API instead of localStorage
3. Add axios for HTTP requests
4. Update Redux actions to use async thunks
