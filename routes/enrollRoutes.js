const express = require('express');
const Enrollment = require('../models/Enrollment');
const Course = require('../models/Course');
const router = express.Router();

// POST enroll
router.post('/', async (req, res, next) => {
  try {
    const { userId, courseId } = req.body;

    if (!userId || !courseId) {
      return res.status(400).json({ message: "Missing userId or courseId" });
    }

    // Check if course exists
    const course = await Course.findOne({ id: courseId });
    if (!course) return res.status(404).json({ message: "Course not found" });

    // Check if already enrolled
    const exists = await Enrollment.findOne({ userId, courseId });
    if (exists) return res.status(400).json({ message: "Already Enrolled" });

    // Enroll
    const enrollment = await Enrollment.create({ userId, courseId });
    res.json({ message: "Enrolled Successfully", enrollment });
  } catch (err) {
    next(err);
  }
});

// GET enrollments for user
router.get('/:userId', async (req, res, next) => {
  try {
    const { userId } = req.params;
    if (!userId) return res.status(400).json({ message: "Missing userId" });

    const enrollments = await Enrollment.find({ userId });
    res.json(enrollments);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
