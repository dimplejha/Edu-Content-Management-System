// models/lesson.model.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');
const Course = require('./course.model');

const Lesson = sequelize.define('Lesson', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    indexes: true,  // Indexing the title for faster search
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  courseId: {
    type: DataTypes.INTEGER,
    references: {
      model: Course,
      key: 'id'
    }
  }
}, {
  indexes: [
    {
      fields: ['title']  // Indexing the title field
    },
    {
      fields: ['courseId']  // Indexing the foreign key field
    }
  ]
});

Course.hasMany(Lesson, { as: 'lessons', foreignKey: 'courseId' });
Lesson.belongsTo(Course, { foreignKey: 'courseId' });

module.exports = Lesson;
