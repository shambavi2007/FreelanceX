import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiUser, FiCreditCard, FiPhone, FiSearch, FiFileText, FiDollarSign, FiMessageCircle, FiBriefcase, FiCheckCircle, FiArrowUpRight, FiTarget } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import Modal from '../components/common/Modal';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    jobsPosted: 0,
    activeContracts: 0,
    messages: 0,
    earnings: 0
  });
  const [showOnboardingModal, setShowOnboardingModal] = useState(false);

  const clientActions = [
    {
      icon: <FiPhone className="w-6 h-6" />,
      title: "Verify Phone Number",
      description: "Secure your account and build trust",
      action: "Verify Now",
      href: "/verify-phone",
      status: "pending"
    },
    {
      icon: <FiCreditCard className="w-6 h-6" />,
      title: "Add Billing Method",
      description: "Add a payment method to hire freelancers",
      action: "Add Method",
      href: "/billing",
      status: "pending"
    },
    {
      icon: <FiPlus className="w-6 h-6" />,
      title: "Post a Job",
      description: "Find the perfect freelancer for your project",
      action: "Post Job",
      href: "/post-job",
      status: "ready"
    },
    {
      icon: <FiFileText className="w-6 h-6" />,
      title: "View Posted Jobs",
      description: "Manage your job postings and proposals",
      action: "View Jobs",
      href: "/my-jobs",
      status: "ready"
    }
  ];

  const freelancerActions = [
    {
      icon: <FiUser className="w-6 h-6" />,
      title: "Complete Profile",
      description: "Increase your visibility to clients",
      action: "Complete Now",
      href: "/edit-profile",
      status: "pending"
    },
    {
      icon: <FiSearch className="w-6 h-6" />,
      title: "Find Jobs",
      description: "Browse available projects in your field",
      action: "Browse Jobs",
      href: "/jobs",
      status: "ready"
    },
    {
      icon: <FiFileText className="w-6 h-6" />,
      title: "View Proposals",
      description: "Track your submitted proposals",
      action: "View Proposals",
      href: "/my-proposals",
      status: "ready"
    },
    {
      icon: <FiDollarSign className="w-6 h-6" />,
      title: "Earnings Overview",
      description: "Track your income and payments",
      action: "View Earnings",
      href: "/earnings",
      status: "ready"
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'ready': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  useEffect(() => {
    const hasSeen = localStorage.getItem('dashboardOnboardingSeen');
    if (!hasSeen) {
      setShowOnboardingModal(true);
    }
  }, []);

  const growthCards = user?.role === 'client'
    ? [
        { title: 'Recommended freelancers', value: '128', subtitle: 'Matched to your hiring history' },
        { title: 'Avg. proposal quality', value: '4.7/5', subtitle: 'Based on recent applications' },
        { title: 'Time to first hire', value: '19 hrs', subtitle: 'Faster than platform average' }
      ]
    : [
        { title: 'Recommended jobs', value: '42', subtitle: 'Tailored to your profile skills' },
        { title: 'Proposal acceptance', value: '31%', subtitle: 'Higher than last month' },
        { title: 'Response speed', value: '2.8 hrs', subtitle: 'Average client first reply' }
      ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div
          className="rounded-2xl shadow-sm p-6 mb-8 bg-cover bg-center text-white"
          style={{
            backgroundImage: "linear-gradient(120deg, rgba(12, 74, 110, 0.88), rgba(22, 163, 74, 0.82)), url('https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1600&q=80')"
          }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">
                Welcome back, {user?.name || 'User'}
              </h1>
              <div className="flex items-center mt-2">
                <span className={`inline-flex px-3 py-1 text-sm font-medium rounded-full ${
                  user?.role === 'client' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                }`}>
                  {user?.role === 'client' ? 'Client' : 'Freelancer'}
                </span>
              </div>
              <p className="text-blue-100 mt-3">
                {user?.role === 'client'
                  ? 'Your hiring dashboard is ready. Prioritize top candidates and reduce time-to-hire.'
                  : 'Track your momentum, discover better-fit projects, and increase proposal success.'}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-blue-100">Today</p>
              <p className="text-lg font-semibold">
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
              <button
                type="button"
                onClick={() => setShowOnboardingModal(true)}
                className="mt-3 bg-white/15 hover:bg-white/25 border border-white/25 px-4 py-2 rounded-lg text-sm"
              >
                Platform Tour
              </button>
            </div>
          </div>
        </div>

        <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          {growthCards.map((card) => (
            <div key={card.title} className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
              <p className="text-sm text-gray-500">{card.title}</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{card.value}</p>
              <p className="text-sm text-gray-600 mt-1">{card.subtitle}</p>
            </div>
          ))}
        </div>

        {/* Action Cards */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {(user?.role === 'client' ? clientActions : freelancerActions).map((action, index) => (
              <Link
                key={index}
                to={action.href}
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200 hover:border-primary-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="text-primary-600">
                    {action.icon}
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(action.status)}`}>
                    {action.status === 'pending' ? 'Action Needed' : 'Ready'}
                  </span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{action.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{action.description}</p>
                <span className="text-primary-600 text-sm font-medium hover:text-primary-700">
                  {action.action} <FiArrowUpRight className="inline w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Overview Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Stats Cards */}
          <div className="lg:col-span-2">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center">
                  <FiBriefcase className="w-8 h-8 text-blue-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">
                      {user?.role === 'client' ? 'Jobs Posted' : 'Jobs Applied'}
                    </p>
                    <p className="text-2xl font-bold text-gray-900">{stats.jobsPosted}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center">
                  <FiFileText className="w-8 h-8 text-green-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Active Contracts</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.activeContracts}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center">
                  <FiMessageCircle className="w-8 h-8 text-purple-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Messages</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.messages}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="text-center py-8">
                <FiFileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No recent activity</h3>
                <p className="text-gray-600 mb-4">
                  {user?.role === 'client' 
                    ? 'Start by posting your first job to see activity here.'
                    : 'Apply to jobs to see your activity here.'
                  }
                </p>
                <Link 
                  to={user?.role === 'client' ? '/post-job' : '/jobs'} 
                  className="btn-primary"
                >
                  {user?.role === 'client' ? 'Post a Job' : 'Find Jobs'}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal isOpen={showOnboardingModal} onClose={() => setShowOnboardingModal(false)} title="Professional Workspace Tour" size="lg">
        <div className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="p-4 rounded-xl border border-gray-200">
              <FiTarget className="w-6 h-6 text-green-600 mb-2" />
              <p className="font-semibold text-gray-900">Smart matching</p>
              <p className="text-sm text-gray-600 mt-1">Get relevant opportunities and suggestions daily.</p>
            </div>
            <div className="p-4 rounded-xl border border-gray-200">
              <FiMessageCircle className="w-6 h-6 text-blue-600 mb-2" />
              <p className="font-semibold text-gray-900">Collaboration flow</p>
              <p className="text-sm text-gray-600 mt-1">Track messages, responses, and active contracts.</p>
            </div>
            <div className="p-4 rounded-xl border border-gray-200">
              <FiCheckCircle className="w-6 h-6 text-purple-600 mb-2" />
              <p className="font-semibold text-gray-900">Milestone tracking</p>
              <p className="text-sm text-gray-600 mt-1">Stay organized with clear status and next actions.</p>
            </div>
          </div>
          <button
            type="button"
            className="btn-primary"
            onClick={() => {
              localStorage.setItem('dashboardOnboardingSeen', 'true');
              setShowOnboardingModal(false);
              toast.success('Tour completed. Your dashboard is ready.');
            }}
          >
            Finish Tour
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Dashboard;