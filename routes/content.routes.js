const express = require('express');
const router = express.Router();
const contentController = require('../controllers/content.controller');
const authenticateToken = require('../middleware/auth');

router.post('/courses', authenticateToken, contentController.createCourse);
router.get('/courses', authenticateToken, contentController.getCourses);
router.put('/courses/:id', authenticateToken, contentController.updateCourse);
router.delete('/courses/:id', authenticateToken, contentController.deleteCourse);

module.exports = router;
