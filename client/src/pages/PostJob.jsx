import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiFileText, FiDollarSign, FiClock, FiTag, FiPaperclip, FiX } from 'react-icons/fi';
import { jobAPI } from '../services/api';
import toast from 'react-hot-toast';

const PostJob = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    budgetMin: '',
    budgetMax: '',
    budgetType: 'fixed',
    duration: '',
    experienceLevel: '',
    skills: '',
    attachments: []
  });
  const [loading, setLoading] = useState(false);

  const categories = [
    'Web Development',
    'Mobile Development',
    'Graphic Design',
    'Content Writing',
    'Digital Marketing',
    'Data Analysis',
    'Video Editing',
    'Translation',
    'Other'
  ];

  const experienceLevels = [
    { label: 'Entry Level', value: 'entry' },
    { label: 'Intermediate', value: 'intermediate' },
    { label: 'Expert', value: 'expert' }
  ];

  const durations = [
    { label: 'Less than 1 month', value: 'less-than-1-month' },
    { label: '1 - 3 months', value: '1-3-months' },
    { label: '3 - 6 months', value: '3-6-months' },
    { label: 'More than 6 months', value: 'more-than-6-months' }
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({
      ...formData,
      attachments: [...formData.attachments, ...files]
    });
  };

  const removeFile = (index) => {
    const newFiles = formData.attachments.filter((_, i) => i !== index);
    setFormData({ ...formData, attachments: newFiles });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.category || !formData.description || !formData.budgetMin || !formData.budgetMax || !formData.duration || !formData.experienceLevel) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (formData.title.length < 5) {
      toast.error('Title must be at least 5 characters');
      return;
    }

    if (formData.description.length < 20) {
      toast.error('Description must be at least 20 characters');
      return;
    }

    setLoading(true);
    try {
      const jobData = new FormData();
      jobData.append('title', formData.title);
      jobData.append('category', formData.category);
      jobData.append('description', formData.description);
      jobData.append('budget', JSON.stringify({ min: Number(formData.budgetMin), max: Number(formData.budgetMax) }));
      jobData.append('budgetType', formData.budgetType);
      jobData.append('duration', formData.duration);
      jobData.append('experienceLevel', formData.experienceLevel);

      const skillsArray = formData.skills.split(',').map(s => s.trim()).filter(s => s);
      jobData.append('skills', skillsArray.join(','));

      formData.attachments.forEach(file => jobData.append('attachments', file));

      await jobAPI.createJob(jobData);
      toast.success('Job posted successfully!');
      navigate('/my-jobs');
    } catch (error) {
      const msg = error.response?.data?.error || error.response?.data?.details?.[0]?.msg || 'Failed to post job';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Post a Job</h1>
          <p className="text-gray-600 mb-8">Find the perfect freelancer for your project</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Job Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Job Title <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <FiFileText className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="e.g. Build a responsive website"
                  required
                />
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <FiTag className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="input-field appearance-none"
                  required
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Job Description <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="6"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Describe your project in detail..."
                required
              />
            </div>

            {/* Budget */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Budget Type <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-4 mb-3">
                {['fixed', 'hourly'].map(type => (
                  <label key={type} className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="budgetType"
                      value={type}
                      checked={formData.budgetType === type}
                      onChange={handleChange}
                      className="h-4 w-4 text-green-600 focus:ring-green-500"
                    />
                    <span className="ml-2 text-sm text-gray-700 capitalize">{type} Price</span>
                  </label>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Min Budget ($)</label>
                  <div className="relative">
                    <FiDollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                    <input
                      type="number"
                      name="budgetMin"
                      value={formData.budgetMin}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="500"
                      min="0"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Max Budget ($)</label>
                  <div className="relative">
                    <FiDollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                    <input
                      type="number"
                      name="budgetMax"
                      value={formData.budgetMax}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="2000"
                      min="0"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Duration */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Duration <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <FiClock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                <select
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  className="input-field appearance-none"
                  required
                >
                  <option value="">Select duration</option>
                  {durations.map((dur) => (
                    <option key={dur.value} value={dur.value}>{dur.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Experience Level */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Experience Level <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-4">
                {experienceLevels.map((level) => (
                  <label key={level.value} className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="experienceLevel"
                      value={level.value}
                      checked={formData.experienceLevel === level.value}
                      onChange={handleChange}
                      className="h-4 w-4 text-green-600 focus:ring-green-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">{level.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Required Skills
              </label>
              <input
                type="text"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="e.g. React, Node.js, MongoDB (comma separated)"
              />
              <p className="text-xs text-gray-500 mt-1">Separate skills with commas</p>
            </div>

            {/* File Attachments */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Attachments (Optional)
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-green-500 transition-colors">
                <FiPaperclip className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <label className="cursor-pointer">
                  <span className="text-green-600 hover:text-green-700 font-medium">
                    Click to upload
                  </span>
                  <span className="text-gray-600"> or drag and drop</span>
                  <input
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    className="hidden"
                    accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg"
                  />
                </label>
                <p className="text-xs text-gray-500 mt-1">PDF, DOC, TXT, PNG, JPG (max 10MB)</p>
              </div>

              {/* File List */}
              {formData.attachments.length > 0 && (
                <div className="mt-4 space-y-2">
                  {formData.attachments.map((file, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                      <span className="text-sm text-gray-700">{file.name}</span>
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FiX className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-4 pt-6">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Posting...' : 'Post Job'}
              </button>
              <button
                type="button"
                onClick={() => navigate('/dashboard')}
                className="flex-1 btn-secondary"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostJob;
