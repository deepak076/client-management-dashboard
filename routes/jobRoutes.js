// routes/jobRoutes.js
const express = require('express');
const jobController = require('../controllers/jobController');

const router = express.Router();

// Route to get all job sheets
router.get('/', jobController.getAllJobSheets);

// Route to create a new job sheet
router.post('/', jobController.createJobSheet);

// Route to get a job sheet by ID
router.get('/:id', jobController.getJobSheetById);


router.put('/:id', jobController.updateJobSheet);

router.delete('/:id', jobController.deleteJobSheet);


module.exports = router;
