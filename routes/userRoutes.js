const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/:followId/follow', authMiddleware, userController.followUser);

module.exports = router;
