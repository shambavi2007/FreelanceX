import React from 'react';
import { Link } from 'react-router-dom';

const HowToFindWork = () => {
  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">How to Find Work</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Learn how to grow your independent career on FreelanceX
          </p>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Coming Soon</h2>
          <p className="text-gray-600 mb-6">
            We're creating a detailed guide to help freelancers succeed on our platform.
          </p>
          <Link to="/" className="btn-primary">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HowToFindWork;