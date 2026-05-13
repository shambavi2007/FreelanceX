const Proposal = require('../models/Proposal');
const Job = require('../models/Job');

// @desc    Submit a proposal
// @route   POST /api/proposals
// @access  Private (Freelancer only)
const submitProposal = async (req, res) => {
  try {
    const { jobId, coverLetter, proposedBudget, deliveryTime, deliveryTimeUnit } = req.body;

    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ success: false, error: 'Job not found' });
    if (job.status !== 'active') return res.status(400).json({ success: false, error: 'This job is no longer accepting proposals' });

    // Check if already applied
    const existing = await Proposal.findOne({ job: jobId, freelancer: req.user.id });
    if (existing) return res.status(400).json({ success: false, error: 'You have already applied for this job' });

    const proposal = await Proposal.create({
      job: jobId,
      freelancer: req.user.id,
      coverLetter,
      proposedBudget,
      deliveryTime,
      deliveryTimeUnit: deliveryTimeUnit || 'days'
    });

    // Add proposal to job
    await Job.findByIdAndUpdate(jobId, { $push: { proposals: proposal._id } });

    res.status(201).json({ success: true, data: { proposal }, message: 'Proposal submitted successfully' });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ success: false, error: 'You have already applied for this job' });
    }
    console.error('Submit proposal error:', error.message);
    res.status(500).json({ success: false, error: error.message || 'Failed to submit proposal' });
  }
};

// @desc    Get my proposals (freelancer)
// @route   GET /api/proposals/my
// @access  Private (Freelancer)
const getMyProposals = async (req, res) => {
  try {
    const proposals = await Proposal.find({ freelancer: req.user.id })
      .populate('job', 'title budget status category')
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: { proposals } });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Get proposals for a job (client)
// @route   GET /api/proposals/job/:jobId
// @access  Private (Client - own jobs)
const getJobProposals = async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId);
    if (!job) return res.status(404).json({ success: false, error: 'Job not found' });
    if (job.client.toString() !== req.user.id) return res.status(403).json({ success: false, error: 'Not authorized' });

    const proposals = await Proposal.find({ job: req.params.jobId })
      .populate('freelancer', 'name avatar bio skills hourlyRate experience')
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: { proposals } });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Update proposal status (client accepts/rejects)
// @route   PUT /api/proposals/:id
// @access  Private (Client)
const updateProposalStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const proposal = await Proposal.findById(req.params.id).populate('job');

    if (!proposal) return res.status(404).json({ success: false, error: 'Proposal not found' });
    if (proposal.job.client.toString() !== req.user.id) return res.status(403).json({ success: false, error: 'Not authorized' });

    proposal.status = status;
    proposal.respondedAt = new Date();
    await proposal.save();

    res.status(200).json({ success: true, data: { proposal }, message: `Proposal ${status}` });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = { submitProposal, getMyProposals, getJobProposals, updateProposalStatus };
