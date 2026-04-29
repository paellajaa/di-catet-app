<template>
  <div class="fade-in">

    <!-- ═══════ HEADER ═══════ -->
    <header class="px-5 pt-8 pb-4">
      <div class="flex items-center justify-between gap-3">
        <div class="min-w-0">
          <p class="text-xs text-slate-500 mb-0.5 truncate">{{ currentDate }}</p>
          <h1 class="text-xl font-semibold text-slate-100 lowercase tracking-tight">
            halo, {{ firstName }} 👋
          </h1>
        </div>
        <!-- Mobile add shortcut -->
        <button
          @click="$emit('open-modal')"
          class="md:hidden flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
          style="background: rgba(129,140,248,0.15); border: 1px solid rgba(129,140,248,0.25);"
        >
          <Plus :size="18" style="color: #818cf8;" />
        </button>
      </div>
    </header>

    <!-- ═══════ BALANCE CARD ═══════ -->
    <section class="px-5 pb-3">
      <div class="balance-card">
        <p class="balance-label">saldo anda</p>

        <!--
          clamp(): shrinks font from 2rem down to 6vw before wrapping.
          word-break ensures it wraps, never overflows the box.
        -->
        <p class="balance-amount">{{ formatRupiah(summary.balance) }}</p>

        <div class="balance-divider" />

        <!-- Income & Expense — stacked on mobile, side-by-side when space allows -->
        <div class="summary-grid">
          <!-- Income -->
          <div class="summary-item">
            <div class="summary-icon" style="background: rgba(134,239,172,0.1);">
              <ArrowUpRight :size="14" style="color: #86efac;" />
            </div>
            <div class="summary-text">
              <span class="summary-label">pemasukan</span>
              <!--
                No whitespace-nowrap here.
                The amount wraps gracefully if it's long.
              -->
              <span class="summary-amount income">{{ formatRupiah(summary.income) }}</span>
            </div>
          </div>

          <div class="summary-divider" />

          <!-- Expense -->
          <div class="summary-item">
            <div class="summary-icon" style="background: rgba(253,164,175,0.1);">
              <ArrowDownLeft :size="14" style="color: #fda4af;" />
            </div>
            <div class="summary-text">
              <span class="summary-label">pengeluaran</span>
              <span class="summary-amount expense">{{ formatRupiah(summary.expense) }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════ DESKTOP ADD BUTTON ═══════ -->
    <section class="hidden md:block px-5 pb-4">
      <button
        id="desktop-add-btn"
        @click="$emit('open-modal')"
        class="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-semibold text-white lowercase
               transition-all duration-200 hover:brightness-110 active:scale-[0.97]"
        style="background: #818cf8;"
      >
        <Plus :size="16" :stroke-width="2" />
        tambah transaksi
      </button>
    </section>

    <!-- ═══════ TRANSACTION LIST ═══════ -->
    <section class="px-5 pb-6">
      <div class="flex items-center justify-between mb-3">
        <h2 class="text-sm font-semibold text-slate-200 lowercase tracking-tight">
          transaksi terbaru
        </h2>
        <span class="text-xs text-slate-500 flex-shrink-0">{{ transactions.length }} item</span>
      </div>

      <!-- Loading skeleton -->
      <div v-if="loading" class="space-y-2">
        <div
          v-for="i in 5"
          :key="i"
          class="flex items-center gap-3 px-4 py-3.5 rounded-2xl animate-pulse"
          style="background: rgba(30,41,59,0.6);"
        >
          <div class="w-10 h-10 rounded-xl flex-shrink-0" style="background: rgba(255,255,255,0.05);" />
          <div class="flex-1 min-w-0 space-y-2">
            <div class="h-3 rounded" style="background: rgba(255,255,255,0.05); width: 55%;" />
            <div class="h-2 rounded" style="background: rgba(255,255,255,0.04); width: 35%;" />
          </div>
          <div class="h-4 w-20 rounded flex-shrink-0" style="background: rgba(255,255,255,0.04);" />
        </div>
      </div>

      <!-- Empty state -->
      <div
        v-else-if="transactions.length === 0"
        class="flex flex-col items-center justify-center py-12 text-center rounded-2xl"
        style="background: rgba(30,41,59,0.4); border: 1px solid rgba(255,255,255,0.04);"
      >
        <div
          class="w-12 h-12 rounded-2xl flex items-center justify-center mb-3"
          style="background: rgba(129,140,248,0.1);"
        >
          <Receipt :size="22" style="color: #818cf8;" />
        </div>
        <p class="text-sm font-medium text-slate-300 mb-1 lowercase">belum ada transaksi</p>
        <p class="text-xs text-slate-500">mulai catat keuangan anda</p>
      </div>

      <!-- Transaction rows -->
      <TransitionGroup
        v-else
        name="list"
        tag="div"
        class="space-y-1"
      >
        <div
          v-for="tx in transactions"
          :key="tx.id"
          class="tx-row group"
        >
          <div class="flex items-center gap-3 px-4 py-3.5">
            <!-- Icon — fixed size, never shrinks -->
            <div
              class="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              :style="tx.type === 'income'
                ? 'background: rgba(134,239,172,0.08);'
                : 'background: rgba(253,164,175,0.08);'"
            >
              <component
                :is="getCategoryIcon(tx.category)"
                :size="18"
                :stroke-width="1.6"
                :style="tx.type === 'income' ? 'color: #86efac;' : 'color: #fda4af;'"
              />
            </div>

            <!-- Description & category — fills remaining space, clips text -->
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-slate-200 truncate">{{ tx.description }}</p>
              <p class="text-xs text-slate-500 mt-0.5 truncate">
                {{ tx.category }} · {{ formatDate(tx.created_at) }}
              </p>
            </div>

            <!-- Amount — wraps if needed, NEVER overflows -->
            <div class="flex items-center gap-1 flex-shrink-0 ml-1">
              <span
                class="tx-amount"
                :style="tx.type === 'income' ? 'color: #86efac;' : 'color: #fda4af;'"
              >
                {{ tx.type === 'income' ? '+' : '-' }}{{ formatRupiah(tx.amount) }}
              </span>
              <button
                :id="`delete-tx-${tx.id}`"
                @click.stop="handleDelete(tx.id)"
                class="w-8 h-8 rounded-xl flex items-center justify-center
                       opacity-0 group-hover:opacity-100
                       transition-opacity duration-150 flex-shrink-0"
                style="color: #fda4af;"
                title="Hapus"
              >
                <Trash2 :size="14" />
              </button>
            </div>
          </div>
        </div>
      </TransitionGroup>
    </section>

  </div>
</template>

<script setup>
import { inject, onMounted, computed } from 'vue';
import {
  ArrowUpRight, ArrowDownLeft, Plus,
  Receipt, Trash2, Utensils, Car, Gamepad2, Wallet,
  ShoppingBag, HeartPulse, GraduationCap, Gift, Store,
  ArrowLeftRight, Heart, MoreHorizontal, TrendingUp
} from 'lucide-vue-next';
import { useCurrency } from '../composables/useCurrency';

defineEmits(['open-modal']);

const { formatRupiah, formatShort } = useCurrency();
const { user } = inject('auth');
const { transactions, summary, loading, fetchTransactions, deleteTransaction } = inject('transactions');

onMounted(() => fetchTransactions());

const firstName = computed(() => {
  const name = user.value?.name;
  return name ? name.split(' ')[0].toLowerCase() : 'user';
});

const currentDate = computed(() => {
  return new Date().toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });
});

const getCategoryIcon = (category) => {
  const map = {
    Makanan: Utensils,
    Transportasi: Car,
    Hiburan: Gamepad2,
    Belanja: ShoppingBag,
    Kesehatan: HeartPulse,
    Pendidikan: GraduationCap,
    Tagihan: Receipt,
    Gaji: Wallet,
    'Bonus/THR': Gift,
    Penjualan: Store,
    Transfer: ArrowLeftRight,
    Sosial: Heart,
    Investasi: TrendingUp,
    Lainnya: MoreHorizontal,
  };
  return map[category] || Receipt;
};

const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
  });
};

const handleDelete = async (id) => {
  if (confirm('Yakin ingin menghapus transaksi ini?')) {
    await deleteTransaction(id);
  }
};
</script>

<style scoped>
/* ── Balance Card ── */
.balance-card {
  background: #1E293B;
  border: 1px solid #334155;
  border-radius: 1.5rem;
  padding: 1.5rem;
}

.balance-label {
  font-size: 0.75rem;
  font-weight: 500;
  color: #64748b;
  margin-bottom: 0.5rem;
  text-transform: lowercase;
}

.balance-amount {
  /*
    clamp: min 1.75rem, preferred 6vw, max 2.25rem.
    This makes the number shrink on small screens automatically.
    word-break: break-word lets it wrap to a new line if still too long.
  */
  font-size: clamp(1.75rem, 6vw, 2.25rem);
  font-weight: 500;
  color: #f1f5f9;
  letter-spacing: -0.03em;
  line-height: 1.2;
  word-break: break-word;
  overflow-wrap: anywhere;
  margin-bottom: 1.25rem;
}

.balance-divider {
  width: 100%;
  height: 1px;
  background: rgba(255, 255, 255, 0.06);
  margin-bottom: 1rem;
}

/* ── Summary grid: two columns when there is room, one column otherwise ── */
.summary-grid {
  display: flex;
  flex-wrap: wrap;       /* wraps to next line if columns are too narrow */
  gap: 0.75rem;
  align-items: flex-start;
}

.summary-item {
  display: flex;
  align-items: flex-start;
  gap: 0.625rem;
  flex: 1 1 120px;       /* grow, shrink, basis 120px — wraps below that */
  min-width: 0;
}

.summary-icon {
  width: 28px;
  height: 28px;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-top: 2px;
}

.summary-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.summary-label {
  font-size: 10px;
  font-weight: 500;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.summary-amount {
  /* No whitespace-nowrap — wraps if needed */
  font-size: 0.9rem;
  font-weight: 600;
  letter-spacing: -0.02em;
  line-height: 1.3;
  word-break: break-word;
  overflow-wrap: anywhere;
}

.summary-amount.income { color: #86efac; }
.summary-amount.expense { color: #fda4af; }

.summary-divider {
  width: 1px;
  align-self: stretch;
  background: rgba(255, 255, 255, 0.06);
  flex-shrink: 0;
}

/* ── Transaction row ── */
.tx-row {
  border-radius: 1rem;
  transition: background 0.12s ease;
}
.tx-row:hover {
  background: rgba(255, 255, 255, 0.025);
}
.tx-row:active {
  background: rgba(255, 255, 255, 0.04);
}

/* ── Transaction amount — responsive size, wrappable ── */
.tx-amount {
  font-size: clamp(0.75rem, 3vw, 0.875rem);
  font-weight: 600;
  letter-spacing: -0.01em;
  /* Allow wrapping — NO whitespace-nowrap */
  word-break: break-word;
  overflow-wrap: anywhere;
  text-align: right;
  max-width: 120px;  /* hard cap before wrapping */
  line-height: 1.3;
}

/* ── List transitions ── */
.list-enter-active { transition: all 0.25s ease; }
.list-leave-active  { transition: all 0.18s ease; }
.list-enter-from    { opacity: 0; transform: translateY(6px); }
.list-leave-to      { opacity: 0; }
.list-move          { transition: transform 0.25s ease; }
</style>
