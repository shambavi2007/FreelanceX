import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiDollarSign, FiTrendingUp, FiClock, FiCheckCircle } from 'react-icons/fi';

const Earnings = () => {
  const navigate = useNavigate();

  const stats = [
    { label: 'Total Earned', value: '₹0', icon: <FiDollarSign className="w-6 h-6" />, color: 'bg-green-50 text-green-600' },
    { label: 'This Month', value: '₹0', icon: <FiTrendingUp className="w-6 h-6" />, color: 'bg-blue-50 text-blue-600' },
    { label: 'Pending', value: '₹0', icon: <FiClock className="w-6 h-6" />, color: 'bg-yellow-50 text-yellow-600' },
    { label: 'Withdrawn', value: '₹0', icon: <FiCheckCircle className="w-6 h-6" />, color: 'bg-purple-50 text-purple-600' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <button onClick={() => navigate('/dashboard')} className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6">
          <FiArrowLeft className="w-5 h-5" />
          <span>Back to Dashboard</span>
        </button>

        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Earnings Overview</h1>
          <p className="text-gray-600 mt-1">Track your income and payment history</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white rounded-lg shadow-sm p-6">
              <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center mb-3`}>
                {stat.icon}
              </div>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Transaction History */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Transaction History</h2>
          <div className="text-center py-12">
            <FiDollarSign className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No transactions yet</h3>
            <p className="text-gray-600 mb-6">Complete your first project to start earning.</p>
            <Link to="/jobs" className="btn-primary">Find Jobs</Link>
          </div>
        </div>

        {/* Withdraw Section */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Withdraw Funds</h2>
          <p className="text-gray-600 text-sm mb-4">Minimum withdrawal amount is ₹500</p>
          <div className="flex gap-4">
            <input
              type="number"
              placeholder="Enter amount"
              className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              disabled
            />
            <button className="btn-primary opacity-50 cursor-not-allowed" disabled>
              Withdraw
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2">Complete a project to enable withdrawals</p>
        </div>
      </div>
    </div>
  );
};

export default Earnings;
