import React from 'react';
import { Link } from 'react-router-dom';
import { FiTwitter, FiFacebook, FiLinkedin, FiInstagram, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

const Footer = () => {
  const footerLinks = {
    'For Clients': [
      { name: 'How to Hire', href: '/why/how-to-hire' },
      { name: 'Talent Marketplace', href: '/talent-marketplace' },
      { name: 'Project Catalog', href: '/project-catalog' },
      { name: 'Enterprise', href: '/enterprise' }
    ],
    'For Freelancers': [
      { name: 'How to Find Work', href: '/why/how-to-find-work' },
      { name: 'Direct Contracts', href: '/contracts' },
      { name: 'Find Freelance Jobs', href: '/jobs' },
      { name: 'Freelancer Plus', href: '/plus' }
    ],
    'Resources': [
      { name: 'Help & Support', href: '/support' },
      { name: 'Success Stories', href: '/why/success-stories' },
      { name: 'Reviews', href: '/why/reviews' },
      { name: 'Blog', href: '/blog' }
    ],
    'Company': [
      { name: 'About Us', href: '/about' },
      { name: 'Leadership', href: '/leadership' },
      { name: 'Careers', href: '/careers' },
      { name: 'Press', href: '/press' }
    ]
  };

  const socialLinks = [
    { icon: <FiTwitter className="w-5 h-5" />, href: '#', name: 'Twitter' },
    { icon: <FiFacebook className="w-5 h-5" />, href: '#', name: 'Facebook' },
    { icon: <FiLinkedin className="w-5 h-5" />, href: '#', name: 'LinkedIn' },
    { icon: <FiInstagram className="w-5 h-5" />, href: '#', name: 'Instagram' }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">F</span>
              </div>
              <span className="text-2xl font-bold">FreelanceX</span>
            </Link>
            <p className="text-gray-400 mb-6 leading-relaxed">
              The world's largest marketplace for freelancers and businesses. 
              Connect, collaborate, and get work done.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-400">
                <FiMail className="w-4 h-4" />
                <span>support@freelancex.com</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <FiPhone className="w-4 h-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <FiMapPin className="w-4 h-4" />
                <span>San Francisco, CA</span>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold text-white mb-4">{category}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-gray-400 hover:text-white transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h3 className="text-xl font-semibold mb-2">Stay Updated</h3>
              <p className="text-gray-400">Get the latest news and updates from FreelanceX</p>
            </div>
            <div className="flex w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-64 px-4 py-3 bg-gray-800 border border-gray-700 rounded-l-lg focus:outline-none focus:border-green-500 text-white"
              />
              <button className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-r-lg font-semibold transition-colors duration-200">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 FreelanceX. All rights reserved.
            </div>
            
            {/* Social Links */}
            <div className="flex items-center space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
            
            {/* Legal Links */}
            <div className="flex items-center space-x-6 text-sm text-gray-400 mt-4 md:mt-0">
              <Link to="/privacy" className="hover:text-white transition-colors duration-200">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-white transition-colors duration-200">
                Terms of Service
              </Link>
              <Link to="/cookies" className="hover:text-white transition-colors duration-200">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;