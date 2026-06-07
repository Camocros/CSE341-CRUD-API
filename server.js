require('dotenv').config();
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const passport = require('./config/passport');

const mongodb = require('./data/database');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Configure session
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 
  }
}));

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

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