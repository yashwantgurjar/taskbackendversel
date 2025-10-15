const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  instructor: { type: String, required: true },
  duration: { type: String, required: true }
});

module.exports = mongoose.model('Course', courseSchema);
