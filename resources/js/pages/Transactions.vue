<template>
  <div class="fade-in">
    <!-- Header -->
    <header class="px-4 pt-6 pb-2 lg:px-8 lg:pt-8">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2 lg:hidden">
          <Wallet :size="24" class="text-primary" />
          <h1 class="text-xl font-bold text-primary tracking-tight">Di Catet</h1>
        </div>
        <div class="hidden lg:block">
          <h1 class="text-2xl font-bold text-text-main">Transaksi</h1>
          <p class="text-sm text-text-sub mt-0.5">Riwayat semua transaksi Anda</p>
        </div>
        <div class="flex items-center gap-2">
          <span class="text-sm font-medium text-text-sub hidden sm:inline">Halo, {{ user?.name ? user.name.split(' ')[0] : 'User' }}</span>
          <div class="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center">
            <User :size="18" class="text-primary" />
          </div>
        </div>
      </div>
    </header>

    <!-- Search & Filter -->
    <section class="px-4 py-4 lg:px-8">
      <div class="flex flex-col sm:flex-row gap-3">
        <div class="relative flex-1">
          <Search :size="16" class="absolute left-3 top-1/2 -translate-y-1/2 text-text-sub" />
          <input
            id="search-input"
            v-model="searchQuery"
            type="text"
            placeholder="Cari transaksi..."
            class="w-full pl-10 pr-4 py-2.5 bg-card border border-border-thin rounded-xl text-sm text-text-main placeholder-text-sub/50 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
          />
        </div>
        <select
          id="filter-type"
          v-model="filterType"
          class="px-4 py-2.5 bg-card border border-border-thin rounded-xl text-sm text-text-main focus:outline-none focus:ring-2 focus:ring-primary/40 cursor-pointer"
        >
          <option value="all">Semua Tipe</option>
          <option value="income">Pemasukan</option>
          <option value="expense">Pengeluaran</option>
        </select>
        <select
          id="filter-category"
          v-model="filterCategory"
          class="px-4 py-2.5 bg-card border border-border-thin rounded-xl text-sm text-text-main focus:outline-none focus:ring-2 focus:ring-primary/40 cursor-pointer"
        >
          <option value="all">Semua Kategori</option>
          <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
        </select>
      </div>
    </section>

    <!-- Results Count -->
    <section class="px-4 lg:px-8 pb-2">
      <p class="text-xs text-text-sub font-medium">
        Menampilkan {{ filteredTransactions.length }} dari {{ transactions.length }} transaksi
      </p>
    </section>

    <!-- Transaction Table (Desktop) / List (Mobile) -->
    <section class="px-4 pb-8 lg:px-8">
      <!-- Desktop Table -->
      <div class="hidden lg:block bg-card border border-border-thin rounded-card shadow-soft overflow-hidden">
        <table class="w-full">
          <thead>
            <tr class="border-b border-border-thin">
              <th class="text-left text-xs font-semibold text-text-sub uppercase tracking-wider px-5 py-3.5">Tanggal</th>
              <th class="text-left text-xs font-semibold text-text-sub uppercase tracking-wider px-5 py-3.5">Deskripsi</th>
              <th class="text-left text-xs font-semibold text-text-sub uppercase tracking-wider px-5 py-3.5">Kategori</th>
              <th class="text-left text-xs font-semibold text-text-sub uppercase tracking-wider px-5 py-3.5">Tipe</th>
              <th class="text-right text-xs font-semibold text-text-sub uppercase tracking-wider px-5 py-3.5">Nominal</th>
              <th class="text-center text-xs font-semibold text-text-sub uppercase tracking-wider px-5 py-3.5">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-border-thin">
            <tr
              v-for="tx in filteredTransactions"
              :key="tx.id"
              class="hover:bg-white/[0.02] transition-colors group"
            >
              <td class="px-5 py-3.5 text-sm text-text-sub whitespace-nowrap">{{ formatDate(tx.created_at) }}</td>
              <td class="px-5 py-3.5 text-sm font-semibold text-text-main">{{ tx.description }}</td>
              <td class="px-5 py-3.5">
                <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium" :class="getCategoryBadge(tx.category)">
                  <component :is="getCategoryIcon(tx.category)" :size="12" />
                  {{ tx.category }}
                </span>
              </td>
              <td class="px-5 py-3.5">
                <span
                  class="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold"
                  :class="tx.type === 'income' ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'"
                >
                  <component :is="tx.type === 'income' ? ArrowUpRight : ArrowDownLeft" :size="12" />
                  {{ tx.type === 'income' ? 'Masuk' : 'Keluar' }}
                </span>
              </td>
              <td class="px-5 py-3.5 text-right text-sm font-bold whitespace-nowrap" :class="tx.type === 'income' ? 'text-success' : 'text-danger'">
                {{ tx.type === 'income' ? '+' : '-' }}{{ formatRupiah(tx.amount) }}
              </td>
              <td class="px-5 py-3.5 text-center">
                <button
                  @click="handleDelete(tx.id)"
                  class="w-8 h-8 rounded-lg flex items-center justify-center mx-auto opacity-0 group-hover:opacity-100 hover:bg-danger/15 transition-all"
                  title="Hapus"
                >
                  <Trash2 :size="14" class="text-danger" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Empty filtered -->
        <div v-if="filteredTransactions.length === 0" class="p-8 text-center">
          <Search :size="32" class="text-text-sub/40 mx-auto mb-3" />
          <p class="text-sm text-text-sub">Tidak ada transaksi yang cocok.</p>
        </div>
      </div>

      <!-- Mobile List -->
      <div class="lg:hidden bg-card border border-border-thin rounded-card shadow-soft overflow-hidden">
        <div v-if="filteredTransactions.length === 0" class="p-8 text-center">
          <Search :size="32" class="text-text-sub/40 mx-auto mb-3" />
          <p class="text-sm text-text-sub">Tidak ada transaksi yang cocok.</p>
        </div>
        <div v-else>
          <div
            v-for="(tx, index) in filteredTransactions"
            :key="tx.id"
            class="group"
          >
            <div class="flex items-center gap-3 px-4 py-3.5 hover:bg-white/[0.03] transition-colors">
              <div class="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" :class="tx.type === 'income' ? 'bg-success/12' : 'bg-danger/12'">
                <component :is="getCategoryIcon(tx.category)" :size="20" :class="tx.type === 'income' ? 'text-success' : 'text-danger'" />
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-semibold text-text-main truncate">{{ tx.description }}</p>
                <p class="text-xs text-text-sub mt-0.5">{{ tx.category }} · {{ formatDate(tx.created_at) }}</p>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-sm font-bold whitespace-nowrap" :class="tx.type === 'income' ? 'text-success' : 'text-danger'">
                  {{ tx.type === 'income' ? '+' : '-' }}{{ formatRupiah(tx.amount) }}
                </span>
                <button @click="handleDelete(tx.id)" class="w-7 h-7 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-danger/15 transition-all" title="Hapus">
                  <Trash2 :size="14" class="text-danger" />
                </button>
              </div>
            </div>
            <div v-if="index < filteredTransactions.length - 1" class="h-px bg-border-thin mx-4" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, inject, onMounted } from 'vue';
import { Wallet, User, Search, Trash2, ArrowUpRight, ArrowDownLeft, Utensils, Car, Gamepad2, Briefcase, TrendingUp, Receipt } from 'lucide-vue-next';
import { useCurrency } from '../composables/useCurrency';

const { formatRupiah } = useCurrency();
const { transactions, fetchTransactions, deleteTransaction } = inject('transactions');
const { user } = inject('auth');

const searchQuery = ref('');
const filterType = ref('all');
const filterCategory = ref('all');
const categories = ['Makanan', 'Transportasi', 'Hiburan', 'Gaji', 'Investasi'];

onMounted(() => { fetchTransactions(); });

const filteredTransactions = computed(() => {
  return transactions.value.filter(tx => {
    const matchSearch = !searchQuery.value || tx.description.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchType = filterType.value === 'all' || tx.type === filterType.value;
    const matchCategory = filterCategory.value === 'all' || tx.category === filterCategory.value;
    return matchSearch && matchType && matchCategory;
  });
});

const getCategoryIcon = (category) => {
  const map = { Makanan: Utensils, Transportasi: Car, Hiburan: Gamepad2, Gaji: Briefcase, Investasi: TrendingUp };
  return map[category] || Receipt;
};

const getCategoryBadge = (category) => {
  const map = {
    Makanan: 'bg-orange-500/10 text-orange-400',
    Transportasi: 'bg-blue-500/10 text-blue-400',
    Hiburan: 'bg-purple-500/10 text-purple-400',
    Gaji: 'bg-success/10 text-success',
    Investasi: 'bg-cyan-500/10 text-cyan-400',
  };
  return map[category] || 'bg-text-sub/10 text-text-sub';
};

const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });

const handleDelete = async (id) => {
  if (confirm('Yakin ingin menghapus transaksi ini?')) await deleteTransaction(id);
};
</script>
