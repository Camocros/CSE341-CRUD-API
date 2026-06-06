const express = require('express');
const cors = require('cors');
require('dotenv').config();

const mongodb = require('./data/database');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/', require('./routes'));
app.get('/test-db', async (req, res) => {
  try {
    const db = mongodb.getDb();
    await db.command({ ping: 1 });

    res.status(200).json({ message: 'MongoDB is connected' });
  } catch (error) {
    res.status(500).json({ message: 'MongoDB connection error', error: error.message });
  }
});

mongodb.initDb().then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});