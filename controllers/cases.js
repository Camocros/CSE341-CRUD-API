const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');

const getAll = async (req, res) => {
  try {
    const db = mongodb.getDb();
    const cases = await db.collection('cases').find().toArray();
    res.status(200).json(cases);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving cases', error: error.message });
  }
};

const getSingle = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Must use a valid case id to find a case.' });
    }
    const db = mongodb.getDb();
    const caseId = new ObjectId(req.params.id);
    const result = await db.collection('cases').findOne({ _id: caseId });
    if (!result) {
      return res.status(404).json({ message: 'Case not found' });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving case', error: error.message });
  }
};

const createCase = async (req, res) => {
  try {
    const { caseNumber, title, description, dateOpened, status, assignedTo, priority } = req.body;
    
    // Simple validation
    if (!caseNumber || !title || !description || !dateOpened || !status || !assignedTo || !priority) {
      return res.status(400).json({ message: 'All fields are required (caseNumber, title, description, dateOpened, status, assignedTo, priority)' });
    }

    const db = mongodb.getDb();
    const newCase = { caseNumber, title, description, dateOpened, status, assignedTo, priority };
    const response = await db.collection('cases').insertOne(newCase);
    
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ message: 'Error creating case', error: error.message });
  }
};

const updateCase = async (req, res) => {
  try {
    const { caseNumber, title, description, dateOpened, status, assignedTo, priority } = req.body;
    
    // Simple validation
    if (!caseNumber || !title || !description || !dateOpened || !status || !assignedTo || !priority) {
      return res.status(400).json({ message: 'All fields are required (caseNumber, title, description, dateOpened, status, assignedTo, priority)' });
    }

    const db = mongodb.getDb();
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Must use a valid case id to update a case.' });
    }
    const caseId = new ObjectId(req.params.id);
    const updatedCase = { caseNumber, title, description, dateOpened, status, assignedTo, priority };
    
    const response = await db.collection('cases').replaceOne({ _id: caseId }, updatedCase);
    
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Case not found or no changes made' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating case', error: error.message });
  }
};

const deleteCase = async (req, res) => {
  try {
    const db = mongodb.getDb();
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Must use a valid case id to delete a case.' });
    }
    const caseId = new ObjectId(req.params.id);
    const response = await db.collection('cases').deleteOne({ _id: caseId });
    
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Case not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting case', error: error.message });
  }
};

module.exports = {
  getAll,
  getSingle,
  createCase,
  updateCase,
  deleteCase
};
