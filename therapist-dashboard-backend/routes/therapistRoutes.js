// routes/therapistRoutes.js
const express = require('express');
const therapistController = require('../controllers/therapistController');
const router = express.Router();

router.get('/', therapistController.getAllTherapists);
router.post('/', therapistController.addTherapist);
router.put('/:id', therapistController.updateTherapist);
router.delete('/:id', therapistController.deleteTherapist);

module.exports = router;
