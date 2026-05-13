import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiBriefcase, FiPlus, FiEye, FiTrash2, FiClock, FiDollarSign, FiUsers } from 'react-icons/fi';
import { jobAPI } from '../services/api';
import toast from 'react-hot-toast';

const MyJobs = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyJobs();
  }, []);

  const fetchMyJobs = async () => {
    try {
      const response = await jobAPI.getMyJobs();
      setJobs(response.data?.jobs || []);
    } catch (error) {
      console.error('Failed to fetch jobs:', error);
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this job?')) return;
    try {
      await jobAPI.deleteJob(id);
      setJobs(jobs.filter(j => j._id !== id));
      toast.success('Job deleted successfully');
    } catch (error) {
      toast.error('Failed to delete job');
    }
  };

  const timeAgo = (date) => {
    const diff = Math.floor((new Date() - new Date(date)) / (1000 * 60 * 60 * 24));
    if (diff === 0) return 'Today';
    if (diff === 1) return 'Yesterday';
    return `${diff} days ago`;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <button onClick={() => navigate('/dashboard')} className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6">
          <FiArrowLeft className="w-5 h-5" />
          <span>Back to Dashboard</span>
        </button>

        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Posted Jobs</h1>
            <p className="text-gray-600 mt-1">Manage your job postings and review proposals</p>
          </div>
          <Link to="/post-job" className="btn-primary flex items-center space-x-2">
            <FiPlus className="w-4 h-4" />
            <span>Post New Job</span>
          </Link>
        </div>

        {loading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg p-6 animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-3"></div>
                <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        ) : jobs.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <FiBriefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">No jobs posted yet</h2>
            <p className="text-gray-600 mb-6">Post your first job and start receiving proposals from talented freelancers.</p>
            <Link to="/post-job" className="btn-primary">Post a Job</Link>
          </div>
        ) : (
          <div className="space-y-4">
            {jobs.map(job => (
              <div key={job._id} className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{job.title}</h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{job.description}</p>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                      <span className="flex items-center space-x-1">
                        <FiDollarSign className="w-4 h-4" />
                        <span>₹{job.budget?.min} - ₹{job.budget?.max}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <FiClock className="w-4 h-4" />
                        <span>{timeAgo(job.createdAt)}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <FiUsers className="w-4 h-4" />
                        <span>{job.proposals?.length || 0} proposals</span>
                      </span>
                      <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                        {job.status || 'Open'}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <Link
                      to={`/jobs/${job._id}`}
                      className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                      title="View Job"
                    >
                      <FiEye className="w-5 h-5" />
                    </Link>
                    <button
                      onClick={() => handleDelete(job._id)}
                      className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete Job"
                    >
                      <FiTrash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyJobs;
