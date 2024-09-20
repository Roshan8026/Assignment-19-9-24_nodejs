const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const cors = require('cors'); // Import the cors package
const postRoutes = require('./routes/postRoutes');
const userRoutes = require('./routes/userRoutes');
const path = require('path');

require('dotenv').config();
app.use(express.urlencoded({ extended: true })); // If you're using form-urlencoded data
// Serve static files from the "uploads" directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// Enable CORS for all routes
app.use(cors());
app.use(bodyParser.json());

// OR you can configure it like this if you want to specify a domain (frontend URL)
app.use(cors({
  origin: 'http://localhost:3000',  // Replace with your frontend's URL
  methods: 'GET,POST,PUT,DELETE',   // Allowed HTTP methods
  credentials: true                 // Allow credentials (cookies, etc.)
}));

app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/user', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
