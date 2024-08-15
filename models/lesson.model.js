

// lesson.model.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');
const Course = require('./course.model');

const Lesson = sequelize.define('Lesson', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT
  }
});

Course.hasMany(Lesson, { as: 'Lessons' });
Lesson.belongsTo(Course);

module.exports = Lesson;
