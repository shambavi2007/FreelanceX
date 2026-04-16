import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiFileText, FiClock, FiDollarSign, FiCheckCircle, FiXCircle, FiAlertCircle } from 'react-icons/fi';

const MyProposals = () => {
  const navigate = useNavigate();

  // Placeholder proposals - will be replaced with real API data
  const [proposals] = useState([]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'accepted': return <FiCheckCircle className="w-5 h-5 text-green-500" />;
      case 'rejected': return <FiXCircle className="w-5 h-5 text-red-500" />;
      default: return <FiAlertCircle className="w-5 h-5 text-yellow-500" />;
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'accepted': return 'bg-green-100 text-green-700';
      case 'rejected': return 'bg-red-100 text-red-700';
      default: return 'bg-yellow-100 text-yellow-700';
    }
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
            <h1 className="text-2xl font-bold text-gray-900">My Proposals</h1>
            <p className="text-gray-600 mt-1">Track all your submitted proposals</p>
          </div>
          <Link to="/jobs" className="btn-primary">Browse Jobs</Link>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            { label: 'Total Sent', value: proposals.length, color: 'text-blue-600' },
            { label: 'Accepted', value: proposals.filter(p => p.status === 'accepted').length, color: 'text-green-600' },
            { label: 'Pending', value: proposals.filter(p => p.status === 'pending').length, color: 'text-yellow-600' },
          ].map((stat, i) => (
            <div key={i} className="bg-white rounded-lg shadow-sm p-4 text-center">
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>

        {proposals.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <FiFileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">No proposals yet</h2>
            <p className="text-gray-600 mb-6">Browse available jobs and submit your first proposal to get started.</p>
            <Link to="/jobs" className="btn-primary">Find Jobs</Link>
          </div>
        ) : (
          <div className="space-y-4">
            {proposals.map(proposal => (
              <div key={proposal._id} className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      {getStatusIcon(proposal.status)}
                      <h3 className="text-lg font-semibold text-gray-900">{proposal.jobTitle}</h3>
                    </div>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{proposal.coverLetter}</p>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                      <span className="flex items-center space-x-1">
                        <FiDollarSign className="w-4 h-4" />
                        <span>Bid: ₹{proposal.bidAmount}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <FiClock className="w-4 h-4" />
                        <span>{proposal.deliveryTime}</span>
                      </span>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ml-4 ${getStatusBadge(proposal.status)}`}>
                    {proposal.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProposals;
