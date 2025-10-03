import axios from 'axios';

// Create an axios instance with default configuration
const api = axios.create({
  baseURL: 'http://localhost:3001/api', // Backend server URL
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// API methods
api.getTableConfig = () => api.get('/config');
api.getCompanies = () => api.get('/companies');
api.getDrugs = (company = null) => {
  const params = company ? { company } : {};
  return api.get('/drugs', { params });
};

export default api;