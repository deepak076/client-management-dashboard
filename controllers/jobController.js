// controllers/jobController.js
const JobSheet = require('../models/JobSheet');
const { Op } = require('sequelize'); // Import Op for Sequelize operators


exports.getAllJobSheets = async (req, res) => {
    try {
      const searchQuery = req.query.search || '';
      const whereClause = searchQuery ? {
        [Op.or]: [
          { client_id: { [Op.like]: `%${searchQuery}%` } },
          { client_name: { [Op.like]: `%${searchQuery}%` } }
        ]
      } : {};
  
      console.log('Where Clause:', whereClause); // Log the where clause for debugging
  
      const jobSheets = await JobSheet.findAll({ where: whereClause });
      res.json(jobSheets);
    } catch (err) {
      console.error('Error fetching job sheets:', err); // Enhanced error logging
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

// Controller method to update a job sheet
exports.updateJobSheet = async (req, res) => {
    try {
        const id = req.params.id;
        const updates = req.body;

        // Find the job sheet by ID and update it
        const jobSheet = await JobSheet.findByPk(id);

        if (!jobSheet) {
            return res.status(404).json({ message: 'Job sheet not found' });
        }

        // Update the job sheet with new data
        await jobSheet.update(updates);

        res.status(200).json(jobSheet);
    } catch (error) {
        console.error('Error updating job sheet:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.deleteJobSheet = async (req, res) => {
    try {
      const { id } = req.params;
      const jobSheet = await JobSheet.destroy({ where: { id } });
  
      if (jobSheet) {
        res.status(200).json({ message: 'Job sheet deleted successfully' });
      } else {
        res.status(404).json({ message: 'Job sheet not found' });
      }
    } catch (err) {
      console.error('Error deleting job sheet:', err);
      res.status(500).json({ message: 'Internal server error' });
    }
  };