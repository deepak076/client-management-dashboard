// models/JobSheet.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Import the sequelize instance

const JobSheet = sequelize.define('JobSheet', {
    // Define columns
    client_id: {
        type: DataTypes.STRING,
        allowNull: false
    },
    client_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    contact_info: {
        type: DataTypes.STRING,
        allowNull: false
    },
    received_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    inventory_received: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    reported_issues: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    client_notes: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    assigned_technician: {
        type: DataTypes.STRING,
        allowNull: false
    },
    estimated_amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    // Other model options
    timestamps: true, // Adds `createdAt` and `updatedAt` columns
    tableName: 'job_sheets' // Explicitly specify the table name
});

module.exports = JobSheet;
