<template>
  <div class="fade-in pb-32">

    <!-- ═══════ HEADER ═══════ -->
    <header class="px-5 pt-8 pb-4">
      <h1 class="text-xl font-semibold text-slate-100 lowercase tracking-tight">laporan</h1>
      <p class="text-xs text-slate-500 mt-0.5">ringkasan keuangan anda</p>
    </header>

    <!-- ═══════ SUMMARY CARDS — vertical stack, NO grid ═══════ -->
    <section class="px-5 pb-4 flex flex-col gap-3">

      <!-- Total Transaksi -->
      <div class="stat-card">
        <p class="stat-label">total transaksi</p>
        <p class="stat-value text-slate-100">{{ transactions.length }}</p>
      </div>

      <!-- Saldo -->
      <div class="stat-card">
        <p class="stat-label">saldo</p>
        <p class="stat-value" style="color: #818cf8;">{{ formatRupiah(summary.balance) }}</p>
      </div>

      <!-- Pemasukan -->
      <div class="stat-card">
        <div class="flex items-center gap-2 mb-2">
          <div class="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0"
               style="background: rgba(134,239,172,0.12);">
            <ArrowUpRight :size="13" style="color: #86efac;" />
          </div>
          <p class="stat-label mb-0">pemasukan</p>
        </div>
        <p class="stat-value" style="color: #86efac;">{{ formatRupiah(summary.income) }}</p>
      </div>

      <!-- Pengeluaran -->
      <div class="stat-card">
        <div class="flex items-center gap-2 mb-2">
          <div class="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0"
               style="background: rgba(253,164,175,0.12);">
            <ArrowDownLeft :size="13" style="color: #fda4af;" />
          </div>
          <p class="stat-label mb-0">pengeluaran</p>
        </div>
        <p class="stat-value" style="color: #fda4af;">{{ formatRupiah(summary.expense) }}</p>
      </div>

    </section>

    <!-- ═══════ EXPENSE BY CATEGORY ═══════ -->
    <section class="px-5 pb-4">
      <div class="section-card">
        <h2 class="section-title">pengeluaran per kategori</h2>

        <!-- Empty -->
        <div v-if="categoryStats.length === 0" class="empty-state">
          <BarChart3 :size="28" class="text-slate-600 mx-auto mb-2" />
          <p class="text-sm text-slate-500">belum ada data pengeluaran.</p>
        </div>

        <!-- Category list -->
        <div v-else class="space-y-5">
          <div v-for="stat in categoryStats" :key="stat.category">

            <!-- Row: icon + name on left, amount on right (wraps if needed) -->
            <div class="flex items-start gap-3 mb-2">
              <!-- Icon -->
              <div class="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                   :style="`background: ${stat.bgRaw};`">
                <component :is="stat.icon" :size="16" :style="`color: ${stat.colorRaw};`" />
              </div>

              <!-- Name + amount stacked -->
              <div class="flex-1 min-w-0">
                <div class="flex flex-wrap items-baseline justify-between gap-x-2 gap-y-0.5">
                  <span class="text-sm font-medium text-slate-200">{{ stat.category }}</span>
                  <span class="text-sm font-semibold break-all"
                        style="color: #fda4af; word-break: break-word; overflow-wrap: anywhere;">
                    {{ formatRupiah(stat.total) }}
                  </span>
                </div>
                <p class="text-xs text-slate-500 mt-0.5">{{ stat.percentage }}% dari total</p>
              </div>
            </div>

            <!-- Progress bar — always full width -->
            <div class="w-full h-2 rounded-full overflow-hidden"
                 style="background: rgba(255,255,255,0.05);">
              <div
                class="h-full rounded-full transition-all duration-700 ease-out"
                :style="`width: ${stat.percentage}%; background: ${stat.colorRaw};`"
              />
            </div>

          </div>
        </div>
      </div>
    </section>

    <!-- ═══════ INCOME BY CATEGORY ═══════ -->
    <section class="px-5 pb-6">
      <div class="section-card">
        <h2 class="section-title">pemasukan per kategori</h2>

        <!-- Empty -->
        <div v-if="incomeStats.length === 0" class="empty-state">
          <TrendingUp :size="28" class="text-slate-600 mx-auto mb-2" />
          <p class="text-sm text-slate-500">belum ada data pemasukan.</p>
        </div>

        <!-- Category list -->
        <div v-else class="space-y-5">
          <div v-for="stat in incomeStats" :key="stat.category">

            <div class="flex items-start gap-3 mb-2">
              <div class="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                   :style="`background: ${stat.bgRaw};`">
                <component :is="stat.icon" :size="16" :style="`color: ${stat.colorRaw};`" />
              </div>

              <div class="flex-1 min-w-0">
                <div class="flex flex-wrap items-baseline justify-between gap-x-2 gap-y-0.5">
                  <span class="text-sm font-medium text-slate-200">{{ stat.category }}</span>
                  <span class="text-sm font-semibold break-all"
                        style="color: #86efac; word-break: break-word; overflow-wrap: anywhere;">
                    {{ formatRupiah(stat.total) }}
                  </span>
                </div>
                <p class="text-xs text-slate-500 mt-0.5">{{ stat.percentage }}% dari total</p>
              </div>
            </div>

            <div class="w-full h-2 rounded-full overflow-hidden"
                 style="background: rgba(255,255,255,0.05);">
              <div
                class="h-full rounded-full transition-all duration-700 ease-out"
                :style="`width: ${stat.percentage}%; background: ${stat.colorRaw};`"
              />
            </div>

          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup>
import { inject, onMounted, computed } from 'vue';
import {
  BarChart3, TrendingUp, ArrowUpRight, ArrowDownLeft,
  Utensils, Car, Gamepad2, Receipt, ShoppingBag,
  HeartPulse, GraduationCap, Gift, Store, ArrowLeftRight,
  Heart, MoreHorizontal, Wallet
} from 'lucide-vue-next';
import { useCurrency } from '../composables/useCurrency';

const { formatRupiah } = useCurrency();
const { transactions, summary, fetchTransactions } = inject('transactions');

onMounted(() => fetchTransactions());

/**
 * Category metadata — colors as raw strings so they work in :style bindings
 * (avoids Tailwind purging dynamic class names)
 */
const categoryMeta = {
  Makanan:      { icon: Utensils,       colorRaw: '#fb923c', bgRaw: 'rgba(251,146,60,0.1)'  },
  Transportasi: { icon: Car,            colorRaw: '#60a5fa', bgRaw: 'rgba(96,165,250,0.1)'  },
  Hiburan:      { icon: Gamepad2,       colorRaw: '#a78bfa', bgRaw: 'rgba(167,139,250,0.1)' },
  Belanja:      { icon: ShoppingBag,    colorRaw: '#f472b6', bgRaw: 'rgba(244,114,182,0.1)' },
  Kesehatan:    { icon: HeartPulse,     colorRaw: '#f87171', bgRaw: 'rgba(248,113,113,0.1)' },
  Pendidikan:   { icon: GraduationCap,  colorRaw: '#818cf8', bgRaw: 'rgba(129,140,248,0.1)' },
  Tagihan:      { icon: Receipt,        colorRaw: '#fbbf24', bgRaw: 'rgba(251,191,36,0.1)'  },
  Gaji:         { icon: Wallet,         colorRaw: '#86efac', bgRaw: 'rgba(134,239,172,0.1)' },
  'Bonus/THR':  { icon: Gift,           colorRaw: '#34d399', bgRaw: 'rgba(52,211,153,0.1)'  },
  Penjualan:    { icon: Store,          colorRaw: '#2dd4bf', bgRaw: 'rgba(45,212,191,0.1)'  },
  Transfer:     { icon: ArrowLeftRight, colorRaw: '#22d3ee', bgRaw: 'rgba(34,211,238,0.1)'  },
  Sosial:       { icon: Heart,          colorRaw: '#fb7185', bgRaw: 'rgba(251,113,133,0.1)' },
  Investasi:    { icon: TrendingUp,     colorRaw: '#38bdf8', bgRaw: 'rgba(56,189,248,0.1)'  },
  Lainnya:      { icon: MoreHorizontal, colorRaw: '#94a3b8', bgRaw: 'rgba(148,163,184,0.1)' },
};

const buildStats = (type) => {
  const filtered = transactions.value.filter(tx => tx.type === type);
  const totalAmount = filtered.reduce((sum, tx) => sum + Number(tx.amount), 0);

  const grouped = {};
  filtered.forEach(tx => {
    grouped[tx.category] = (grouped[tx.category] || 0) + Number(tx.amount);
  });

  return Object.entries(grouped)
    .map(([category, total]) => ({
      category,
      total,
      percentage: totalAmount > 0 ? Math.round((total / totalAmount) * 100) : 0,
      ...(categoryMeta[category] || {
        icon: Receipt,
        colorRaw: '#94a3b8',
        bgRaw: 'rgba(148,163,184,0.1)',
      }),
    }))
    .sort((a, b) => b.total - a.total);
};

const categoryStats = computed(() => buildStats('expense'));
const incomeStats   = computed(() => buildStats('income'));
</script>

<style scoped>
/* ── Stat card: always full-width, grows tall ── */
.stat-card {
  background: #1E293B;
  border: 1px solid #334155;
  border-radius: 1.25rem;
  padding: 1.25rem;
  width: 100%;
  /* Height is auto — grows downward with content */
  height: auto;
  min-height: fit-content;
}

.stat-label {
  font-size: 0.7rem;
  font-weight: 500;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-bottom: 0.5rem;
}

.stat-value {
  /* clamp: 1.5rem on tiny screens → 2rem max */
  font-size: clamp(1.5rem, 5vw, 2rem);
  font-weight: 500;
  letter-spacing: -0.03em;
  line-height: 1.25;
  /* Never overflow — expand the box vertically */
  word-break: break-word;
  overflow-wrap: anywhere;
}

/* ── Section card ── */
.section-card {
  background: #1E293B;
  border: 1px solid #334155;
  border-radius: 1.25rem;
  padding: 1.25rem;
  width: 100%;
}

.section-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: #e2e8f0;
  text-transform: lowercase;
  letter-spacing: -0.01em;
  margin-bottom: 1.25rem;
}

/* ── Empty state ── */
.empty-state {
  text-align: center;
  padding: 2.5rem 0;
}
</style>
