const mongoose = require('mongoose');

const proposalSchema = new mongoose.Schema({
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true
  },
  freelancer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  coverLetter: {
    type: String,
    required: [true, 'Cover letter is required'],
    maxlength: [1000, 'Cover letter cannot exceed 1000 characters']
  },
  proposedBudget: {
    type: Number,
    required: [true, 'Proposed budget is required'],
    min: [0, 'Budget cannot be negative']
  },
  deliveryTime: {
    type: Number,
    required: [true, 'Delivery time is required'],
    min: [1, 'Delivery time must be at least 1 day']
  },
  deliveryTimeUnit: {
    type: String,
    enum: ['days', 'weeks', 'months'],
    default: 'days'
  },
  attachments: [{
    filename: String,
    path: String,
    mimetype: String
  }],
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected', 'withdrawn'],
    default: 'pending'
  },
  submittedAt: {
    type: Date,
    default: Date.now
  },
  respondedAt: {
    type: Date
  },
  clientMessage: {
    type: String,
    maxlength: [500, 'Client message cannot exceed 500 characters']
  }
}, {
  timestamps: true
});

// Ensure one proposal per freelancer per job
proposalSchema.index({ job: 1, freelancer: 1 }, { unique: true });
proposalSchema.index({ freelancer: 1, status: 1 });
proposalSchema.index({ job: 1, status: 1 });

module.exports = mongoose.model('Proposal', proposalSchema);