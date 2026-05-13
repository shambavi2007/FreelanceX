const User = require('../models/User');
const path = require('path');
const fs = require('fs');

// @desc    Get current user profile
// @route   GET /api/profile/me
// @access  Private
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    // Prepare profile data based on role
    let profileData = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      profileCompleted: user.profileCompleted,
      createdAt: user.createdAt
    };

    if (user.role === 'freelancer') {
      profileData = {
        ...profileData,
        bio: user.bio,
        skills: user.skills,
        experience: user.experience,
        hourlyRate: user.hourlyRate
      };
    } else if (user.role === 'client') {
      profileData = {
        ...profileData,
        companyName: user.companyName,
        companyDescription: user.companyDescription,
        companyLogo: user.companyLogo
      };
    }

    res.status(200).json({
      success: true,
      data: { profile: profileData }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Update user profile
// @route   PUT /api/profile/update
// @access  Private
const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    // Common fields that can be updated
    const { name } = req.body;
    if (name) user.name = name;

    // Handle file uploads
    if (req.files) {
      if (req.files.avatar) {
        // Delete old avatar if exists
        if (user.avatar) {
          const oldAvatarPath = path.join(process.cwd(), user.avatar);
          if (fs.existsSync(oldAvatarPath)) {
            fs.unlinkSync(oldAvatarPath);
          }
        }
        user.avatar = req.files.avatar[0].path.replace(/\\\\/g, '/');
      }
      
      if (req.files.companyLogo && user.role === 'client') {
        // Delete old logo if exists
        if (user.companyLogo) {
          const oldLogoPath = path.join(process.cwd(), user.companyLogo);
          if (fs.existsSync(oldLogoPath)) {
            fs.unlinkSync(oldLogoPath);
          }
        }
        user.companyLogo = req.files.companyLogo[0].path.replace(/\\\\/g, '/');
      }
    }

    // Role-specific updates
    if (user.role === 'freelancer') {
      const { bio, skills, experience, hourlyRate } = req.body;
      
      if (bio !== undefined) user.bio = bio;
      if (skills !== undefined) {
        // Handle skills as array or comma-separated string
        user.skills = Array.isArray(skills) ? skills : skills.split(',').map(skill => skill.trim());
      }
      if (experience !== undefined) user.experience = Number(experience);
      if (hourlyRate !== undefined) user.hourlyRate = Number(hourlyRate);
      
      // Check if freelancer profile is complete
      user.profileCompleted = !!(user.bio && user.skills.length > 0 && user.experience !== undefined && user.hourlyRate);
      
    } else if (user.role === 'client') {
      const { companyName, companyDescription } = req.body;
      
      if (companyName !== undefined) user.companyName = companyName;
      if (companyDescription !== undefined) user.companyDescription = companyDescription;
      
      // Check if client profile is complete
      user.profileCompleted = !!(user.companyName && user.companyDescription);
    }

    await user.save();

    // Prepare response data
    let profileData = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      profileCompleted: user.profileCompleted,
      createdAt: user.createdAt
    };

    if (user.role === 'freelancer') {
      profileData = {
        ...profileData,
        bio: user.bio,
        skills: user.skills,
        experience: user.experience,
        hourlyRate: user.hourlyRate
      };
    } else if (user.role === 'client') {
      profileData = {
        ...profileData,
        companyName: user.companyName,
        companyDescription: user.companyDescription,
        companyLogo: user.companyLogo
      };
    }

    res.status(200).json({
      success: true,
      data: { profile: profileData },
      message: 'Profile updated successfully'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Get all freelancers (public)
// @route   GET /api/profile/freelancers
// @access  Public
const getFreelancers = async (req, res) => {
  try {
    const { search, skill, page = 1, limit = 12 } = req.query;

    const filter = { role: 'freelancer', isActive: true };

    if (skill) filter.skills = { $in: [new RegExp(skill, 'i')] };
    if (search) filter.$or = [
      { name: new RegExp(search, 'i') },
      { bio: new RegExp(search, 'i') },
      { skills: { $in: [new RegExp(search, 'i')] } }
    ];

    const freelancers = await User.find(filter)
      .select('name avatar bio skills experience hourlyRate profileCompleted createdAt')
      .sort({ profileCompleted: -1, createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .lean();

    const total = await User.countDocuments(filter);

    res.status(200).json({
      success: true,
      data: {
        freelancers,
        pagination: { page: Number(page), limit: Number(limit), total, pages: Math.ceil(total / limit) }
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Get single freelancer by ID
// @route   GET /api/profile/freelancers/:id
// @access  Public
const getFreelancerById = async (req, res) => {
  try {
    const freelancer = await User.findOne({ _id: req.params.id, role: 'freelancer' })
      .select('name avatar bio skills experience hourlyRate location title rating createdAt')
      .lean();

    if (!freelancer) {
      return res.status(404).json({ success: false, error: 'Freelancer not found' });
    }

    res.status(200).json({ success: true, data: { freelancer } });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  getProfile,
  updateProfile,
  getFreelancers,
  getFreelancerById
};