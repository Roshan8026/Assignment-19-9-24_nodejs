const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const authMiddleware = require('../middleware/authMiddleware');
const multer = require('multer');
const path = require('path');


// Set up Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Specify the directory to save files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Create a unique filename
  }
});

// Initialize upload with the storage configuration
const upload = multer({ storage });

router.post('/', authMiddleware, upload.single('file'),postController.createPost);
router.get('/', authMiddleware, postController.getAllPosts);
router.post('/:postId/like', authMiddleware, postController.likePost);
router.delete('/:postId/like', authMiddleware, postController.unlikePost); // Add this line

module.exports = router;
