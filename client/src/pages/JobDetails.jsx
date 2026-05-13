import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FiClock, FiDollarSign, FiMapPin, FiUser, FiCalendar, FiFileText, FiArrowLeft, FiSend } from 'react-icons/fi';
import { jobAPI, proposalAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [applying, setApplying] = useState(false);
  const [proposal, setProposal] = useState({
    coverLetter: '',
    proposedBudget: '',
    deliveryTime: '',
    deliveryTimeUnit: 'days'
  });

  useEffect(() => {
    fetchJobDetails();
  }, [id]);

  const fetchJobDetails = async () => {
    try {
      const response = await jobAPI.getJob(id);
      const jobData = response.data?.job || response.data;
      if (!jobData) {
        toast.error('Job not found');
        return;
      }
      setJob(jobData);
    } catch (error) {
      const msg = error.response?.data?.error || error.message || 'Failed to load job details';
      toast.error(msg);
      console.error('Fetch job error:', error.response?.data || error);
    } finally {
      setLoading(false);
    }
  };

  const handleApplyClick = () => {
    if (!isAuthenticated) {
      toast.error('Please login to apply');
      navigate('/login');
      return;
    }
    if (user?.role === 'client') {
      toast.error('Clients cannot apply for jobs');
      return;
    }
    setShowApplyModal(true);
  };

  const handleApply = async (e) => {
    e.preventDefault();
    setApplying(true);
    try {
      await proposalAPI.submitProposal({
        jobId: id,
        coverLetter: proposal.coverLetter,
        proposedBudget: Number(proposal.proposedBudget),
        deliveryTime: Number(proposal.deliveryTime),
        deliveryTimeUnit: proposal.deliveryTimeUnit
      });
      toast.success('Proposal submitted successfully!');
      setShowApplyModal(false);
      setProposal({ coverLetter: '', proposedBudget: '', deliveryTime: '', deliveryTimeUnit: 'days' });
      fetchJobDetails();
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to submit proposal');
    } finally {
      setApplying(false);
    }
  };

  const timeAgo = (date) => {
    const now = new Date();
    const posted = new Date(date);
    const diffInHours = Math.floor((now - posted) / (1000 * 60 * 60));
    if (diffInHours < 1) return 'Just posted';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays} days ago`;
    return `${Math.floor(diffInDays / 7)} weeks ago`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Job not found</h2>
          <Link to="/jobs" className="btn-primary">Back to Jobs</Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
          >
            <FiArrowLeft className="w-5 h-5" />
            <span>Back to Jobs</span>
          </button>

          {/* Job Header */}
          <div className="bg-white rounded-lg shadow-sm p-8 mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{job.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-6">
              <span className="flex items-center space-x-2">
                <FiClock className="w-4 h-4" />
                <span>{timeAgo(job.postedAt || job.createdAt)}</span>
              </span>
              <span className="flex items-center space-x-2">
                <FiMapPin className="w-4 h-4" />
                <span>{job.location || 'Remote'}</span>
              </span>
              <span className="flex items-center space-x-2">
                <FiUser className="w-4 h-4" />
                <span>{job.proposals?.length || 0} proposals</span>
              </span>
            </div>

            {/* Budget, Duration, Experience */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-green-50 rounded-lg p-4">
                <div className="flex items-center space-x-2 text-green-600 mb-2">
                  <FiDollarSign className="w-5 h-5" />
                  <span className="text-sm font-medium">Budget</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">₹{job.budget?.min} - ₹{job.budget?.max}</p>
              </div>
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-center space-x-2 text-blue-600 mb-2">
                  <FiCalendar className="w-5 h-5" />
                  <span className="text-sm font-medium">Duration</span>
                </div>
                <p className="text-lg font-semibold text-gray-900">{job.duration || 'Not specified'}</p>
              </div>
              <div className="bg-purple-50 rounded-lg p-4">
                <div className="flex items-center space-x-2 text-purple-600 mb-2">
                  <FiFileText className="w-5 h-5" />
                  <span className="text-sm font-medium">Experience</span>
                </div>
                <p className="text-lg font-semibold text-gray-900 capitalize">{job.experienceLevel}</p>
              </div>
            </div>

            {/* Apply Button - only for freelancers */}
            {user?.role !== 'client' && (
              <button
                onClick={handleApplyClick}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                <FiSend className="w-5 h-5" />
                <span>Apply Now</span>
              </button>
            )}
          </div>

          {/* Job Description */}
          <div className="bg-white rounded-lg shadow-sm p-8 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Job Description</h2>
            <p className="text-gray-700 whitespace-pre-line leading-relaxed">{job.description}</p>
          </div>

          {/* Skills */}
          <div className="bg-white rounded-lg shadow-sm p-8 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Skills Required</h2>
            <div className="flex flex-wrap gap-3">
              {job.skills && job.skills.length > 0 ? (
                job.skills.map((skill, index) => (
                  <span key={index} className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                    {skill}
                  </span>
                ))
              ) : (
                <p className="text-gray-600">No specific skills listed</p>
              )}
            </div>
          </div>

          {/* About Client */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">About the Client</h2>
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                {job.client?.name?.charAt(0).toUpperCase() || 'C'}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{job.client?.name || 'Anonymous Client'}</h3>
                <p className="text-gray-600">Member since {new Date(job.client?.createdAt || job.createdAt).getFullYear()}</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 pt-4 border-t">
              <div>
                <p className="text-sm text-gray-600">Category</p>
                <p className="text-base font-semibold text-gray-900">{job.category}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Budget Type</p>
                <p className="text-base font-semibold text-gray-900 capitalize">{job.budgetType || 'Fixed'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Status</p>
                <p className="text-base font-semibold text-green-600 capitalize">{job.status}</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Apply Modal */}
      {showApplyModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-gray-900 mb-1">Submit Proposal</h3>
            <p className="text-gray-600 text-sm mb-6">
              Applying for: <span className="font-medium text-gray-900">{job.title}</span>
            </p>

            <form onSubmit={handleApply} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cover Letter <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={proposal.coverLetter}
                  onChange={(e) => setProposal({ ...proposal, coverLetter: e.target.value })}
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Explain why you're the best fit for this job..."
                  maxLength={1000}
                  required
                />
                <p className="text-xs text-gray-500 mt-1">{proposal.coverLetter.length}/1000</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Your Bid (₹) <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <FiDollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                    <input
                      type="number"
                      value={proposal.proposedBudget}
                      onChange={(e) => setProposal({ ...proposal, proposedBudget: e.target.value })}
                      className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="5000"
                      min="1"
                      required
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Client budget: ₹{job.budget?.min} - ₹{job.budget?.max}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Delivery Time <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={proposal.deliveryTime}
                      onChange={(e) => setProposal({ ...proposal, deliveryTime: e.target.value })}
                      className="w-20 px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="7"
                      min="1"
                      required
                    />
                    <select
                      value={proposal.deliveryTimeUnit}
                      onChange={(e) => setProposal({ ...proposal, deliveryTimeUnit: e.target.value })}
                      className="flex-1 px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      <option value="days">Days</option>
                      <option value="weeks">Weeks</option>
                      <option value="months">Months</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={applying}
                  className="flex-1 btn-primary py-3 flex items-center justify-center space-x-2 disabled:opacity-50"
                >
                  <FiSend className="w-4 h-4" />
                  <span>{applying ? 'Submitting...' : 'Submit Proposal'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowApplyModal(false)}
                  className="flex-1 btn-secondary py-3"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default JobDetails;
