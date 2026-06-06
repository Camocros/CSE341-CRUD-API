const express = require('express');
const router = express.Router();
const casesController = require('../controllers/cases');
const isAuthenticated = require('../middleware/isAuthenticated');

router.get('/', casesController.getAll);
router.get('/:id', casesController.getSingle);
router.post('/', isAuthenticated, casesController.createCase);
router.put('/:id', isAuthenticated, casesController.updateCase);
router.delete('/:id', isAuthenticated, casesController.deleteCase);

module.exports = router;
