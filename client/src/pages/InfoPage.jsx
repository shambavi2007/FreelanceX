import React from 'react';
import { Link } from 'react-router-dom';

const InfoPage = ({ title, subtitle, ctaLabel = 'Back to Home', ctaTo = '/' }) => {
  return (
    <div
      className="min-h-screen pt-24 pb-12 bg-cover bg-center"
      style={{
        backgroundImage:
          "linear-gradient(rgba(8, 26, 47, 0.78), rgba(8, 26, 47, 0.78)), url('https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1600&q=80')"
      }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/95 rounded-2xl p-8 md:p-10 shadow-xl border border-white/40">
          <p className="text-sm font-semibold text-green-700 uppercase tracking-wider">FreelanceX</p>
          <h1 className="mt-2 text-3xl md:text-4xl font-bold text-gray-900">{title}</h1>
          <p className="mt-4 text-gray-700 text-lg">{subtitle}</p>
          <div className="mt-8 flex gap-3">
            <Link to={ctaTo} className="btn-primary">
              {ctaLabel}
            </Link>
            <Link to="/resources" className="btn-secondary">
              View Resources
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoPage;
