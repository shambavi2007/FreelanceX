import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FiClock, FiDollarSign, FiMapPin, FiUser, FiCalendar, FiFileText, FiArrowLeft } from 'react-icons/fi';
import { jobAPI } from '../services/api';
import toast from 'react-hot-toast';

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobDetails();
  }, [id]);

  const fetchJobDetails = async () => {
    try {
      const response = await jobAPI.getJob(id);
      setJob(response.data.job);
    } catch (error) {
      toast.error('Failed to load job details');
      console.error('Fetch job error:', error);
    } finally {
      setLoading(false);
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
          <Link to="/jobs" className="btn-primary">
            Back to Jobs
          </Link>
        </div>
      </div>
    );
  }

  return (
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
          <div className="flex justify-between items-start mb-6">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{job.title}</h1>
              <div className="flex flex-wrap items-center gap-4 text-gray-600">
                <span className="flex items-center space-x-2">
                  <FiClock className="w-4 h-4" />
                  <span>{timeAgo(job.postedAt)}</span>
                </span>
                <span className="flex items-center space-x-2">
                  <FiMapPin className="w-4 h-4" />
                  <span>{job.location || 'Remote'}</span>
                </span>
                <span className="flex items-center space-x-2">
                  <FiUser className="w-4 h-4" />
                  <span>{job.proposals || 0} proposals</span>
                </span>
              </div>
            </div>
          </div>

          {/* Budget & Duration */}
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
              <p className="text-lg font-semibold text-gray-900">{job.experienceLevel}</p>
            </div>
          </div>

          {/* Apply Button */}
          <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-200">
            Apply Now
          </button>
        </div>

        {/* Job Description */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Job Description</h2>
          <div className="prose max-w-none text-gray-700 whitespace-pre-line">
            {job.description}
          </div>
        </div>

        {/* Skills Required */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Skills Required</h2>
          <div className="flex flex-wrap gap-3">
            {job.skills && job.skills.length > 0 ? (
              job.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium"
                >
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
              {job.clientName?.charAt(0).toUpperCase() || 'C'}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{job.clientName || 'Anonymous Client'}</h3>
              <p className="text-gray-600">Member since {new Date(job.postedAt).getFullYear()}</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 pt-4 border-t">
            <div>
              <p className="text-sm text-gray-600">Jobs Posted</p>
              <p className="text-lg font-semibold text-gray-900">1</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Hire Rate</p>
              <p className="text-lg font-semibold text-gray-900">0%</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Spent</p>
              <p className="text-lg font-semibold text-gray-900">₹0</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
