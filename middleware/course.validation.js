const { body, param, query,validationResult } = require('express-validator');

const createCourseValidator = [
  body('title').notEmpty().withMessage('Title is required'),
  body('description').optional().isString().withMessage('Description must be a string'),
];

const updateCourseValidator = [
  param('id').isInt().withMessage('Course ID must be an integer'),
  body('title').optional().isString().withMessage('Title must be a string'),
  body('description').optional().isString().withMessage('Description must be a string'),
];

const getCourseByIdValidator = [
  param('id').isInt().withMessage('Course ID must be an integer'),
];

const deleteCourseValidator = [
  param('id').isInt().withMessage('Course ID must be an integer'),
];

const searchCoursesValidator = [
  query('keyword').optional().isString().withMessage('Keyword must be a string'),
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  createCourseValidator,
  updateCourseValidator,
  getCourseByIdValidator,
  deleteCourseValidator,
  searchCoursesValidator,
  validate,
};
