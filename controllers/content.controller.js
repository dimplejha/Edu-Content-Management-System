const Course = require('../models/course.model');
const Lesson = require('../models/lesson.model');
const NodeCache = require('node-cache');
const myCache = new NodeCache({ stdTTL: 600 });

exports.createCourse = async (req, res) => {
  try {
    const course = await Course.create(req.body);
    res.status(201).json(course);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getCourses = async (req, res) => {
  try {
    let courses = myCache.get('courses');
    if (!courses) {
      courses = await Course.findAll({ include: 'Lessons' });
      myCache.set('courses', courses);
    }
    res.status(200).json(courses);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


exports.getCoursesbyId = async (req, res) => {
  try {
    const courseId = req.params.id;
    const course = await Course.findByPk(courseId);

    if (!course) {
      return res.status(404).json({ status: false, error: 'Course not found' });
    }

    res.json({ status: true, course });
  } catch (error) {
    console.error('Error fetching course:', error);
    res.status(500).json({ status: false, error: 'Server error' });
  }
}


exports.updateCourse = async (req, res) => {
  try {
    const course = await Course.findByPk(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });

    await course.update(req.body);
    res.status(200).json(course);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByPk(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });

    await course.destroy();
    res.status(200).json({ message: 'Course deleted' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
