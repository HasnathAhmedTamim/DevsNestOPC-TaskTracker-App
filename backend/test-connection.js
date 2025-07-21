// Test MongoDB connection
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = process.env.MONGO_URI;

async function testConnection() {
  if (!uri || uri.includes('<db_username>')) {
    console.log('❌ Please update MONGO_URI in .env file with your actual credentials');
    console.log('Current URI:', uri);
    return;
  }

  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

  try {
    console.log('🔄 Connecting to MongoDB Atlas...');
    await client.connect();
    
    console.log('🔄 Testing connection...');
    await client.db("admin").command({ ping: 1 });
    
    console.log('✅ Successfully connected to MongoDB Atlas!');
    console.log('📊 Database: tasktracker');
    
    // Test database operations
    const db = client.db('tasktracker');
    const collection = db.collection('tasks');
    
    // Try to find documents (should return empty array for new database)
    const tasks = await collection.find().toArray();
    console.log('📝 Current tasks in database:', tasks.length);
    
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
  } finally {
    await client.close();
    console.log('🔐 Connection closed');
  }
}

testConnection();
