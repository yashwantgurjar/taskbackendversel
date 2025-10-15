const mongoose = require('mongoose');

const enrollmentSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  courseId: { type: String, required: true },
  enrolledAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Enrollment', enrollmentSchema);

