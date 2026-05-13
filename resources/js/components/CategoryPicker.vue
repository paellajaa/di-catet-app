<template>
  <div class="category-grid custom-scrollbar">
    <button
      v-for="cat in availableCategories"
      :key="cat.id"
      type="button"
      @click="selectCategory(cat.id)"
      class="bento-card group"
      :class="{
        'selected-income': modelValue === cat.id && type === 'income',
        'selected-expense': modelValue === cat.id && type === 'expense',
        'unselected': modelValue !== cat.id
      }"
    >
      <div class="icon-wrapper" :style="getIconStyle(cat)">
        <component :is="cat.iconComponent" :size="22" :style="getIconColor(cat)" stroke-width="1.8" />
      </div>
      <span class="category-label" :class="{
        'text-income': modelValue === cat.id && type === 'income',
        'text-expense': modelValue === cat.id && type === 'expense',
        'text-slate-400': modelValue !== cat.id
      }">
        {{ cat.label }}
      </span>
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import {
  Utensils, Car, Gamepad2, ShoppingBag, HeartPulse, GraduationCap, Receipt,
  Wallet, Gift, Store, ArrowLeftRight, Heart, TrendingUp, MoreHorizontal
} from 'lucide-vue-next';

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'expense'
  }
});

const emit = defineEmits(['update:modelValue']);

// Enhanced categories with specific colors for the unselected state
const allCategories = [
  // Expense
  { id: 'Makanan', label: 'makanan', type: 'expense', iconComponent: Utensils, colorRaw: '#fb923c', bgRaw: 'rgba(251,146,60,0.1)' },
  { id: 'Transportasi', label: 'transportasi', type: 'expense', iconComponent: Car, colorRaw: '#60a5fa', bgRaw: 'rgba(96,165,250,0.1)' },
  { id: 'Hiburan', label: 'hiburan', type: 'expense', iconComponent: Gamepad2, colorRaw: '#a78bfa', bgRaw: 'rgba(167,139,250,0.1)' },
  { id: 'Belanja', label: 'belanja', type: 'expense', iconComponent: ShoppingBag, colorRaw: '#f472b6', bgRaw: 'rgba(244,114,182,0.1)' },
  { id: 'Kesehatan', label: 'kesehatan', type: 'expense', iconComponent: HeartPulse, colorRaw: '#f87171', bgRaw: 'rgba(248,113,113,0.1)' },
  { id: 'Pendidikan', label: 'pendidikan', type: 'expense', iconComponent: GraduationCap, colorRaw: '#818cf8', bgRaw: 'rgba(129,140,248,0.1)' },
  { id: 'Tagihan', label: 'tagihan', type: 'expense', iconComponent: Receipt, colorRaw: '#fbbf24', bgRaw: 'rgba(251,191,36,0.1)' },
  // Income
  { id: 'Gaji', label: 'gaji', type: 'income', iconComponent: Wallet, colorRaw: '#86efac', bgRaw: 'rgba(134,239,172,0.1)' },
  { id: 'Bonus/THR', label: 'bonus/thr', type: 'income', iconComponent: Gift, colorRaw: '#34d399', bgRaw: 'rgba(52,211,153,0.1)' },
  { id: 'Penjualan', label: 'penjualan', type: 'income', iconComponent: Store, colorRaw: '#2dd4bf', bgRaw: 'rgba(45,212,191,0.1)' },
  { id: 'Transfer', label: 'transfer', type: 'income', iconComponent: ArrowLeftRight, colorRaw: '#22d3ee', bgRaw: 'rgba(34,211,238,0.1)' },
  // Other (shown in both or depends on logic, for now let's show them in both if needed, but original code separated them. Let's merge "other" into the current type to keep it simple, or just include them in the expense/income lists.)
  { id: 'Sosial', label: 'sosial', type: 'expense', iconComponent: Heart, colorRaw: '#fb7185', bgRaw: 'rgba(251,113,133,0.1)' },
  { id: 'Investasi', label: 'investasi', type: 'expense', iconComponent: TrendingUp, colorRaw: '#38bdf8', bgRaw: 'rgba(56,189,248,0.1)' },
  { id: 'Lainnya', label: 'lainnya', type: 'expense', iconComponent: MoreHorizontal, colorRaw: '#94a3b8', bgRaw: 'rgba(148,163,184,0.1)' },
  { id: 'Lainnya', label: 'lainnya', type: 'income', iconComponent: MoreHorizontal, colorRaw: '#94a3b8', bgRaw: 'rgba(148,163,184,0.1)' },
];

const availableCategories = computed(() => {
  return allCategories.filter(cat => cat.type === props.type);
});

const selectCategory = (id) => {
  emit('update:modelValue', id);
};

const getIconStyle = (cat) => {
  if (props.modelValue === cat.id) {
    return props.type === 'income' 
      ? 'background: rgba(134,239,172,0.15);' 
      : 'background: rgba(253,164,175,0.15);';
  }
  return `background: ${cat.bgRaw};`;
};

const getIconColor = (cat) => {
  if (props.modelValue === cat.id) {
    return props.type === 'income' ? 'color: #86efac;' : 'color: #fda4af;';
  }
  return `color: ${cat.colorRaw};`;
};
</script>

<style scoped>
@reference "../../css/app.css";

.category-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.5rem;
  max-height: 240px; /* limits height, makes it scrollable */
  overflow-y: auto;
  padding-right: 0.25rem;
}

@media (min-width: 640px) {
  .category-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    max-height: 280px;
  }
}

.bento-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 0.5rem;
  border-radius: 1rem;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
}

.bento-card:active {
  transform: scale(0.94);
}

.unselected {
  background: #1E293B;
  border: 1px solid rgba(255, 255, 255, 0.04);
}

.unselected:hover {
  background: rgba(255, 255, 255, 0.04);
  border-color: rgba(255, 255, 255, 0.08);
}

.selected-income {
  background: rgba(134, 239, 172, 0.05);
  border: 1px solid #86efac;
  box-shadow: 0 0 16px rgba(134, 239, 172, 0.15);
}

.selected-expense {
  background: rgba(253, 164, 175, 0.05);
  border: 1px solid #fda4af;
  box-shadow: 0 0 16px rgba(253, 164, 175, 0.15);
}

.icon-wrapper {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.5rem;
  transition: all 0.2s ease;
}

.group:hover .icon-wrapper {
  transform: translateY(-2px) scale(1.05);
}

.category-label {
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: -0.01em;
  text-align: center;
  line-height: 1.1;
  word-break: break-word;
  overflow-wrap: anywhere;
}

.text-income { color: #86efac; }
.text-expense { color: #fda4af; }

/* Custom Scrollbar for tight spaces */
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 999px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.2);
}
</style>
