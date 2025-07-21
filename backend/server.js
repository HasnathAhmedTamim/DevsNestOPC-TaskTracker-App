/* eslint-env node */

import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });
import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { MongoClient, ServerApiVersion, ObjectId } from 'mongodb';

const app = express();
app.use(cors());
app.use(express.json());

const uri = process.env.MONGO_URI;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
let client;
let tasksCollection;
let usersCollection;

console.log('🔍 Environment check:', {
  hasMongoUri: !!process.env.MONGO_URI,
  hasJwtSecret: !!process.env.JWT_SECRET,
  nodeEnv: process.env.NODE_ENV
});

// Global connection state for serverless
let isConnected = false;

// Connect to MongoDB and keep connection open
async function connectDB() {
  if (isConnected && client) {
    return;
  }

  try {
    if (!uri || uri.includes('<db_username>')) {
      console.log('⚠️  MongoDB URI not configured. Available env vars:', Object.keys(process.env).filter(key => key.includes('MONGO')));
      console.log('💡 Server will run without MongoDB connection for now.');
      return;
    }
    
    console.log('🔗 Attempting to connect to MongoDB...');
    client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
    });
    
    await client.connect();
    isConnected = true;
    console.log('✅ Connected to MongoDB Atlas');
    const db = client.db('tasktracker');
    tasksCollection = db.collection('tasks');
    usersCollection = db.collection('users');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    console.log('💡 Server will run without MongoDB connection for now.');
  }
}

connectDB();

// Middleware to ensure database connection for each request
const ensureDBConnection = async (req, res, next) => {
  if (!tasksCollection || !usersCollection) {
    await connectDB();
  }
  next();
};

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// Routes

// Root route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Task Tracker API Server',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      tasks: '/api/tasks',
      register: '/api/register',
      login: '/api/login',
      docs: 'See README.md for API documentation'
    },
    status: tasksCollection ? 'Connected to MongoDB' : 'MongoDB not configured'
  });
});

// User Registration
app.post('/api/register', ensureDBConnection, async (req, res) => {
  try {
    if (!usersCollection) {
      return res.status(503).json({ message: 'Database not connected. Please configure MongoDB URI.' });
    }

    const { email, password, name } = req.body;

    // Check if user already exists
    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = {
      email,
      password: hashedPassword,
      name,
      createdAt: new Date()
    };

    const result = await usersCollection.insertOne(user);
    
    // Generate JWT token
    const token = jwt.sign(
      { userId: result.insertedId, email, name },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: { id: result.insertedId, email, name }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// User Login
app.post('/api/login', ensureDBConnection, async (req, res) => {
  try {
    if (!usersCollection) {
      return res.status(503).json({ message: 'Database not connected. Please configure MongoDB URI.' });
    }

    const { email, password } = req.body;

    // Find user
    const user = await usersCollection.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email, name: user.name },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: { id: user._id, email: user.email, name: user.name }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all tasks (user-specific)
app.get('/api/tasks', authenticateToken, ensureDBConnection, async (req, res) => {
  try {
    if (!tasksCollection) {
      return res.status(503).json({ message: 'Database not connected. Please configure MongoDB URI.' });
    }
    const tasks = await tasksCollection.find({ userId: req.user.userId }).toArray();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new task
app.post('/api/tasks', authenticateToken, ensureDBConnection, async (req, res) => {
  try {
    if (!tasksCollection) {
      return res.status(503).json({ message: 'Database not connected. Please configure MongoDB URI.' });
    }
    const task = {
      ...req.body,
      userId: req.user.userId,
      userEmail: req.user.email
    };
    const result = await tasksCollection.insertOne(task);
    res.status(201).json({ ...task, _id: result.insertedId });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a task by ID
app.put('/api/tasks/:id', authenticateToken, ensureDBConnection, async (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;

  try {
    if (!tasksCollection) {
      return res.status(503).json({ message: 'Database not connected. Please configure MongoDB URI.' });
    }
    
    // Remove immutable fields that shouldn't be updated
    // eslint-disable-next-line no-unused-vars
    const { _id, userId, userEmail, ...updateFields } = updatedData;
    
    const result = await tasksCollection.findOneAndUpdate(
      { _id: new ObjectId(id), userId: req.user.userId },
      { $set: updateFields },
      { returnDocument: 'after' }
    );
    
    if (!result) return res.status(404).json({ message: 'Task not found or unauthorized' });
    res.json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a task by ID
app.delete('/api/tasks/:id', authenticateToken, ensureDBConnection, async (req, res) => {
  const id = req.params.id;

  try {
    if (!tasksCollection) {
      return res.status(503).json({ message: 'Database not connected. Please configure MongoDB URI.' });
    }
    const result = await tasksCollection.deleteOne({ 
      _id: new ObjectId(id), 
      userId: req.user.userId 
    });
    if (result.deletedCount === 0)
      return res.status(404).json({ message: 'Task not found or unauthorized' });
    res.json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    message: 'Task Tracker API is running!', 
    timestamp: new Date().toISOString(),
    mongodb: tasksCollection ? 'Connected' : 'Not configured',
    environment: {
      hasMongoUri: !!process.env.MONGO_URI,
      hasJwtSecret: !!process.env.JWT_SECRET,
      nodeEnv: process.env.NODE_ENV
    }
  });
});

// API Documentation
app.get('/api/docs', (req, res) => {
  res.json({
    title: 'Task Tracker API Documentation',
    version: '1.0.0',
    baseUrl: `http://localhost:${process.env.PORT || 5000}`,
    endpoints: {
      'GET /': 'API information',
      'GET /api/health': 'Health check',
      'GET /api/docs': 'This documentation',
      'GET /api/tasks': 'Get all tasks',
      'POST /api/tasks': 'Create a new task',
      'PUT /api/tasks/:id': 'Update a task by ID',
      'DELETE /api/tasks/:id': 'Delete a task by ID'
    },
    sampleTask: {
      title: 'Sample Task',
      description: 'This is a sample task description',
      dueDate: '2025-12-31',
      status: 'Pending',
      priority: 'High'
    },
    mongodb: {
      status: tasksCollection ? 'Connected' : 'Not configured',
      database: 'tasktracker',
      collection: 'tasks'
    }
  });
});

// 404 handler for undefined routes
app.use('*', (req, res) => {
  res.status(404).json({ 
    message: 'Route not found',
    availableRoutes: {
      root: 'GET /',
      health: 'GET /api/health',
      tasks: 'GET /api/tasks',
      createTask: 'POST /api/tasks',
      updateTask: 'PUT /api/tasks/:id',
      deleteTask: 'DELETE /api/tasks/:id'
    }
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
