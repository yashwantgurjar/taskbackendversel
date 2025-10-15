const express = require('express');
const Course = require('../models/Course');
const router = express.Router();

// GET all courses
router.get('/', async (req, res, next) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    next(err); // send to global error handler
  }
});

module.exports = router;

