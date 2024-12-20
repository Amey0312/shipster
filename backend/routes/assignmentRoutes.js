const express = require('express');
const router = express.Router();
const assignmentController = require('../controllers/assignmentController');

router.post('/run', assignmentController.assignOrder);
router.get('/metrics', assignmentController.getMetrics);

module.exports = router;
