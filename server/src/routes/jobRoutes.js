const express = require('express');
const { body } = require('express-validator');
const {
  getJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
  getMyJobs
} = require('../controllers/jobController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');
const { upload, handleMulterError } = require('../middleware/uploadMiddleware');

const router = express.Router();

// Validation middleware
const jobValidation = [
  body('title')
    .trim()
    .isLength({ min: 5, max: 100 })
    .withMessage('Title must be between 5 and 100 characters'),
  body('description')
    .trim()
    .isLength({ min: 20, max: 2000 })
    .withMessage('Description must be between 20 and 2000 characters'),
  body('category')
    .isIn([
      'Web Development',
      'Mobile Development',
      'Graphic Design',
      'Content Writing',
      'Digital Marketing',
      'Data Analysis',
      'Video Editing',
      'Translation',
      'Other'
    ])
    .withMessage('Invalid category'),
  body('experienceLevel')
    .isIn(['entry', 'intermediate', 'expert'])
    .withMessage('Invalid experience level'),
  body('duration')
    .isIn(['less-than-1-month', '1-3-months', '3-6-months', 'more-than-6-months'])
    .withMessage('Invalid duration')
];

// Validation error handler
const handleValidationErrors = (req, res, next) => {
  const { validationResult } = require('express-validator');
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      error: 'Validation failed',
      details: errors.array()
    });
  }
  next();
};

// Public routes
router.get('/', getJobs);
router.get('/:id', getJob);

// Protected routes
router.use(protect);

// Client-only routes
router.post('/', 
  authorize('client'),
  upload.array('attachments', 5),
  handleMulterError,
  jobValidation,
  handleValidationErrors,
  createJob
);

router.put('/:id',
  authorize('client'),
  jobValidation,
  handleValidationErrors,
  updateJob
);

router.delete('/:id',
  authorize('client'),
  deleteJob
);

router.get('/my/jobs', getMyJobs);

module.exports = router;