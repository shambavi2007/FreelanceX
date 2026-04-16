import React from 'react';
import { Link } from 'react-router-dom';
import { FiEdit3, FiUsers, FiCreditCard, FiShield, FiClock, FiStar } from 'react-icons/fi';

const HowToHire = () => {
  const steps = [
    {
      number: "01",
      icon: <FiEdit3 className="w-8 h-8" />,
      title: "Post a Job",
      description: "Describe your project requirements, budget, and timeline",
      details: [
        "Write a clear project description",
        "Set your budget and timeline",
        "Add required skills and experience level",
        "Upload any relevant files or documents"
      ]
    },
    {
      number: "02", 
      icon: <FiUsers className="w-8 h-8" />,
      title: "Review Freelancers",
      description: "Browse proposals and freelancer profiles to find the perfect match",
      details: [
        "Review freelancer portfolios and ratings",
        "Compare proposals and pricing",
        "Check work history and client feedback",
        "Interview top candidates if needed"
      ]
    },
    {
      number: "03",
      icon: <FiCreditCard className="w-8 h-8" />,
      title: "Hire & Pay Securely",
      description: "Hire your chosen freelancer and pay safely through our platform",
      details: [
        "Send job offer to selected freelancer",
        "Set up milestone-based payments",
        "Track progress through our dashboard",
        "Release payments upon completion"
      ]
    }
  ];

  const benefits = [
    {
      icon: <FiShield className="w-6 h-6 text-green-600" />,
      title: "Secure Payments",
      description: "Escrow protection ensures your money is safe until work is completed"
    },
    {
      icon: <FiClock className="w-6 h-6 text-blue-600" />,
      title: "Time Tracking",
      description: "Built-in time tracking for hourly projects with detailed reports"
    },
    {
      icon: <FiStar className="w-6 h-6 text-yellow-600" />,
      title: "Quality Assurance",
      description: "Review system and dispute resolution to ensure quality work"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 to-blue-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            How to Hire on FreelanceX
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Learn the different ways to get work done with top freelancers
          </p>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Three Simple Steps to Success
            </h2>
            <p className="text-lg text-gray-600">
              From posting your job to getting results, we make hiring easy
            </p>
          </div>

          <div className="space-y-16">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                    <div className="flex items-center mb-6">
                      <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center text-xl font-bold mr-4">
                        {step.number}
                      </div>
                      <div className="text-primary-600">
                        {step.icon}
                      </div>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{step.title}</h3>
                    <p className="text-lg text-gray-600 mb-6">{step.description}</p>
                    
                    <ul className="space-y-3">
                      {step.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="flex items-start">
                          <div className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <span className="text-gray-700">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                    <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl p-8 h-80 flex items-center justify-center">
                      <div className="text-6xl text-gray-400">
                        {step.icon}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose FreelanceX for Hiring?
            </h2>
            <p className="text-lg text-gray-600">
              We provide everything you need for successful project completion
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-md text-center">
                <div className="flex justify-center mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-green-600 to-blue-600 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to hire your first freelancer?
          </h2>
          <p className="text-lg text-primary-100 mb-8">
            Post your job today and connect with talented professionals
          </p>
          <Link 
            to="/register" 
            className="inline-flex items-center bg-white text-primary-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
          >
            Post a Job
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HowToHire;