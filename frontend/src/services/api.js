import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_BASE = `${BACKEND_URL}/api`;

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging
apiClient.interceptors.request.use(
  (config) => {
    console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    console.log(`✅ API Response: ${response.config.method?.toUpperCase()} ${response.config.url} - ${response.status}`);
    return response;
  },
  (error) => {
    console.error('❌ Response Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// API endpoints
export const api = {
  // Hero section
  getHero: () => apiClient.get('/hero'),
  
  // Training
  getTrainings: () => apiClient.get('/trainings'),
  getTrainingVideos: () => apiClient.get('/training-videos'),
  
  // About
  getAbout: () => apiClient.get('/about'),
  
  // Statistics
  getStatistics: () => apiClient.get('/statistics'),
  
  // Social links
  getSocialLinks: () => apiClient.get('/social-links'),
  
  // Newsletter
  subscribeNewsletter: (email) => apiClient.post('/newsletter', { email }),
  getNewsletterCount: () => apiClient.get('/newsletter/count'),
  
  // Testimonials
  getTestimonials: () => apiClient.get('/testimonials'),
  createTestimonial: (testimonial) => apiClient.post('/testimonials', testimonial),
};

export default api;