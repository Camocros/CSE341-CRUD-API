const express = require('express');
const router = express.Router();
const casesController = require('../controllers/cases');

router.get('/', casesController.getAll);
router.get('/:id', casesController.getSingle);
router.post('/', casesController.createCase);
router.put('/:id', casesController.updateCase);
router.delete('/:id', casesController.deleteCase);

module.exports = router;
