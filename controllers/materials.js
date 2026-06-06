const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');

const getAll = async (req, res) => {
  try {
    const db = mongodb.getDb();
    const materials = await db.collection('materials').find().toArray();
    res.status(200).json(materials);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving materials', error: error.message });
  }
};

const getSingle = async (req, res) => {
  try {
    const db = mongodb.getDb();
    const materialId = new ObjectId(req.params.id);
    const result = await db.collection('materials').findOne({ _id: materialId });
    if (!result) {
      return res.status(404).json({ message: 'Material not found' });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving material', error: error.message });
  }
};

const createMaterial = async (req, res) => {
  try {
    const { name, type, quantity, unit } = req.body;
    
    // Simple validation
    if (!name || !type || quantity === undefined || !unit) {
      return res.status(400).json({ message: 'All fields are required (name, type, quantity, unit)' });
    }

    const db = mongodb.getDb();
    const newMaterial = { name, type, quantity, unit };
    const response = await db.collection('materials').insertOne(newMaterial);
    
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ message: 'Error creating material', error: error.message });
  }
};

const updateMaterial = async (req, res) => {
  try {
    const { name, type, quantity, unit } = req.body;
    
    // Simple validation
    if (!name || !type || quantity === undefined || !unit) {
      return res.status(400).json({ message: 'All fields are required (name, type, quantity, unit)' });
    }

    const db = mongodb.getDb();
    const materialId = new ObjectId(req.params.id);
    const updatedMaterial = { name, type, quantity, unit };
    
    const response = await db.collection('materials').replaceOne({ _id: materialId }, updatedMaterial);
    
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Material not found or no changes made' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating material', error: error.message });
  }
};

const deleteMaterial = async (req, res) => {
  try {
    const db = mongodb.getDb();
    const materialId = new ObjectId(req.params.id);
    const response = await db.collection('materials').deleteOne({ _id: materialId });
    
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Material not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting material', error: error.message });
  }
};

module.exports = {
  getAll,
  getSingle,
  createMaterial,
  updateMaterial,
  deleteMaterial
};
