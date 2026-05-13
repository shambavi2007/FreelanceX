const express = require('express');
const { getProfile, updateProfile, getFreelancers, getFreelancerById } = require('../controllers/profileController');
const { protect } = require('../middleware/authMiddleware');
const { upload, handleMulterError } = require('../middleware/uploadMiddleware');

const router = express.Router();

// @route   GET /api/profile/freelancers (public - no auth required)
router.get('/freelancers', getFreelancers);
router.get('/freelancers/:id', getFreelancerById);

// All routes below are protected
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