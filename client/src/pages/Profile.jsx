import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiEdit, FiUser, FiBriefcase, FiDollarSign, FiClock, FiCheckCircle, FiImage, FiCalendar } from 'react-icons/fi';
import { FaBuilding } from 'react-icons/fa';
import { profileAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import Modal from '../components/common/Modal';
import toast from 'react-hot-toast';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAvailabilityModal, setShowAvailabilityModal] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await profileAPI.getProfile();
      setProfile(response.data.profile);
    } catch (error) {
      toast.error('Failed to load profile');
      console.error('Profile fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Profile not found</h2>
          <Link to="/edit-profile" className="mt-4 btn-primary inline-block">
            Create Profile
          </Link>
        </div>
      </div>
    );
  }

  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    return `http://localhost:5000/${imagePath}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          className="rounded-2xl shadow-sm p-6 mb-6 text-white bg-cover bg-center"
          style={{
            backgroundImage: "linear-gradient(120deg, rgba(3, 105, 161, 0.88), rgba(16, 185, 129, 0.82)), url('https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1600&q=80')"
          }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                {profile.avatar ? (
                  <img
                    src={getImageUrl(profile.avatar)}
                    alt={profile.name}
                    className="w-20 h-20 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center">
                    <FiUser className="w-8 h-8 text-gray-400" />
                  </div>
                )}
              </div>
              <div>
                <h1 className="text-2xl font-bold">{profile.name}</h1>
                <div className="flex items-center mt-1">
                  <span className={`inline-flex px-3 py-1 text-sm font-medium rounded-full ${
                    profile.role === 'client' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                  }`}>
                    {profile.role === 'client' ? 'Client' : 'Freelancer'}
                  </span>
                </div>
                <p className="text-sm text-blue-100 mt-1">{profile.email}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setShowAvailabilityModal(true)}
                className="bg-white/15 hover:bg-white/25 border border-white/25 px-4 py-2 rounded-lg text-sm"
              >
                <FiCalendar className="inline w-4 h-4 mr-1" />
                Availability
              </button>
              <Link
                to="/edit-profile"
                className="btn-primary flex items-center space-x-2"
              >
                <FiEdit className="w-4 h-4" />
                <span>Edit Profile</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Profile Content */}
        {profile.role === 'freelancer' ? (
          <FreelancerProfile profile={profile} />
        ) : (
          <ClientProfile profile={profile} getImageUrl={getImageUrl} />
        )}

        {/* Profile Completion Status */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Status</h3>
          <div className="flex items-center space-x-3">
            <div className={`w-3 h-3 rounded-full ${
              profile.profileCompleted ? 'bg-green-500' : 'bg-yellow-500'
            }`}></div>
            <span className={`font-medium ${
              profile.profileCompleted ? 'text-green-700' : 'text-yellow-700'
            }`}>
              {profile.profileCompleted ? 'Profile Complete' : 'Profile Incomplete'}
            </span>
          </div>
          {!profile.profileCompleted && (
            <p className="text-sm text-gray-600 mt-2">
              Complete your profile to get better visibility and opportunities.
            </p>
          )}
        </div>
      </div>

      <Modal isOpen={showAvailabilityModal} onClose={() => setShowAvailabilityModal(false)} title="Set Professional Availability">
        <div className="p-6 space-y-4">
          <p className="text-gray-700">
            Keep your availability updated so clients can make faster decisions and book your time confidently.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button className="border border-gray-200 rounded-lg p-3 hover:border-green-500 text-left">
              <p className="font-semibold text-gray-900">Full-time</p>
              <p className="text-sm text-gray-600">30+ hrs/week</p>
            </button>
            <button className="border border-gray-200 rounded-lg p-3 hover:border-green-500 text-left">
              <p className="font-semibold text-gray-900">Part-time</p>
              <p className="text-sm text-gray-600">10-30 hrs/week</p>
            </button>
            <button className="border border-gray-200 rounded-lg p-3 hover:border-green-500 text-left">
              <p className="font-semibold text-gray-900">As needed</p>
              <p className="text-sm text-gray-600">Flexible schedule</p>
            </button>
          </div>
          <button
            type="button"
            className="btn-primary"
            onClick={() => {
              toast.success('Availability preferences saved');
              setShowAvailabilityModal(false);
            }}
          >
            Save Availability
          </button>
        </div>
      </Modal>
    </div>
  );
};

// Freelancer Profile Component
const FreelancerProfile = ({ profile }) => (
  <div className="space-y-6">
    {/* Bio */}
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">About Me</h3>
      {profile.bio ? (
        <p className="text-gray-700">{profile.bio}</p>
      ) : (
        <div className="text-center py-8">
          <FiUser className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 mb-4">No bio added yet</p>
          <Link to="/edit-profile" className="text-primary-600 hover:text-primary-700 font-medium">
            Add your bio →
          </Link>
        </div>
      )}
    </div>

    {/* Skills */}
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Skills</h3>
      {profile.skills && profile.skills.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {profile.skills.map((skill, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm"
            >
              {skill}
            </span>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <FiBriefcase className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 mb-4">No skills added yet</p>
          <Link to="/edit-profile" className="text-primary-600 hover:text-primary-700 font-medium">
            Add your skills →
          </Link>
        </div>
      )}
    </div>

    {/* Experience & Rate */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center space-x-3 mb-2">
          <FiClock className="w-5 h-5 text-primary-600" />
          <h3 className="text-lg font-semibold text-gray-900">Experience</h3>
        </div>
        <p className="text-2xl font-bold text-gray-900">
          {profile.experience !== undefined ? `${profile.experience} years` : 'Not specified'}
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center space-x-3 mb-2">
          <FiDollarSign className="w-5 h-5 text-primary-600" />
          <h3 className="text-lg font-semibold text-gray-900">Hourly Rate</h3>
        </div>
        <p className="text-2xl font-bold text-gray-900">
          {profile.hourlyRate ? `$${profile.hourlyRate}/hr` : 'Not specified'}
        </p>
      </div>
    </div>

    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Portfolio Highlights</h3>
        <span className="text-sm text-gray-500">Visual showcase</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80'
        ].map((img, idx) => (
          <div key={idx} className="rounded-lg overflow-hidden border border-gray-100">
            <img src={img} alt={`Portfolio ${idx + 1}`} className="h-36 w-full object-cover" />
          </div>
        ))}
      </div>
      <div className="mt-4 text-sm text-gray-600 flex items-center gap-2">
        <FiImage className="w-4 h-4" />
        Add your own project snapshots from Edit Profile.
      </div>
    </div>
  </div>
);

// Client Profile Component
const ClientProfile = ({ profile, getImageUrl }) => (
  <div className="space-y-6">
    {/* Company Info */}
    <div className="bg-white rounded-lg shadow-soft p-6">
      <div className="flex items-center space-x-4 mb-4">
        {profile.companyLogo ? (
          <img
            src={getImageUrl(profile.companyLogo)}
            alt="Company Logo"
            className="w-16 h-16 rounded-lg object-cover"
          />
        ) : (
          <div className="w-16 h-16 rounded-lg bg-gray-200 flex items-center justify-center">
            <FaBuilding className="w-8 h-8 text-gray-400" />
          </div>
        )}
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {profile.companyName || 'Company Name Not Set'}
          </h3>
          <p className="text-gray-600">Company</p>
        </div>
      </div>
    </div>

    {/* Company Description */}
    <div className="bg-white rounded-lg shadow-soft p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Company Description</h3>
      {profile.companyDescription ? (
        <p className="text-gray-700">{profile.companyDescription}</p>
      ) : (
        <p className="text-gray-500 italic">No company description added yet.</p>
      )}
    </div>

    <div className="bg-white rounded-lg shadow-soft p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Trust & Hiring Signals</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-500">Payment verification</p>
          <p className="mt-1 font-semibold text-green-700 flex items-center gap-2"><FiCheckCircle className="w-4 h-4" /> Verified</p>
        </div>
        <div className="p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-500">Average response</p>
          <p className="mt-1 font-semibold text-gray-900">Within 3 hours</p>
        </div>
        <div className="p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-500">Open opportunities</p>
          <p className="mt-1 font-semibold text-gray-900">8 active jobs</p>
        </div>
      </div>
    </div>
  </div>
);

export default Profile;