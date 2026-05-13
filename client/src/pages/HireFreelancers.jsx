import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiSearch, FiFilter, FiStar, FiMapPin, FiDollarSign } from 'react-icons/fi';
import { freelancerAPI } from '../services/api';
import toast from 'react-hot-toast';

const HireFreelancers = () => {
  const [freelancers, setFreelancers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');

  const categories = [
    'Web Development', 'Mobile Development', 'Graphic Design',
    'Content Writing', 'Digital Marketing', 'Data Analysis',
    'Video Editing', 'Translation'
  ];

  useEffect(() => {
    fetchFreelancers();
  }, [category]);

  const fetchFreelancers = async () => {
    try {
      setLoading(true);
      const response = await freelancerAPI.getFreelancers({ category, search });
      setFreelancers(response.data?.freelancers || []);
    } catch (error) {
      console.error('Failed to fetch freelancers:', error);
      setFreelancers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchFreelancers();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Hire Top Freelancers
          </h1>
          <p className="text-green-100 mb-6 max-w-2xl">
            Browse verified professionals ready to work on your project
          </p>
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
              <input
                type="text"
                placeholder="Search by skill or name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
              />
            </div>
            <button type="submit" className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Search
            </button>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Sidebar Filters */}
          <div className="lg:w-64">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <div className="flex items-center space-x-2 mb-4">
                <FiFilter className="w-5 h-5 text-gray-600" />
                <h2 className="font-semibold text-gray-900">Filter by Category</h2>
              </div>
              <div className="space-y-2">
                <button
                  onClick={() => setCategory('')}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                    category === '' ? 'bg-green-100 text-green-700 font-medium' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  All Categories
                </button>
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      category === cat ? 'bg-green-100 text-green-700 font-medium' : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Freelancers List */}
          <div className="flex-1">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="bg-white rounded-lg p-6 animate-pulse">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
                      <div className="flex-1">
                        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                      </div>
                    </div>
                    <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                  </div>
                ))}
              </div>
            ) : freelancers.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                <div className="text-6xl mb-4">👥</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No freelancers found</h3>
                <p className="text-gray-600 mb-6">
                  No freelancers have registered yet. Try posting a job instead and freelancers will apply.
                </p>
                <Link to="/post-job" className="btn-primary">
                  Post a Job
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {freelancers.map(freelancer => (
                  <FreelancerCard key={freelancer._id} freelancer={freelancer} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const FreelancerCard = ({ freelancer }) => (
  <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
    <div className="flex items-start space-x-4 mb-4">
      <div className="w-16 h-16 rounded-full bg-gradient-to-r from-green-500 to-blue-600 flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
        {freelancer.name?.charAt(0).toUpperCase()}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-gray-900 text-lg">{freelancer.name}</h3>
        <p className="text-green-600 text-sm font-medium">{freelancer.title || 'Freelancer'}</p>
        <div className="flex items-center space-x-3 mt-1 text-sm text-gray-500">
          <span className="flex items-center space-x-1">
            <FiStar className="w-4 h-4 text-yellow-400" />
            <span>{freelancer.rating || '5.0'}</span>
          </span>
          <span className="flex items-center space-x-1">
            <FiMapPin className="w-4 h-4" />
            <span>{freelancer.location || 'Remote'}</span>
          </span>
          <span className="flex items-center space-x-1">
            <FiDollarSign className="w-4 h-4" />
            <span>₹{freelancer.hourlyRate || 0}/hr</span>
          </span>
        </div>
      </div>
    </div>

    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
      {freelancer.bio || 'Experienced freelancer ready to help with your project.'}
    </p>

    <div className="flex flex-wrap gap-2 mb-4">
      {(freelancer.skills || []).slice(0, 4).map((skill, i) => (
        <span key={i} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
          {skill}
        </span>
      ))}
    </div>

    <Link
      to={`/freelancers/${freelancer._id}`}
      className="w-full block text-center bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg text-sm font-medium transition-colors"
    >
      Hire {freelancer.name?.split(' ')[0]}
    </Link>
  </div>
);

export default HireFreelancers;
