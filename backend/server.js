const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const studentRoutes = require('./routes/studentRoutes');

dotenv.config();

const app = express();
app.use(express.json());

// Connect to MongoDB
connectDB();

app.get('/', (req, res) => {
    res.send("Grow2gether Backend API Server Running Successfully!")
})

// Routes
app.use('/api/students', studentRoutes);

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});
