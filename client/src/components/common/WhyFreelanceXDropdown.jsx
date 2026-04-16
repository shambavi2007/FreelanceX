import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiUsers, FiSearch, FiStar, FiTrendingUp } from 'react-icons/fi';

const WhyFreelanceXDropdown = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const clientLinks = [
    {
      title: 'Success Stories',
      description: 'Discover how teams work strategically and grow together.',
      icon: <FiStar className="w-5 h-5" />,
      href: '/why/success-stories'
    },
    {
      title: 'How to Hire',
      description: 'Learn the different ways to get work done.',
      icon: <FiUsers className="w-5 h-5" />,
      href: '/why/how-to-hire'
    }
  ];

  const freelancerLinks = [
    {
      title: 'Reviews',
      description: 'See what it\'s like to collaborate on FreelanceX.',
      icon: <FiStar className="w-5 h-5" />,
      href: '/why/reviews'
    },
    {
      title: 'How to Find Work',
      description: 'Learn how to grow your independent career.',
      icon: <FiSearch className="w-5 h-5" />,
      href: '/why/how-to-find-work'
    }
  ];

  const featuredResources = [
    {
      title: 'How to Hire Freelancers on FreelanceX',
      href: '/resources/hire-guide'
    },
    {
      title: 'How to Use FreelanceX as a Freelancer',
      href: '/resources/freelancer-guide'
    },
    {
      title: 'Grow Your Freelance Business',
      href: '/resources/grow-business'
    }
  ];

  return (
    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-screen max-w-7xl bg-white shadow-2xl border-t border-gray-200 z-50">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Column 1 - For Clients */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-6">For Clients</h3>
            <div className="space-y-4">
              {clientLinks.map((link, index) => (
                <Link
                  key={index}
                  to={link.href}
                  onClick={onClose}
                  className="block group hover:bg-gray-50 p-3 rounded-lg transition-colors"
                >
                  <div className="flex items-start space-x-3">
                    <div className="text-primary-600 mt-1">{link.icon}</div>
                    <div>
                      <h4 className="font-medium text-gray-900 group-hover:text-primary-600 transition-colors">
                        {link.title}
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">{link.description}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Column 2 - For Freelancers */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-6">For Freelancers</h3>
            <div className="space-y-4">
              {freelancerLinks.map((link, index) => (
                <Link
                  key={index}
                  to={link.href}
                  onClick={onClose}
                  className="block group hover:bg-gray-50 p-3 rounded-lg transition-colors"
                >
                  <div className="flex items-start space-x-3">
                    <div className="text-primary-600 mt-1">{link.icon}</div>
                    <div>
                      <h4 className="font-medium text-gray-900 group-hover:text-primary-600 transition-colors">
                        {link.title}
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">{link.description}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Column 3 - Featured Resources */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Featured Resources</h3>
            <div className="space-y-3">
              {featuredResources.map((resource, index) => (
                <Link
                  key={index}
                  to={resource.href}
                  onClick={onClose}
                  className="block p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:shadow-md transition-all group"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-gray-900 group-hover:text-primary-600 transition-colors text-sm">
                      {resource.title}
                    </h4>
                    <FiArrowRight className="w-4 h-4 text-gray-400 group-hover:text-primary-600 transition-colors" />
                  </div>
                </Link>
              ))}
              <Link
                to="/resources"
                onClick={onClose}
                className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium text-sm mt-4"
              >
                More resources
                <FiArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyFreelanceXDropdown;