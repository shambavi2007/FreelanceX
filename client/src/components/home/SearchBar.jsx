import React, { useState } from 'react';
import { FiSearch, FiMapPin } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      toast.error('Please enter a skill or service to search');
      return;
    }
    toast.success(`Searching for "${searchQuery}"...`);
    setTimeout(() => {
      navigate('/register');
    }, 1500);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-0">
      <form onSubmit={handleSearch} className="bg-white rounded-lg shadow-xl p-2 flex flex-col sm:flex-row gap-2">
        <div className="flex-1 relative">
          <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
          <input
            type="text"
            placeholder="Search for any service..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 sm:py-4 text-gray-900 placeholder-gray-500 border-0 focus:outline-none focus:ring-0 rounded-lg"
          />
        </div>
        <div className="sm:w-64 relative">
          <FiMapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
          <input
            type="text"
            placeholder="Location (optional)"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full pl-12 pr-4 py-3 sm:py-4 text-gray-900 placeholder-gray-500 border-0 sm:border-l border-gray-200 focus:outline-none focus:ring-0 rounded-lg"
          />
        </div>
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center space-x-2 w-full sm:w-auto sm:min-w-[140px]"
        >
          <FiSearch className="w-5 h-5" />
          <span>Search</span>
        </button>
      </form>
    </div>
  );
};

export default SearchBar;