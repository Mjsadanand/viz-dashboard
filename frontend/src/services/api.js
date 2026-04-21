import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchInsights = async (filters = {}) => {
  try {
    const params = new URLSearchParams();
    
    Object.keys(filters).forEach(key => {
      if (filters[key]) {
        params.append(key, filters[key]);
      }
    });

    const response = await api.get(`/insights?${params.toString()}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching insights:', error);
    throw error;
  }
};

export const fetchFilterOptions = async () => {
  try {
    const response = await api.get('/filters');
    return response.data;
  } catch (error) {
    console.error('Error fetching filters:', error);
    throw error;
  }
};

export const fetchStatistics = async () => {
  try {
    const response = await api.get('/statistics');
    return response.data;
  } catch (error) {
    console.error('Error fetching statistics:', error);
    throw error;
  }
};

export default api;
