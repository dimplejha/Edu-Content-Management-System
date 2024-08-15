const { createCourseValidator, updateCourseValidator, getCourseByIdValidator, deleteCourseValidator, searchCoursesValidator, validate } = require('../middleware/course.validation');
const Course = require('../models/course.model');
const Lesson = require('../models/lesson.model');
const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 600 });

// Create Course
exports.createCourse = [
  createCourseValidator,
  validate,
  async (req, res) => {
    try {
      const course = await Course.create(req.body);
      res.status(201).json(course);
    } catch (error) {
      return res.status(500).send({ status: false, error: error.message });
    }
  }
];

// Get Courses with Caching
exports.getCourses = async (req, res) => {
  try {
    const cachedCourses = cache.get('allCourses');
    if (cachedCourses) {
      return res.json({ status: true, courses: cachedCourses });
    }

    const courses = await Course.findAll({ include: 'lessons' });
    cache.set('allCourses', courses); // Store in cache
    res.json({ status: true, courses });
  } catch (error) {
    console.error('Error fetching courses:', error);
    return res.status(500).send({ status: false, error: error.message });
  }
};

// Get Course by ID
exports.getCoursesbyId = [
  getCourseByIdValidator,
  validate,
  async (req, res) => {
    try {
      const courseId = req.params.id;
      const course = await Course.findByPk(courseId, {
        attributes: ['title', 'description'],
        include: [{
          model: Lesson,
          as: 'lessons',
          attributes: ['title']
        }]
      });

      if (!course) {
        return res.status(404).json({ status: false, error: 'Course not found' });
      }

      res.json({ status: true, course });
    } catch (error) {
      console.error('Error fetching course:', error);
      return res.status(500).send({ status: false, error: error.message });
    }
  }
];

// Update Course
exports.updateCourse = [
  updateCourseValidator,
  validate,
  async (req, res) => {
    try {
      const course = await Course.findByPk(req.params.id);
      if (!course) return res.status(404).json({ message: 'Course not found' });

      await course.update(req.body);
      res.status(200).json(course);
    } catch (error) {
      return res.status(500).send({ status: false, error: error.message });
    }
  }
];

// Delete Course
exports.deleteCourse = [
  deleteCourseValidator,
  validate,
  async (req, res) => {
    try {
      const course = await Course.findByPk(req.params.id);
      if (!course) return res.status(404).json({ message: 'Course not found' });

      await course.destroy();
      res.status(200).json({ message: 'Course deleted' });
    } catch (error) {
      return res.status(500).send({ status: false, error: error.message });
    }
  }
];



