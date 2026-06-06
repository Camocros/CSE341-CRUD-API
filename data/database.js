const { MongoClient } = require('mongodb');
require('dotenv').config();

let database;

const initDb = async () => {
  try {
    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();

    database = client.db('w03CrudApi');

    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection failed:', error);
  }
};

const getDb = () => {
  return database;
};

module.exports = {
  initDb,
  getDb
};