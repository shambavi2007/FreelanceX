import React from 'react';
import { Link } from 'react-router-dom';

const UseFreelanceX = () => {
  return (
    <div
      className="min-h-screen pt-20 bg-cover bg-center"
      style={{
        backgroundImage:
          "linear-gradient(rgba(7, 89, 133, 0.82), rgba(20, 83, 45, 0.82)), url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1800&q=80')"
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">How to Use FreelanceX as a Freelancer</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Master the platform and maximize your freelancing success
          </p>
        </div>
        
        <div className="bg-white/95 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Coming Soon</h2>
          <p className="text-gray-600 mb-6">
            We're creating a detailed guide to help freelancers get the most out of FreelanceX.
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/resources" className="btn-secondary">
              All Resources
            </Link>
            <Link to="/" className="btn-primary">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UseFreelanceX;