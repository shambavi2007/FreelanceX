const Job = require('../models/Job');
const User = require('../models/User');

// @desc    Get all jobs with filters
// @route   GET /api/jobs
// @access  Public
const getJobs = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      category,
      budgetMin,
      budgetMax,
      experienceLevel,
      search,
      sortBy = 'postedAt',
      sortOrder = 'desc'
    } = req.query;

    // Build filter object
    const filter = { status: 'active' };
    
    if (category) filter.category = category;
    if (experienceLevel) filter.experienceLevel = experienceLevel;
    if (budgetMin || budgetMax) {
      filter['budget.min'] = {};
      if (budgetMin) filter['budget.min'].$gte = Number(budgetMin);
      if (budgetMax) filter['budget.max'].$lte = Number(budgetMax);
    }
    if (search) {
      filter.$text = { $search: search };
    }

    // Execute query with pagination
    const jobs = await Job.find(filter)
      .populate('client', 'name companyName avatar')
      .sort({ [sortBy]: sortOrder === 'desc' ? -1 : 1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .lean();

    const total = await Job.countDocuments(filter);

    res.status(200).json({
      success: true,
      data: {
        jobs,
        pagination: {
          page: Number(page),
          limit: Number(limit),
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    console.error('Get jobs error:', error.message);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch jobs'
    });
  }
};

// @desc    Get single job
// @route   GET /api/jobs/:id
// @access  Public
const getJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)
      .populate('client', 'name companyName companyDescription avatar createdAt');

    if (!job) {
      return res.status(404).json({
        success: false,
        error: 'Job not found'
      });
    }

    res.status(200).json({
      success: true,
      data: { job }
    });
  } catch (error) {
    console.error('Get job error:', error.message);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to fetch job'
    });
  }
};

// @desc    Create new job
// @route   POST /api/jobs
// @access  Private (Client only)
const createJob = async (req, res) => {
  try {
    const {
      title,
      description,
      budget,
      budgetType,
      skills,
      category,
      experienceLevel,
      duration,
      deadline
    } = req.body;

    // Validate required fields
    if (!title || !description || !budget || !category || !experienceLevel || !duration) {
      return res.status(400).json({
        success: false,
        error: 'Please provide all required fields'
      });
    }

    // Handle file attachments
    const attachments = [];
    if (req.files && req.files.length > 0) {
      req.files.forEach(file => {
        attachments.push({
          filename: file.originalname,
          path: file.path.replace(/\\\\/g, '/'),
          mimetype: file.mimetype
        });
      });
    }

    const job = await Job.create({
      title,
      description,
      budget: typeof budget === 'string' ? JSON.parse(budget) : budget,
      budgetType,
      skills: typeof skills === 'string' ? skills.split(',').map(s => s.trim()) : skills,
      category,
      experienceLevel,
      duration,
      deadline: deadline ? new Date(deadline) : undefined,
      attachments,
      client: req.user.id
    });

    const populatedJob = await Job.findById(job._id)
      .populate('client', 'name companyName avatar');

    res.status(201).json({
      success: true,
      data: { job: populatedJob },
      message: 'Job posted successfully'
    });
  } catch (error) {
    console.error('Create job error:', error.message);
    res.status(500).json({
      success: false,
      error: 'Failed to create job'
    });
  }
};

// @desc    Update job
// @route   PUT /api/jobs/:id
// @access  Private (Client only - own jobs)
const updateJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        error: 'Job not found'
      });
    }

    // Check if user owns the job
    if (job.client.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to update this job'
      });
    }

    // Update fields
    const allowedUpdates = [
      'title', 'description', 'budget', 'skills', 
      'experienceLevel', 'duration', 'deadline', 'status'
    ];
    
    allowedUpdates.forEach(field => {
      if (req.body[field] !== undefined) {
        if (field === 'skills' && typeof req.body[field] === 'string') {
          job[field] = req.body[field].split(',').map(s => s.trim());
        } else if (field === 'budget' && typeof req.body[field] === 'string') {
          job[field] = JSON.parse(req.body[field]);
        } else {
          job[field] = req.body[field];
        }
      }
    });

    await job.save();

    const updatedJob = await Job.findById(job._id)
      .populate('client', 'name companyName avatar');

    res.status(200).json({
      success: true,
      data: { job: updatedJob },
      message: 'Job updated successfully'
    });
  } catch (error) {
    console.error('Update job error:', error.message);
    res.status(500).json({
      success: false,
      error: 'Failed to update job'
    });
  }
};

// @desc    Delete job
// @route   DELETE /api/jobs/:id
// @access  Private (Client only - own jobs)
const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        error: 'Job not found'
      });
    }

    // Check if user owns the job
    if (job.client.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to delete this job'
      });
    }

    await Job.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Job deleted successfully'
    });
  } catch (error) {
    console.error('Delete job error:', error.message);
    res.status(500).json({
      success: false,
      error: 'Failed to delete job'
    });
  }
};

// @desc    Get user's jobs
// @route   GET /api/jobs/my-jobs
// @access  Private
const getMyJobs = async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    
    const filter = { client: req.user.id };
    if (status) filter.status = status;

    const jobs = await Job.find(filter)
      .populate('client', 'name companyName avatar')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Job.countDocuments(filter);

    res.status(200).json({
      success: true,
      data: {
        jobs,
        pagination: {
          page: Number(page),
          limit: Number(limit),
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    console.error('Get my jobs error:', error.message);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch your jobs'
    });
  }
};

module.exports = {
  getJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
  getMyJobs
};