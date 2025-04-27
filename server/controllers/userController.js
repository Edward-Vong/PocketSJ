const User = require('../models/User');

// Get current user profile
exports.getMe = async (req, res) => {
  try {
    // User is already available from auth middleware
    const user = req.user;
    
    res.status(200).json({
      success: true,
      data: {
        user
      }
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get profile',
      error: error.message
    });
  }
};