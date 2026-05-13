import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiSearch, FiStar, FiDollarSign, FiBriefcase, FiUser } from 'react-icons/fi';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { freelancerAPI } from '../services/api';
import toast from 'react-hot-toast';

const Freelancers = () => {
  const [freelancers, setFreelancers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [skill, setSkill] = useState('');
  const [pagination, setPagination] = useState({ page: 1, total: 0, pages: 0, limit: 12 });

  const popularSkills = ['React', 'Node.js', 'Python', 'Graphic Design', 'Content Writing', 'Mobile Development', 'Data Analysis', 'Video Editing'];

  useEffect(() => {
    fetchFreelancers();
  }, [pagination.page, skill]);

  const fetchFreelancers = async () => {
    try {
      setLoading(true);
      const params = { page: pagination.page, limit: pagination.limit };
      if (search) params.search = search;
      if (skill) params.skill = skill;

      const res = await freelancerAPI.getFreelancers(params);
      setFreelancers(res.data.freelancers);
      setPagination(prev => ({ ...prev, ...res.data.pagination }));
    } catch (error) {
      toast.error('Failed to load freelancers');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setPagination(prev => ({ ...prev, page: 1 }));
    fetchFreelancers();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Header */}
      <div
        className="pt-16 bg-cover bg-center border-b"
        style={{ backgroundImage: "linear-gradient(rgba(10,20,40,0.78), rgba(10,20,40,0.78)), url('https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1600&q=80')" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">Find Talented Freelancers</h1>
          <p className="text-blue-100 mb-6 max-w-2xl">Browse skilled professionals ready to work on your project.</p>

          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-3 mb-6">
            <div className="flex-1 relative">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by name, skill, or bio..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <button type="submit" className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2">
              <FiSearch className="w-5 h-5" /> Search
            </button>
          </form>

          {/* Skill filters */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => { setSkill(''); setPagination(p => ({ ...p, page: 1 })); }}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${!skill ? 'bg-green-600 text-white' : 'bg-white/15 text-white hover:bg-white/25'}`}
            >
              All Skills
            </button>
            {popularSkills.map(s => (
              <button
                key={s}
                onClick={() => { setSkill(s); setPagination(p => ({ ...p, page: 1 })); }}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${skill === s ? 'bg-green-600 text-white' : 'bg-white/15 text-white hover:bg-white/25'}`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <p className="text-gray-600 mb-6">{pagination.total} freelancer{pagination.total !== 1 ? 's' : ''} found</p>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl p-6 animate-pulse shadow-sm">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 bg-gray-200 rounded-full" />
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                    <div className="h-3 bg-gray-200 rounded w-1/2" />
                  </div>
                </div>
                <div className="h-3 bg-gray-200 rounded w-full mb-2" />
                <div className="h-3 bg-gray-200 rounded w-2/3" />
              </div>
            ))}
          </div>
        ) : freelancers.length === 0 ? (
          <div className="text-center py-16">
            <FiUser className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No freelancers found</h3>
            <p className="text-gray-500 mb-4">Try a different search or skill filter.</p>
            <button onClick={() => { setSearch(''); setSkill(''); fetchFreelancers(); }} className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors">
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {freelancers.map(f => (
              <FreelancerCard key={f._id} freelancer={f} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {pagination.pages > 1 && (
          <div className="flex justify-center mt-10 gap-2">
            <button
              onClick={() => setPagination(p => ({ ...p, page: p.page - 1 }))}
              disabled={pagination.page === 1}
              className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 hover:bg-gray-50"
            >
              Previous
            </button>
            {[...Array(Math.min(5, pagination.pages))].map((_, i) => (
              <button
                key={i}
                onClick={() => setPagination(p => ({ ...p, page: i + 1 }))}
                className={`px-4 py-2 border rounded-lg ${pagination.page === i + 1 ? 'bg-green-600 text-white border-green-600' : 'border-gray-300 hover:bg-gray-50'}`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setPagination(p => ({ ...p, page: p.page + 1 }))}
              disabled={pagination.page === pagination.pages}
              className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 hover:bg-gray-50"
            >
              Next
            </button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

const FreelancerCard = ({ freelancer }) => {
  const initials = freelancer.name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 border border-gray-100 flex flex-col">
      <div className="flex items-center gap-4 mb-4">
        {freelancer.avatar ? (
          <img src={`http://localhost:5000/${freelancer.avatar}`} alt={freelancer.name} className="w-14 h-14 rounded-full object-cover" />
        ) : (
          <div className="w-14 h-14 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-lg font-bold">
            {initials || <FiUser />}
          </div>
        )}
        <div>
          <h3 className="font-semibold text-gray-900">{freelancer.name}</h3>
          {freelancer.profileCompleted && (
            <span className="text-xs text-green-600 font-medium flex items-center gap-1">
              <FiStar className="w-3 h-3" /> Verified Profile
            </span>
          )}
        </div>
      </div>

      <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-1">
        {freelancer.bio || 'No bio provided yet.'}
      </p>

      <div className="flex flex-wrap gap-1.5 mb-4">
        {(freelancer.skills || []).slice(0, 4).map((s, i) => (
          <span key={i} className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded-full text-xs">{s}</span>
        ))}
        {freelancer.skills?.length > 4 && (
          <span className="px-2 py-0.5 bg-gray-100 text-gray-500 rounded-full text-xs">+{freelancer.skills.length - 4}</span>
        )}
      </div>

      <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
        {freelancer.hourlyRate && (
          <span className="flex items-center gap-1 text-green-600 font-semibold">
            <FiDollarSign className="w-4 h-4" />₹{freelancer.hourlyRate}/hr
          </span>
        )}
        {freelancer.experience !== undefined && (
          <span className="flex items-center gap-1">
            <FiBriefcase className="w-4 h-4" />{freelancer.experience} yr{freelancer.experience !== 1 ? 's' : ''} exp
          </span>
        )}
      </div>

      <Link
        to={`/post-job`}
        className="w-full text-center bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg text-sm font-medium transition-colors"
      >
        Hire Now
      </Link>
    </div>
  );
};

export default Freelancers;
