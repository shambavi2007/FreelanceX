const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Job title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Job description is required'],
    maxlength: [2000, 'Description cannot exceed 2000 characters']
  },
  budget: {
    min: {
      type: Number,
      required: [true, 'Minimum budget is required'],
      min: [0, 'Budget cannot be negative']
    },
    max: {
      type: Number,
      required: [true, 'Maximum budget is required'],
      min: [0, 'Budget cannot be negative']
    }
  },
  budgetType: {
    type: String,
    enum: ['fixed', 'hourly'],
    required: [true, 'Budget type is required']
  },
  skills: [{
    type: String,
    trim: true
  }],
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: [
      'Web Development',
      'Mobile Development', 
      'Graphic Design',
      'Content Writing',
      'Digital Marketing',
      'Data Analysis',
      'Video Editing',
      'Translation',
      'Other'
    ]
  },
  experienceLevel: {
    type: String,
    enum: ['entry', 'intermediate', 'expert'],
    required: [true, 'Experience level is required']
  },
  duration: {
    type: String,
    enum: ['less-than-1-month', '1-3-months', '3-6-months', 'more-than-6-months'],
    required: [true, 'Project duration is required']
  },
  attachments: [{
    filename: String,
    path: String,
    mimetype: String
  }],
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'in-progress', 'completed', 'cancelled', 'draft'],
    default: 'active'
  },
  proposals: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Proposal'
  }],
  selectedFreelancer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  postedAt: {
    type: Date,
    default: Date.now
  },
  deadline: {
    type: Date
  }
}, {
  timestamps: true
});

// Index for search functionality
jobSchema.index({ title: 'text', description: 'text', skills: 'text' });
jobSchema.index({ category: 1, status: 1 });
jobSchema.index({ client: 1, status: 1 });

module.exports = mongoose.model('Job', jobSchema);