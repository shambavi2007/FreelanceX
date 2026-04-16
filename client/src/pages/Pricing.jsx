import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiCheck, FiStar, FiZap } from 'react-icons/fi';

const Pricing = () => {
  const [activeTab, setActiveTab] = useState('all');

  const plans = [
    {
      type: 'client',
      title: 'For Clients',
      price: '5%',
      priceSubtext: 'platform fee per project',
      features: [
        'Free project posting',
        'Browse freelancer profiles',
        'Secure escrow payments',
        '24/7 support',
        'Unlimited revisions',
        'Project management tools'
      ],
      cta: 'Post a Project',
      ctaLink: '/register',
      popular: false
    },
    {
      type: 'freelancer',
      title: 'Starter',
      subtitle: 'For Freelancers',
      price: 'Free',
      priceSubtext: '10% service fee',
      features: [
        'Apply to jobs',
        'Create profile',
        'Chat with clients',
        'Basic portfolio',
        'Payment protection',
        'Mobile app access'
      ],
      cta: 'Get Started Free',
      ctaLink: '/register',
      popular: true
    },
    {
      type: 'freelancer',
      title: 'Freelancer Plus',
      price: '₹999',
      priceSubtext: 'per month',
      features: [
        'Featured profile',
        'Priority job alerts',
        'Reduced service fee (5%)',
        'Advanced analytics',
        'Premium support',
        'Custom portfolio themes',
        'Skill assessments'
      ],
      cta: 'Upgrade Now',
      ctaLink: '/register',
      popular: false
    }
  ];

  const faqs = [
    {
      question: 'Is FreelanceX free?',
      answer: 'Yes! It\'s free to sign up and create your profile. We only charge when you successfully complete projects.'
    },
    {
      question: 'When do I get paid?',
      answer: 'Freelancers receive payment within 24 hours of project completion and client approval through our secure escrow system.'
    },
    {
      question: 'Are payments secure?',
      answer: 'Absolutely. We use bank-level security and escrow payments to protect both clients and freelancers.'
    },
    {
      question: 'Can I cancel anytime?',
      answer: 'Yes, you can cancel your Freelancer Plus subscription anytime. No long-term contracts or hidden fees.'
    }
  ];

  const filteredPlans = activeTab === 'all' ? plans : plans.filter(plan => plan.type === activeTab);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-blue-50 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Simple, transparent <span className="text-primary-600">pricing</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Only pay when you find value
          </p>
        </div>
      </section>

      {/* Pricing Filter Tabs */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center mb-12">
            <div className="bg-gray-100 p-1 rounded-lg">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-6 py-2 rounded-md font-medium transition-colors ${
                  activeTab === 'all' 
                    ? 'bg-white text-primary-600 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                All Plans
              </button>
              <button
                onClick={() => setActiveTab('client')}
                className={`px-6 py-2 rounded-md font-medium transition-colors ${
                  activeTab === 'client' 
                    ? 'bg-white text-primary-600 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                For Clients
              </button>
              <button
                onClick={() => setActiveTab('freelancer')}
                className={`px-6 py-2 rounded-md font-medium transition-colors ${
                  activeTab === 'freelancer' 
                    ? 'bg-white text-primary-600 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                For Freelancers
              </button>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {filteredPlans.map((plan, index) => (
              <div
                key={index}
                className={`relative bg-white rounded-2xl shadow-lg border-2 p-8 ${
                  plan.popular 
                    ? 'border-primary-500 transform scale-105' 
                    : 'border-gray-200 hover:border-primary-300'
                } transition-all duration-300`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-primary-600 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                      <FiStar className="w-4 h-4" />
                      Most Popular
                    </div>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.title}</h3>
                  {plan.subtitle && (
                    <p className="text-gray-600 mb-4">{plan.subtitle}</p>
                  )}
                  <div className="mb-2">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  </div>
                  <p className="text-gray-600">{plan.priceSubtext}</p>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3">
                      <FiCheck className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to={plan.ctaLink}
                  className={`w-full block text-center py-3 px-6 rounded-lg font-medium transition-colors ${
                    plan.popular
                      ? 'bg-primary-600 text-white hover:bg-primary-700'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Compare Freelancer Plans
            </h2>
            <p className="text-lg text-gray-600">
              Choose the plan that works best for you
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Features</th>
                    <th className="px-6 py-4 text-center text-sm font-medium text-gray-900">Starter</th>
                    <th className="px-6 py-4 text-center text-sm font-medium text-gray-900">Freelancer Plus</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 text-sm text-gray-900">Service Fee</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-600">10%</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-600">5%</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-gray-900">Featured Profile</td>
                    <td className="px-6 py-4 text-center">❌</td>
                    <td className="px-6 py-4 text-center">✅</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-gray-900">Priority Job Alerts</td>
                    <td className="px-6 py-4 text-center">❌</td>
                    <td className="px-6 py-4 text-center">✅</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-gray-900">Advanced Analytics</td>
                    <td className="px-6 py-4 text-center">❌</td>
                    <td className="px-6 py-4 text-center">✅</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600">
              Everything you need to know about our pricing
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-600">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-primary-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to get started?
          </h2>
          <p className="text-lg text-primary-100 mb-8">
            Join FreelanceX today and start your journey
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register" className="bg-white text-primary-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
              Get Started Free
            </Link>
            <Link to="/jobs" className="border-2 border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-primary-600 transition-colors">
              Browse Jobs
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;