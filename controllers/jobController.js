// controllers/jobController.js
const JobSheet = require('../models/JobSheet');

// Get all job sheets
exports.getAllJobSheets = async (req, res) => {
  try {
    const jobSheets = await JobSheet.findAll();
    res.json(jobSheets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createJobSheet = async (req, res) => {
    try {
        const newJobSheet = await JobSheet.create(req.body);
        res.status(201).json(newJobSheet);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// Get a job sheet by ID
exports.getJobSheetById = async (req, res) => {
    try {
        const jobSheet = await JobSheet.findByPk(req.params.id);
        if (!jobSheet) {
            return res.status(404).json({ error: 'Job sheet not found' });
        }
        res.json(jobSheet);
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};