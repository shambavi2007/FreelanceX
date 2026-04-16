const express = require('express');
const { getProfile, updateProfile } = require('../controllers/profileController');
const { protect } = require('../middleware/authMiddleware');
const { upload, handleMulterError } = require('../middleware/uploadMiddleware');

const router = express.Router();

// All routes are protected
router.use(protect);

// @route   GET /api/profile/me
router.get('/me', getProfile);

// @route   PUT /api/profile/update
router.put('/update', 
  upload.fields([
    { name: 'avatar', maxCount: 1 },
    { name: 'companyLogo', maxCount: 1 }
  ]),
  handleMulterError,
  updateProfile
);

module.exports = router;