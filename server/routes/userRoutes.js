const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { protect } = require('../middleware/auth');

// Protected route - requires authentication
router.get('/me', protect, userController.getMe);

module.exports = router;