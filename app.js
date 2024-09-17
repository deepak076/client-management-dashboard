// app.js
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const sequelize = require('./config/database');
const jobRoutes = require('./routes/jobRoutes'); // Import the job routes

const app = express();

// Body parser middleware
app.use(bodyParser.json());

// Serve static files (CSS, images)
app.use(express.static(path.join(__dirname, 'public')));

// Use job routes for API calls
app.use('/api/jobs', jobRoutes);

// Home page route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Sync models and start the server
sequelize.sync()
  .then(() => console.log('Database synced successfully'))
  .catch(err => console.log('Error syncing database:', err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
