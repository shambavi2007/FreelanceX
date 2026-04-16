import axios from 'axios';

// Create axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
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
  // Get all jobs with filters (MockAPI for demo, fallback to real API)
  getJobs: async (params = {}) => {
    try {
      // Use MockAPI for demo purposes - REPLACE WITH YOUR ACTUAL MOCKAPI URL
      const mockApiUrl = 'https://693a8ead9b80ba7262ca6893.mockapi.io/FreelanceX';
      const response = await axios.get(mockApiUrl);
      
      // Apply client-side filtering if needed
      let jobs = response.data;
      
      if (params.category) {
        jobs = jobs.filter(job => job.category === params.category);
      }
      
      if (params.experienceLevel) {
        jobs = jobs.filter(job => job.experienceLevel === params.experienceLevel);
      }
      
      if (params.search) {
        jobs = jobs.filter(job => 
          job.title.toLowerCase().includes(params.search.toLowerCase()) ||
          job.description.toLowerCase().includes(params.search.toLowerCase())
        );
      }
      
      return {
        success: true,
        data: {
          jobs: response.data,
          pagination: {
            page: 1,
            limit: response.data.length,
            total: response.data.length,
            pages: 1
          }
        }
      };
    } catch (error) {
      console.error('MockAPI failed, using fallback data:', error);
      // Return fallback data if MockAPI fails
      const fallbackJobs = [
        {
          id: '1',
          title: 'React Frontend Developer',
          category: 'Web Development',
          description: 'Build a modern e-commerce platform with React',
          budget: 25000,
          duration: '2 months',
          experienceLevel: 'Intermediate',
          skills: ['React', 'JavaScript', 'CSS'],
          location: 'Remote',
          postedAt: new Date().toISOString(),
          clientName: 'John Doe',
          proposals: 5
        },
        {
          id: '2',
          title: 'Node.js Backend Developer',
          category: 'Web Development',
          description: 'Create RESTful APIs for mobile application',
          budget: 18000,
          duration: '1 month',
          experienceLevel: 'Expert',
          skills: ['Node.js', 'Express', 'MongoDB'],
          location: 'Remote',
          postedAt: new Date().toISOString(),
          clientName: 'Jane Smith',
          proposals: 8
        }
      ];
      
      return {
        success: true,
        data: {
          jobs: fallbackJobs,
          pagination: {
            page: 1,
            limit: fallbackJobs.length,
            total: fallbackJobs.length,
            pages: 1
          }
        }
      };
    }
  },

  // Get single job
  getJob: async (id) => {
    try {
      // Use MockAPI for demo - REPLACE WITH YOUR ACTUAL MOCKAPI URL
      const mockApiUrl = `https://693a8ead9b80ba7262ca6893.mockapi.io/FreelanceX/${id}`;
      const response = await axios.get(mockApiUrl);
      return {
        success: true,
        data: { job: response.data }
      };
    } catch (error) {
      // Return fallback data if MockAPI fails
      return {
        success: true,
        data: {
          job: {
            id: id,
            title: 'Sample Job',
            category: 'Web Development',
            description: 'This is a sample job description',
            budget: 15000,
            duration: '1 month',
            experienceLevel: 'Intermediate',
            skills: ['JavaScript', 'React'],
            location: 'Remote',
            postedAt: new Date().toISOString(),
            clientName: 'Sample Client',
            proposals: 3
          }
        }
      };
    }
  },

  // Create new job (Client only)
  createJob: async (formData) => {
    const response = await api.post('/jobs', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  },

  // Update job
  updateJob: async (id, jobData) => {
    const response = await api.put(`/jobs/${id}`, jobData);
    return response.data;
  },

  // Delete job
  deleteJob: async (id) => {
    const response = await api.delete(`/jobs/${id}`);
    return response.data;
  },

  // Get user's jobs
  getMyJobs: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const response = await api.get(`/jobs/my/jobs?${queryString}`);
    return response.data;
  }
};

export default api;