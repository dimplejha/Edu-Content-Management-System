const { Op } = require('sequelize');
const Course = require('../models/course.model');

exports.searchCourses = async (req, res) => {
  try {
    const { keyword } = req.query;
    const courses = await Course.findAll({
      where: {
        title: {
          [Op.like]: `%${keyword}%`
        }
      }
    });
    res.status(200).json(courses);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
