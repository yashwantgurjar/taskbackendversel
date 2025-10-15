require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Course = require('./models/Course');

const courseRoutes = require('./routes/courseRoutes');
const enrollRoutes = require('./routes/enrollRoutes');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/STUDENT')
  .then(async () => {
    console.log('MongoDB connected');

    // Seed sample courses if none exist
    const count = await Course.countDocuments();
    if (count === 0) {
      await Course.create([
        { id: 'course01', title: 'Intro to AI', instructor: 'Dr. Smith', duration: '6 weeks' },
        { id: 'course02', title: 'Web Development Basics', instructor: 'Ms. Patel', duration: '8 weeks' },
        { id: 'course03', title: 'Data Structures', instructor: 'Prof. Kumar', duration: '10 weeks' }
      ]);
      console.log('Sample courses seeded');
    }
  })
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/courses', courseRoutes);
app.use('/api/enroll', enrollRoutes);

app.get('/', (req, res) => res.send('Backend is running'));

// Global error handler
app.use((err, req, res, next) => {
  console.error('Global Error:', err.stack);
  res.status(500).json({ message: 'Internal Server Error', error: err.message });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
