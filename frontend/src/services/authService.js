import axios from './axiosConfig';

const authService = {
  login: async (username, password) => {
    const response = await axios.post('/token/', { username, password });
    localStorage.setItem('accessToken', response.data.access);
    localStorage.setItem('refreshToken', response.data.refresh);
  },

  logout: () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  },

  isAuthenticated: () => !!localStorage.getItem('accessToken'),
};

export default authService;
