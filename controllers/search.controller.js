const { Op } = require('sequelize');
const Course = require('../models/course.model');
const { searchCoursesValidator, validate } = require('../middleware/course.validation');

exports.searchCourses = [
  searchCoursesValidator,
  validate,
  async (req, res) => {
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
      res.status(500).json({ status: false, error: 'Server error' });
    }
  }
];
