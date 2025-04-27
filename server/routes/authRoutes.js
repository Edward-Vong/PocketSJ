const express = require('express');
const router = express.Router();
const authController = require('../controllers/authControllers');

// Register route
router.post('/register', authController.register);

module.exports = router;