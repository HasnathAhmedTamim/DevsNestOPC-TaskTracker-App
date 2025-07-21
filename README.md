# Task Tracker App

A complete full-stack task management application built with React, Redux Toolkit, Node.js, Express, and MongoDB Atlas. Features user authentication with JWT, CRUD operations for tasks, and secure user-specific task storage.

## 🚀 Live Demo

- **Frontend App**: https://task-tracker-2imgevrto-hasnaths-projects.vercel.app
- **Backend API**: https://task-tracker-2imgevrto-hasnaths-projects.vercel.app/api/health


## Features Implemented

- ✅ **User Authentication**: JWT-based secure login/registration system
- ✅ **Task Management**: Create, read, update, delete tasks with title, description, due date, status, and priority
- ✅ **User-Specific Tasks**: Each user sees only their own tasks (MongoDB user isolation)
- ✅ **Responsive Design**: Mobile-friendly UI with Tailwind CSS and custom navy theme
- ✅ **State Management**: Redux Toolkit for global state management
- ✅ **Routing**: Protected routes with React Router DOM
- ✅ **Notifications**: Toast notifications and SweetAlert2 confirmations
- ✅ **Database Persistence**: MongoDB Atlas for secure data storage
- ✅ **Task Filtering**: View tasks by status (All, Pending, Completed)
- ✅ **Task Priorities**: High, Medium, Low priority levels
- ✅ **Real-time Updates**: Live data synchronization
- ✅ **Secure API**: JWT authentication middleware for all API endpoints

## Tech Stack

### Frontend
- **React**: 19.1.0 with Vite 7.0.5
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS with custom navy color theme
- **Routing**: React Router DOM
- **Notifications**: React Hot Toast + SweetAlert2
- **HTTP Client**: Axios with JWT interceptors

### Backend
- **Server**: Node.js + Express.js
- **Database**: MongoDB Atlas
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: bcryptjs for password hashing
- **Environment**: ES6 modules
- **Deployment**: Vercel Serverless Functions

### Deployment
- **Platform**: Vercel (Full-stack deployment)
- **Frontend**: Static build deployment
- **Backend**: Serverless API functions
- **Database**: MongoDB Atlas cloud database

## Setup Instructions

### Local Development

1. **Clone Repository**
   ```bash
   git clone https://github.com/HasnathAhmedTamim/DevsNestOPC-TaskTracker-App.git
   cd task-tracker-app
   ```

2. **Install Frontend Dependencies**
   ```bash
   npm install
   ```

3. **Install Backend Dependencies**
   ```bash
   npm run install-backend
   ```

4. **Environment Setup**
   Create `backend/.env` file:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=your_super_secret_jwt_key
   NODE_ENV=development
   ```

5. **Start Development Servers**
   ```bash
   # Start both frontend and backend
   npm run dev-fullstack
   
   # Or start individually:
   npm run dev          # Frontend only (port 5173)
   npm run backend      # Backend only (port 5000)
   ```

6. **Build for Production**
   ```bash
   npm run build
   ```

### Deployment

The app is deployed on Vercel with:
- Automatic deployments from GitHub
- Environment variables configured in Vercel dashboard
- MongoDB Atlas database connection
- Serverless API functions

## API Endpoints

### Authentication
- `POST /api/register` - User registration
- `POST /api/login` - User login

### Tasks (Protected Routes)
- `GET /api/tasks` - Get user's tasks
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

### Utility
- `GET /api/health` - Health check
- `GET /api/docs` - API documentation
- `GET /` - API information

## Usage

1. **Registration/Login**: Create account or login with existing credentials
2. **Create Tasks**: Add tasks with title, description, due date, status, and priority
3. **Manage Tasks**: Edit, delete, or toggle task status with enhanced confirmations
4. **User Isolation**: Each user account has completely isolated tasks
5. **Logout**: Secure session termination

## Database Schema

### Users Collection
```javascript
{
  _id: ObjectId,
  email: String,
  password: String (hashed),
  name: String,
  createdAt: Date
}
```

### Tasks Collection
```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  dueDate: String,
  status: String, // 'Pending' | 'Completed'
  priority: String, // 'High' | 'Medium' | 'Low'
  userId: ObjectId, // Reference to user
  userEmail: String
}
```

## Security Features

- ✅ **Password Hashing**: bcryptjs for secure password storage
- ✅ **JWT Authentication**: Secure token-based authentication
- ✅ **User Isolation**: Database-level user data separation
- ✅ **Protected Routes**: Authentication required for all task operations
- ✅ **CORS Configuration**: Cross-origin request handling
- ✅ **Environment Variables**: Secure configuration management


## Deployment Files

- `vercel.json` - Vercel configuration for full-stack deployment

## Environment Variables



## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

---

## Development Notes

This project demonstrates modern full-stack development practices with:
- Secure authentication implementation
- RESTful API design
- Real-time data synchronization
- Modern React patterns with hooks
- Redux state management
- Responsive design principles
- Cloud deployment strategies
