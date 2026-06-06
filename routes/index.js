const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'));
router.use('/auth', require('./auth'));
router.use('/cases', require('./cases'));
router.use('/materials', require('./materials'));

router.get('/', (req, res) => {
  res.send('W03 CRUD API is running');
});

module.exports = router;
