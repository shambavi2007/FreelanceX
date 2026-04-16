import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUser, FiUpload, FiX } from 'react-icons/fi';
import { profileAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const EditProfile = () => {
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({});
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await profileAPI.getProfile();
      const profileData = response.data.profile;
      setProfile(profileData);
      
      // Initialize form data based on role
      if (profileData.role === 'freelancer') {
        setFormData({
          name: profileData.name || '',
          bio: profileData.bio || '',
          skills: profileData.skills ? profileData.skills.join(', ') : '',
          experience: profileData.experience || '',
          hourlyRate: profileData.hourlyRate || ''
        });
      } else {
        setFormData({
          name: profileData.name || '',
          companyName: profileData.companyName || '',
          companyDescription: profileData.companyDescription || ''
        });
      }
      
      // Set existing images
      if (profileData.avatar) {
        setAvatarPreview(`http://localhost:5000/${profileData.avatar}`);
      }
      if (profileData.companyLogo) {
        setLogoPreview(`http://localhost:5000/${profileData.companyLogo}`);
      }
    } catch (error) {
      toast.error('Failed to load profile');
      console.error('Profile fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size must be less than 5MB');
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      if (type === 'avatar') {
        setAvatarPreview(e.target.result);
        setFormData({ ...formData, avatar: file });
      } else if (type === 'logo') {
        setLogoPreview(e.target.result);
        setFormData({ ...formData, companyLogo: file });
      }
    };
    reader.readAsDataURL(file);
  };

  const removeImage = (type) => {
    if (type === 'avatar') {
      setAvatarPreview(null);
      setFormData({ ...formData, avatar: null });
    } else if (type === 'logo') {
      setLogoPreview(null);
      setFormData({ ...formData, companyLogo: null });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      await profileAPI.updateProfile(formData);
      toast.success('Profile updated successfully!');
      navigate('/profile');
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to update profile');
      console.error('Profile update error:', error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-soft p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Profile</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Avatar Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Profile Picture
              </label>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  {avatarPreview ? (
                    <div className="relative">
                      <img
                        src={avatarPreview}
                        alt="Avatar preview"
                        className="w-20 h-20 rounded-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage('avatar')}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                      >
                        <FiX className="w-3 h-3" />
                      </button>
                    </div>
                  ) : (
                    <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center">
                      <FiUser className="w-8 h-8 text-gray-400" />
                    </div>
                  )}
                </div>
                <div>
                  <input
                    type="file"
                    id="avatar"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, 'avatar')}
                    className="hidden"
                  />
                  <label
                    htmlFor="avatar"
                    className="btn-secondary cursor-pointer flex items-center space-x-2"
                  >
                    <FiUpload className="w-4 h-4" />
                    <span>Upload Photo</span>
                  </label>
                  <p className="text-xs text-gray-500 mt-1">Max 5MB, JPG/PNG</p>
                </div>
              </div>
            </div>

            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                autoComplete="name"
                value={formData.name}
                onChange={handleInputChange}
                className="input-field"
                required
              />
            </div>

            {/* Role-specific fields */}
            {profile?.role === 'freelancer' ? (
              <FreelancerFields formData={formData} handleInputChange={handleInputChange} />
            ) : (
              <ClientFields 
                formData={formData} 
                handleInputChange={handleInputChange}
                logoPreview={logoPreview}
                handleFileChange={handleFileChange}
                removeImage={removeImage}
              />
            )}

            {/* Submit Button */}
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => navigate('/profile')}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// Freelancer-specific form fields
const FreelancerFields = ({ formData, handleInputChange }) => (
  <>
    <div>
      <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-2">
        Bio
      </label>
      <textarea
        id="bio"
        name="bio"
        rows={4}
        value={formData.bio}
        onChange={handleInputChange}
        className="input-field"
        placeholder="Tell clients about yourself..."
        maxLength={500}
      />
      <p className="text-xs text-gray-500 mt-1">{formData.bio?.length || 0}/500 characters</p>
    </div>

    <div>
      <label htmlFor="skills" className="block text-sm font-medium text-gray-700 mb-2">
        Skills
      </label>
      <input
        type="text"
        id="skills"
        name="skills"
        value={formData.skills}
        onChange={handleInputChange}
        className="input-field"
        placeholder="JavaScript, React, Node.js (comma separated)"
      />
      <p className="text-xs text-gray-500 mt-1">Separate skills with commas</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-2">
          Experience (years)
        </label>
        <input
          type="number"
          id="experience"
          name="experience"
          min="0"
          value={formData.experience}
          onChange={handleInputChange}
          className="input-field"
          placeholder="5"
        />
      </div>

      <div>
        <label htmlFor="hourlyRate" className="block text-sm font-medium text-gray-700 mb-2">
          Hourly Rate ($)
        </label>
        <input
          type="number"
          id="hourlyRate"
          name="hourlyRate"
          min="0"
          step="0.01"
          value={formData.hourlyRate}
          onChange={handleInputChange}
          className="input-field"
          placeholder="50.00"
        />
      </div>
    </div>
  </>
);

// Client-specific form fields
const ClientFields = ({ formData, handleInputChange, logoPreview, handleFileChange, removeImage }) => (
  <>
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Company Logo
      </label>
      <div className="flex items-center space-x-4">
        <div className="relative">
          {logoPreview ? (
            <div className="relative">
              <img
                src={logoPreview}
                alt="Logo preview"
                className="w-16 h-16 rounded-lg object-cover"
              />
              <button
                type="button"
                onClick={() => removeImage('logo')}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
              >
                <FiX className="w-3 h-3" />
              </button>
            </div>
          ) : (
            <div className="w-16 h-16 rounded-lg bg-gray-200 flex items-center justify-center">
              <FiUpload className="w-6 h-6 text-gray-400" />
            </div>
          )}
        </div>
        <div>
          <input
            type="file"
            id="companyLogo"
            accept="image/*"
            onChange={(e) => handleFileChange(e, 'logo')}
            className="hidden"
          />
          <label
            htmlFor="companyLogo"
            className="btn-secondary cursor-pointer flex items-center space-x-2"
          >
            <FiUpload className="w-4 h-4" />
            <span>Upload Logo</span>
          </label>
          <p className="text-xs text-gray-500 mt-1">Max 5MB, JPG/PNG</p>
        </div>
      </div>
    </div>

    <div>
      <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-2">
        Company Name
      </label>
      <input
        type="text"
        id="companyName"
        name="companyName"
        autoComplete="organization"
        value={formData.companyName}
        onChange={handleInputChange}
        className="input-field"
        placeholder="Your Company Name"
        maxLength={100}
      />
    </div>

    <div>
      <label htmlFor="companyDescription" className="block text-sm font-medium text-gray-700 mb-2">
        Company Description
      </label>
      <textarea
        id="companyDescription"
        name="companyDescription"
        rows={4}
        value={formData.companyDescription}
        onChange={handleInputChange}
        className="input-field"
        placeholder="Describe your company..."
        maxLength={1000}
      />
      <p className="text-xs text-gray-500 mt-1">{formData.companyDescription?.length || 0}/1000 characters</p>
    </div>
  </>
);

export default EditProfile;