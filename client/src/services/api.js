import axios from 'axios';

// Create axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Log detailed error for debugging
    if (error.code === 'ERR_NETWORK') {
      console.error('❌ Backend server is not running. Please start the server with: cd server && npm run dev');
    }
    
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API methods
export const authAPI = {
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

  getMe: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },

  logout: async () => {
    const response = await api.post('/auth/logout');
    return response.data;
  }
};

// Profile API methods
export const profileAPI = {
  // Get user profile
  getProfile: async () => {
    const response = await api.get('/profile/me');
    return response.data;
  },

  // Update user profile
  updateProfile: async (profileData) => {
    const formData = new FormData();
    
    // Append text fields
    Object.keys(profileData).forEach(key => {
      if (key !== 'avatar' && key !== 'companyLogo' && profileData[key] !== undefined) {
        if (Array.isArray(profileData[key])) {
          formData.append(key, profileData[key].join(','));
        } else {
          formData.append(key, profileData[key]);
        }
      }
    });
    
    // Append files
    if (profileData.avatar) {
      formData.append('avatar', profileData.avatar);
    }
    if (profileData.companyLogo) {
      formData.append('companyLogo', profileData.companyLogo);
    }
    
    const response = await api.put('/profile/update', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  }
};

// Job API methods
export const jobAPI = {
  getJobs: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const response = await api.get(`/jobs?${queryString}`);
    return response.data;
  },

  getJob: async (id) => {
    const response = await api.get(`/jobs/${id}`);
    return response.data;
  },

  createJob: async (formData) => {
    const response = await api.post('/jobs', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  },

  updateJob: async (id, jobData) => {
    const response = await api.put(`/jobs/${id}`, jobData);
    return response.data;
  },

  deleteJob: async (id) => {
    const response = await api.delete(`/jobs/${id}`);
    return response.data;
  },

  getMyJobs: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const response = await api.get(`/jobs/my/jobs?${queryString}`);
    return response.data;
  }
};

// Freelancer API methods
export const freelancerAPI = {
  getFreelancers: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const response = await api.get(`/profile/freelancers?${queryString}`);
    return response.data;
  }
};

// Proposal API methods
export const proposalAPI = {
  submitProposal: async (data) => {
    const response = await api.post('/proposals', data);
    return response.data;
  },

  getMyProposals: async () => {
    const response = await api.get('/proposals/my');
    return response.data;
  },

  getJobProposals: async (jobId) => {
    const response = await api.get(`/proposals/job/${jobId}`);
    return response.data;
  },

  updateProposalStatus: async (proposalId, status) => {
    const response = await api.put(`/proposals/${proposalId}`, { status });
    return response.data;
  }
};

export default api;