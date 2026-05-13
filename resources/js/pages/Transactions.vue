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
    <section class="px-4 py-4 lg:px-8 space-y-4">
      <!-- Search Bar -->
      <div class="relative w-full">
        <Search :size="16" class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          id="search-input"
          v-model="searchQuery"
          type="text"
          placeholder="Cari transaksi..."
          class="w-full pl-10 pr-4 py-3 bg-[#1E293B] border border-[#334155] rounded-2xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#818cf8]/40 focus:border-[#818cf8] transition-all"
        />
      </div>

      <!-- Type Filters (Pills) -->
      <div class="w-full max-w-full overflow-hidden">
        <div class="flex items-center justify-start gap-2 overflow-x-auto flex-nowrap hide-scrollbar pb-2 pr-10 snap-x snap-mandatory">
          <button
            @click="filterType = 'all'"
            class="filter-pill snap-start"
            :class="filterType === 'all' ? 'active-all' : ''"
          >
            <LayoutGrid :size="14" />
            <span>Semua Tipe</span>
          </button>
          <button
            @click="filterType = 'income'"
            class="filter-pill snap-start"
            :class="filterType === 'income' ? 'active-income' : ''"
          >
            <ArrowUpRight :size="14" />
            <span>Pemasukan</span>
          </button>
          <button
            @click="filterType = 'expense'"
            class="filter-pill snap-start"
            :class="filterType === 'expense' ? 'active-expense' : ''"
          >
            <ArrowDownLeft :size="14" />
            <span>Pengeluaran</span>
          </button>
        </div>
      </div>

      <!-- Category Filters (Pills) -->
      <div class="w-full max-w-full overflow-hidden">
        <div class="flex items-center justify-start gap-2 overflow-x-auto flex-nowrap hide-scrollbar pb-2 pr-10 snap-x snap-mandatory">
          <button
            @click="filterCategory = 'all'"
            class="filter-pill snap-start"
            :class="filterCategory === 'all' ? 'active-all' : ''"
          >
            <LayoutGrid :size="14" />
            <span>Semua Kategori</span>
          </button>
          <button
            v-for="cat in categories"
            :key="cat"
            @click="filterCategory = cat"
            class="filter-pill snap-start"
            :class="filterCategory === cat ? 'active-category' : ''"
          >
            <component :is="getCategoryIcon(cat)" :size="14" />
            <span>{{ cat }}</span>
          </button>
        </div>
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
import { Wallet, User, Search, Trash2, ArrowUpRight, ArrowDownLeft, Utensils, Car, Gamepad2, Briefcase, TrendingUp, Receipt, LayoutGrid } from 'lucide-vue-next';
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

<style scoped>
@reference "../../css/app.css";

/* ── Horizontal Scroll Hiding ── */
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

/* ── Pill Filter Buttons ── */
.filter-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0 1rem;
  min-height: 40px;
  border-radius: 9999px;
  background: transparent;
  border: 1px solid #334155;
  color: #94a3b8;
  font-size: 0.8125rem;
  font-weight: 500;
  white-space: nowrap;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  flex-shrink: 0;
  -webkit-tap-highlight-color: transparent;
}

.filter-pill:active {
  transform: scale(0.95);
}

/* ── Active States ── */
.active-all {
  background: rgba(129, 140, 248, 0.15);
  border-color: #818cf8;
  color: #818cf8;
  box-shadow: 0 0 12px rgba(129, 140, 248, 0.1);
}

.active-income {
  background: rgba(134, 239, 172, 0.15);
  border-color: #86efac;
  color: #86efac;
  box-shadow: 0 0 12px rgba(134, 239, 172, 0.1);
}

.active-expense {
  background: rgba(253, 164, 175, 0.15);
  border-color: #fda4af;
  color: #fda4af;
  box-shadow: 0 0 12px rgba(253, 164, 175, 0.1);
}

.active-category {
  background: rgba(241, 245, 249, 0.1);
  border-color: rgba(241, 245, 249, 0.25);
  color: #f1f5f9;
}
</style>
