import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FiArrowLeft, FiStar, FiMapPin, FiDollarSign, FiBriefcase, FiMail, FiCheckCircle } from 'react-icons/fi';
import api from '../services/api';
import toast from 'react-hot-toast';

const FreelancerProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [freelancer, setFreelancer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showHireModal, setShowHireModal] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchFreelancer();
  }, [id]);

  const fetchFreelancer = async () => {
    try {
      const response = await api.get(`/profile/freelancers/${id}`);
      setFreelancer(response.data.data?.freelancer || response.data.data);
    } catch (error) {
      toast.error('Failed to load freelancer profile');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleHire = (e) => {
    e.preventDefault();
    if (!message.trim()) {
      toast.error('Please write a message');
      return;
    }
    toast.success(`Hire request sent to ${freelancer?.name}!`);
    setShowHireModal(false);
    setMessage('');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (!freelancer) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Freelancer not found</h2>
          <Link to="/freelancers" className="btn-primary">Back to Freelancers</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <button onClick={() => navigate(-1)} className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6">
          <FiArrowLeft className="w-5 h-5" />
          <span>Back to Freelancers</span>
        </button>

        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-green-500 to-blue-600 flex items-center justify-center text-white text-4xl font-bold flex-shrink-0">
              {freelancer.name?.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{freelancer.name}</h1>
                  <p className="text-green-600 font-medium">{freelancer.title || 'Freelancer'}</p>
                  <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-gray-500">
                    <span className="flex items-center space-x-1">
                      <FiStar className="w-4 h-4 text-yellow-400" />
                      <span>{freelancer.rating || '5.0'} rating</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <FiMapPin className="w-4 h-4" />
                      <span>{freelancer.location || 'Remote'}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <FiDollarSign className="w-4 h-4" />
                      <span>₹{freelancer.hourlyRate || 0}/hr</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <FiBriefcase className="w-4 h-4" />
                      <span>{freelancer.experience || 0} yrs experience</span>
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setShowHireModal(true)}
                  className="btn-primary px-8 py-3 text-base whitespace-nowrap"
                >
                  Hire {freelancer.name?.split(' ')[0]}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* About */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">About</h2>
          <p className="text-gray-700 leading-relaxed">
            {freelancer.bio || 'This freelancer has not added a bio yet.'}
          </p>
        </div>

        {/* Skills */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Skills</h2>
          {freelancer.skills?.length > 0 ? (
            <div className="flex flex-wrap gap-3">
              {freelancer.skills.map((skill, i) => (
                <span key={i} className="flex items-center space-x-1 px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                  <FiCheckCircle className="w-4 h-4" />
                  <span>{skill}</span>
                </span>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No skills listed yet.</p>
          )}
        </div>

        {/* Hire CTA */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-lg p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-2">Ready to work with {freelancer.name?.split(' ')[0]}?</h2>
          <p className="text-green-100 mb-6">Send a hire request and start your project today.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setShowHireModal(true)}
              className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Send Hire Request
            </button>
            <Link
              to="/post-job"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors"
            >
              Post a Job Instead
            </Link>
          </div>
        </div>
      </div>

      {/* Hire Modal */}
      {showHireModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Hire {freelancer.name}
            </h3>
            <p className="text-gray-600 text-sm mb-6">
              Send a message to {freelancer.name?.split(' ')[0]} about your project.
            </p>
            <form onSubmit={handleHire} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Your Message</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder={`Hi ${freelancer.name?.split(' ')[0]}, I'd like to hire you for my project...`}
                  required
                />
              </div>
              <div className="flex gap-3">
                <button type="submit" className="flex-1 btn-primary py-3">
                  Send Request
                </button>
                <button
                  type="button"
                  onClick={() => setShowHireModal(false)}
                  className="flex-1 btn-secondary py-3"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FreelancerProfile;
