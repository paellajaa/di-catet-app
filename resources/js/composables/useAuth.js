import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

export function useAuth() {
  const user = ref(null);
  const loading = ref(false);
  const router = useRouter();

  const getToken = () => localStorage.getItem('token');
  const setToken = (token) => localStorage.setItem('token', token);
  const removeToken = () => localStorage.removeItem('token');

  const checkAuth = async () => {
    const token = getToken();
    if (!token) return false;

    try {
      const response = await axios.get('/api/user');
      user.value = response.data.data;
      return true;
    } catch (e) {
      removeToken();
      user.value = null;
      return false;
    }
  };

  const loginWithGoogle = async () => {
    try {
      loading.value = true;
      const response = await axios.get('/api/auth/google');
      window.location.href = response.data.url;
    } catch (e) {
      console.error('Failed to get Google login URL', e);
    } finally {
      loading.value = false;
    }
  };

  const handleGoogleCallback = async (code) => {
    try {
      loading.value = true;
      const response = await axios.post('/api/auth/google/callback', { code });
      setToken(response.data.access_token);
      user.value = response.data.user;
      
      // Update default axios header immediately
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access_token}`;
      
      return true;
    } catch (e) {
      console.error('Login callback failed', e);
      return false;
    } finally {
      loading.value = false;
    }
  };

  const logout = async () => {
    try {
      loading.value = true;
      await axios.post('/api/logout');
    } catch (e) {
      // Ignore error
    } finally {
      removeToken();
      user.value = null;
      delete axios.defaults.headers.common['Authorization'];
      router.push('/login');
      loading.value = false;
    }
  };

  return {
    user,
    loading,
    getToken,
    checkAuth,
    loginWithGoogle,
    handleGoogleCallback,
    logout,
  };
}
