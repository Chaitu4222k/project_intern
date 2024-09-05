const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db'); // Your MongoDB connection function
const internRoutes = require('./routes/internRoutes'); // Intern management routes
const feedbackRoutes = require('./routes/feedbackRoutes'); // Feedback management routes
const performanceRoutes = require('./routes/performanceRoutes'); // Performance management routes
const taskRoutes = require('./routes/taskRoutes'); // Task management routes

dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON request bodies

// Connect to MongoDB
connectDB();

// API Routes
app.use('/api/intern', internRoutes); // Intern routes
app.use('/api/feedback', feedbackRoutes); // Feedback routes
app.use('/api/performance', performanceRoutes); // Performance routes
app.use('/api/task', taskRoutes); // Task routes

console.log(process.env.MONGO_URI);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
