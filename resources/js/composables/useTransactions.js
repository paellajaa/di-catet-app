import { ref } from 'vue';
import axios from 'axios';

/**
 * useTransactions composable
 * Handles CRUD API calls for transactions
 */
export function useTransactions() {
  const transactions = ref([]);
  const summary = ref({ balance: 0, income: 0, expense: 0 });
  const loading = ref(false);
  const error = ref(null);

  const API_URL = '/api/transactions';

  /**
   * Fetch all transactions + summary
   */
  const fetchTransactions = async () => {
    loading.value = true;
    error.value = null;
    try {
      const { data } = await axios.get(API_URL);
      transactions.value = data.data;
      summary.value = data.summary;
    } catch (err) {
      error.value = err.response?.data?.message || 'Gagal memuat transaksi.';
      console.error('fetchTransactions error:', err);
    } finally {
      loading.value = false;
    }
  };

  /**
   * Create a new transaction
   * @param {Object} payload - { description, amount, type, category }
   */
  const createTransaction = async (payload) => {
    loading.value = true;
    error.value = null;
    try {
      await axios.post(API_URL, payload);
      await fetchTransactions(); // refresh list
      return true;
    } catch (err) {
      error.value = err.response?.data?.message || 'Gagal menambah transaksi.';
      console.error('createTransaction error:', err);
      return false;
    } finally {
      loading.value = false;
    }
  };

  /**
   * Delete a transaction
   * @param {number} id
   */
  const deleteTransaction = async (id) => {
    loading.value = true;
    error.value = null;
    try {
      await axios.delete(`${API_URL}/${id}`);
      await fetchTransactions(); // refresh list
      return true;
    } catch (err) {
      error.value = err.response?.data?.message || 'Gagal menghapus transaksi.';
      console.error('deleteTransaction error:', err);
      return false;
    } finally {
      loading.value = false;
    }
  };

  return {
    transactions,
    summary,
    loading,
    error,
    fetchTransactions,
    createTransaction,
    deleteTransaction,
  };
}
