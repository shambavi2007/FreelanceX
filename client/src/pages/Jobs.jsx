import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiSearch, FiFilter, FiMapPin, FiClock, FiDollarSign, FiBookmark, FiEye, FiTrendingUp, FiStar, FiZap, FiBell } from 'react-icons/fi';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import Modal from '../components/common/Modal';
import { jobAPI } from '../services/api';
import toast from 'react-hot-toast';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    experienceLevel: '',
    budgetMin: '',
    budgetMax: '',
    sortBy: 'postedAt',
    sortOrder: 'desc'
  });
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
    total: 0,
    pages: 0
  });
  const [savedJobs, setSavedJobs] = useState(() => {
    const saved = localStorage.getItem('savedJobs');
    return saved ? JSON.parse(saved) : [];
  });
  const [quickViewJob, setQuickViewJob] = useState(null);
  const [showAlertsModal, setShowAlertsModal] = useState(false);

  useEffect(() => {
    fetchJobs();
  }, [filters, pagination.page]);

  useEffect(() => {
    localStorage.setItem('savedJobs', JSON.stringify(savedJobs));
  }, [savedJobs]);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const queryParams = {
        page: pagination.page,
        limit: pagination.limit,
        ...filters
      };
      
      const response = await jobAPI.getJobs(queryParams);
      setJobs(response.data.jobs);
      setPagination(prev => ({
        ...prev,
        ...response.data.pagination
      }));
    } catch (error) {
      toast.error('Failed to fetch jobs');
      console.error('Fetch jobs error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchJobs();
  };

  const categories = [
    'Web Development',
    'Mobile Development',
    'Graphic Design',
    'Content Writing',
    'Digital Marketing',
    'Data Analysis',
    'Video Editing',
    'Translation'
  ];

  const experienceLevels = [
    { value: 'Beginner', label: 'Beginner' },
    { value: 'Intermediate', label: 'Intermediate' },
    { value: 'Expert', label: 'Expert' }
  ];

  const featuredMetrics = [
    { label: 'Live opportunities', value: `${pagination.total || 1200}+`, icon: <FiTrendingUp className="w-5 h-5" /> },
    { label: 'Top-rated clients', value: '94%', icon: <FiStar className="w-5 h-5" /> },
    { label: 'Avg. hire speed', value: '24 hrs', icon: <FiZap className="w-5 h-5" /> }
  ];

  const toggleSaveJob = (jobId) => {
    setSavedJobs((prev) => {
      if (prev.includes(jobId)) {
        toast.success('Removed from saved jobs');
        return prev.filter((id) => id !== jobId);
      }
      toast.success('Job saved');
      return [...prev, jobId];
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Header */}
      <div
        className="border-b pt-16 bg-cover bg-center"
        style={{
          backgroundImage: "linear-gradient(rgba(10,20,40,0.75), rgba(10,20,40,0.75)), url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80')"
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Find High-Quality Freelance Projects</h1>
          <p className="text-blue-100 mb-6 max-w-2xl">
            Discover verified clients, get matched faster, and track opportunities in a professional workspace.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
            {featuredMetrics.map((item) => (
              <div key={item.label} className="bg-white/10 border border-white/20 rounded-xl p-4 text-white backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-blue-100">{item.label}</span>
                  {item.icon}
                </div>
                <p className="text-xl font-bold mt-1">{item.value}</p>
              </div>
            ))}
          </div>
          
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search jobs, skills, or keywords..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div className="flex gap-3">
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                <FiSearch className="w-5 h-5" />
                <span>Search</span>
              </button>
              <button
                type="button"
                onClick={() => setShowAlertsModal(true)}
                className="bg-white text-gray-900 px-5 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center space-x-2 hover:bg-gray-100"
              >
                <FiBell className="w-5 h-5" />
                <span>Job Alerts</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-80">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <div className="flex items-center space-x-2 mb-6">
                <FiFilter className="w-5 h-5 text-gray-600" />
                <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={filters.category}
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              {/* Experience Level */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Experience Level</label>
                <select
                  value={filters.experienceLevel}
                  onChange={(e) => handleFilterChange('experienceLevel', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">All Levels</option>
                  {experienceLevels.map(level => (
                    <option key={level.value} value={level.value}>{level.label}</option>
                  ))}
                </select>
              </div>

              {/* Budget Range */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Budget Range</label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={filters.budgetMin}
                    onChange={(e) => handleFilterChange('budgetMin', e.target.value)}
                    className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={filters.budgetMax}
                    onChange={(e) => handleFilterChange('budgetMax', e.target.value)}
                    className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>

              {/* Sort By */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                <select
                  value={`${filters.sortBy}-${filters.sortOrder}`}
                  onChange={(e) => {
                    const [sortBy, sortOrder] = e.target.value.split('-');
                    handleFilterChange('sortBy', sortBy);
                    handleFilterChange('sortOrder', sortOrder);
                  }}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="postedAt-desc">Newest First</option>
                  <option value="postedAt-asc">Oldest First</option>
                  <option value="budget.max-desc">Highest Budget</option>
                  <option value="budget.max-asc">Lowest Budget</option>
                </select>
              </div>

              {/* Clear Filters */}
              <button
                onClick={() => {
                  setFilters({
                    search: '',
                    category: '',
                    experienceLevel: '',
                    budgetMin: '',
                    budgetMax: '',
                    sortBy: 'postedAt',
                    sortOrder: 'desc'
                  });
                  setPagination(prev => ({ ...prev, page: 1 }));
                }}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg transition-colors duration-200"
              >
                Clear All Filters
              </button>
            </div>
          </div>

          {/* Jobs List */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {pagination.total} jobs found
                </h3>
                <p className="text-gray-600">
                  Showing {((pagination.page - 1) * pagination.limit) + 1} - {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total}
                </p>
              </div>
            </div>

            {/* Loading State */}
            {loading ? (
              <div className="space-y-4">
                {[...Array(6)].map((_, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-sm p-6 animate-pulse">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                    <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-2/3 mb-4"></div>
                    <div className="flex space-x-4">
                      <div className="h-3 bg-gray-200 rounded w-20"></div>
                      <div className="h-3 bg-gray-200 rounded w-24"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : jobs.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No jobs found</h3>
                <p className="text-gray-600 mb-6">Try adjusting your filters or search terms</p>
                <button
                  onClick={() => {
                    setFilters({
                      search: '',
                      category: '',
                      experienceLevel: '',
                      budgetMin: '',
                      budgetMax: '',
                      sortBy: 'postedAt',
                      sortOrder: 'desc'
                    });
                  }}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors duration-200"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {jobs.map(job => (
                  <JobCard
                    key={job.id}
                    job={job}
                    saved={savedJobs.includes(job.id)}
                    onToggleSave={toggleSaveJob}
                    onQuickView={setQuickViewJob}
                  />
                ))}
              </div>
            )}

            {/* Pagination */}
            {pagination.pages > 1 && (
              <div className="flex justify-center mt-8">
                <div className="flex space-x-2">
                  <button
                    onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
                    disabled={pagination.page === 1}
                    className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    Previous
                  </button>
                  
                  {[...Array(Math.min(5, pagination.pages))].map((_, index) => {
                    const pageNum = index + 1;
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setPagination(prev => ({ ...prev, page: pageNum }))}
                        className={`px-4 py-2 border rounded-lg ${
                          pagination.page === pageNum
                            ? 'bg-green-600 text-white border-green-600'
                            : 'border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                  
                  <button
                    onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
                    disabled={pagination.page === pagination.pages}
                    className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Modal isOpen={Boolean(quickViewJob)} onClose={() => setQuickViewJob(null)} title="Job Quick View" size="lg">
        {quickViewJob && (
          <div className="p-6">
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">{quickViewJob.title}</h3>
            <div className="flex flex-wrap gap-3 text-sm mb-4">
              <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700">{quickViewJob.experienceLevel}</span>
              <span className="px-3 py-1 rounded-full bg-green-100 text-green-700">Budget: ₹{quickViewJob.budget}</span>
              <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-700">{quickViewJob.proposals || 0} proposals</span>
            </div>
            <p className="text-gray-700 leading-7 mb-5">{quickViewJob.description}</p>
            <div className="flex flex-wrap gap-2 mb-6">
              {(quickViewJob.skills || []).map((skill, i) => (
                <span key={i} className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm">{skill}</span>
              ))}
            </div>
            <div className="flex gap-3">
              <Link to={`/jobs/${quickViewJob.id}`} className="btn-primary">
                Open Full Details
              </Link>
              <button
                type="button"
                onClick={() => toggleSaveJob(quickViewJob.id)}
                className="btn-secondary"
              >
                {savedJobs.includes(quickViewJob.id) ? 'Saved' : 'Save Job'}
              </button>
            </div>
          </div>
        )}
      </Modal>

      <Modal isOpen={showAlertsModal} onClose={() => setShowAlertsModal(false)} title="Create Smart Job Alerts">
        <div className="p-6 space-y-4">
          <p className="text-gray-700">
            Get instant alerts for new projects based on your profile, preferred budget, and skills.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-4 rounded-lg border border-gray-200">
              <p className="font-semibold text-gray-900">AI Match Alerts</p>
              <p className="text-sm text-gray-600 mt-1">Get only jobs that match your top skills.</p>
            </div>
            <div className="p-4 rounded-lg border border-gray-200">
              <p className="font-semibold text-gray-900">Client Quality Alerts</p>
              <p className="text-sm text-gray-600 mt-1">Notify for verified clients with high hire rates.</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              toast.success('Smart alerts enabled successfully');
              setShowAlertsModal(false);
            }}
            className="btn-primary"
          >
            Enable Alerts
          </button>
        </div>
      </Modal>

      <Footer />
    </div>
  );
};

// Job Card Component
const JobCard = ({ job, saved, onToggleSave, onQuickView }) => {
  const timeAgo = (date) => {
    const now = new Date();
    const posted = new Date(date);
    const diffInHours = Math.floor((now - posted) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just posted';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    return `${Math.floor(diffInDays / 7)}w ago`;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-6 border border-gray-100">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <Link 
            to={`/jobs/${job.id}`}
            className="text-xl font-semibold text-gray-900 hover:text-green-600 transition-colors duration-200"
          >
            {job.title}
          </Link>
          <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
            <span className="flex items-center space-x-1">
              <FiClock className="w-4 h-4" />
              <span>{timeAgo(job.postedAt)}</span>
            </span>
            <span className="flex items-center space-x-1">
              <FiMapPin className="w-4 h-4" />
              <span>{job.location}</span>
            </span>
          </div>
        </div>
        <button onClick={() => onToggleSave(job.id)} className={`transition-colors duration-200 ${saved ? 'text-green-600' : 'text-gray-400 hover:text-green-600'}`}>
          <FiBookmark className="w-5 h-5" />
        </button>
      </div>

      <p className="text-gray-700 mb-4 line-clamp-3">
        {job.description}
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {job.skills.slice(0, 5).map((skill, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
          >
            {skill}
          </span>
        ))}
        {job.skills.length > 5 && (
          <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
            +{job.skills.length - 5} more
          </span>
        )}
      </div>

      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1 text-green-600 font-semibold">
            <FiDollarSign className="w-4 h-4" />
            <span>
              ₹{job.budget}
            </span>
          </div>
          <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
            {job.experienceLevel}
          </span>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">
            {job.proposals || 0} proposals
          </span>
          <button
            type="button"
            onClick={() => onQuickView(job)}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
          >
            Quick View
          </button>
          <Link
            to={`/jobs/${job.id}`}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center space-x-1"
          >
            <FiEye className="w-4 h-4" />
            <span>View</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Jobs;