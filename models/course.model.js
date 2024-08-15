// course.model.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const Course = sequelize.define('Course', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  }
});

module.exports = Course;