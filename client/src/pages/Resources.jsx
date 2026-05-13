import React from 'react';
import { Link } from 'react-router-dom';

const Resources = () => {
  return (
    <div
      className="min-h-screen pt-20 bg-cover bg-center"
      style={{
        backgroundImage:
          "linear-gradient(rgba(2, 6, 23, 0.78), rgba(2, 6, 23, 0.78)), url('https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1800&q=80')"
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Resources</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Everything you need to succeed on FreelanceX
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <Link to="/resources/hire-freelancers" className="bg-white/95 border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">How to Hire Freelancers</h3>
            <p className="text-gray-600">Complete guide to finding and hiring the right talent</p>
          </Link>
          
          <Link to="/resources/use-freelancex" className="bg-white/95 border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Using FreelanceX</h3>
            <p className="text-gray-600">Learn how to make the most of our platform</p>
          </Link>
          
          <Link to="/resources/grow-business" className="bg-white/95 border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Grow Your Business</h3>
            <p className="text-gray-600">Tips and strategies for freelance success</p>
          </Link>
        </div>
        
        <div className="bg-white/95 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">More Resources Coming Soon</h2>
          <p className="text-gray-600 mb-6">
            We're constantly adding new guides, tutorials, and resources to help you succeed.
          </p>
          <Link to="/" className="btn-primary">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Resources;