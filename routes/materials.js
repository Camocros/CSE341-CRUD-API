const express = require('express');
const router = express.Router();
const materialsController = require('../controllers/materials');
const isAuthenticated = require('../middleware/isAuthenticated');

router.get('/', materialsController.getAll);
router.get('/:id', materialsController.getSingle);
router.post('/', isAuthenticated, materialsController.createMaterial);
router.put('/:id', isAuthenticated, materialsController.updateMaterial);
router.delete('/:id', isAuthenticated, materialsController.deleteMaterial);

module.exports = router;
