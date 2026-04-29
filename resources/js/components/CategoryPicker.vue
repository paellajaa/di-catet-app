<template>
  <div class="relative" ref="pickerRef">
    <!-- Trigger Button -->
    <button
      type="button"
      @click="isOpen = !isOpen"
      class="w-full px-3 py-2.5 bg-background border rounded-xl text-sm flex items-center justify-between transition-all duration-200"
      :class="isOpen ? 'border-primary ring-2 ring-primary/40' : 'border-border-thin hover:border-text-sub/40'"
    >
      <div class="flex items-center gap-2">
        <div v-if="selectedCategory" class="w-6 h-6 rounded flex items-center justify-center bg-primary/20">
          <component :is="selectedCategory.iconComponent" :size="14" class="text-primary" />
        </div>
        <span :class="modelValue ? 'text-text-main font-medium' : 'text-text-sub/50'">
          {{ modelValue || 'Pilih kategori' }}
        </span>
      </div>
      <ChevronDown :size="16" class="text-text-sub transition-transform duration-200" :class="{ 'rotate-180': isOpen }" />
    </button>

    <!-- Dropdown Menu -->
    <Transition name="fade-slide">
      <div
        v-if="isOpen"
        class="absolute z-50 top-full left-0 right-0 mt-2 p-3 bg-[#1E293B] border border-border-thin rounded-xl shadow-xl max-h-64 overflow-y-auto custom-scrollbar"
      >
        <div class="grid grid-cols-2 gap-3">
          <button
            v-for="cat in currentCategories"
            :key="cat.id"
            type="button"
            @click="selectCategory(cat.id)"
            class="flex items-center gap-3 p-2.5 rounded-xl transition-all duration-200 border text-left"
            :class="modelValue === cat.id 
              ? 'border-primary bg-[#312E81]/50 text-text-main shadow-[0_0_10px_rgba(99,102,241,0.2)]' 
              : 'border-transparent bg-background/50 hover:bg-[#312E81] hover:border-[#312E81] text-text-sub hover:text-text-main'"
          >
            <div class="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
                 :class="modelValue === cat.id ? 'bg-primary text-white' : 'bg-white/5'">
              <component :is="cat.iconComponent" :size="16" />
            </div>
            <span class="text-sm font-medium leading-tight">{{ cat.label }}</span>
          </button>
        </div>

        <div v-if="otherCategories.length > 0" class="mt-4 mb-2">
          <p class="text-xs font-semibold text-text-sub px-2 mb-2 uppercase tracking-wider">Lainnya</p>
          <div class="grid grid-cols-2 gap-3">
            <button
              v-for="cat in otherCategories"
              :key="cat.id"
              type="button"
              @click="selectCategory(cat.id)"
              class="flex items-center gap-3 p-2.5 rounded-xl transition-all duration-200 border text-left"
              :class="modelValue === cat.id 
                ? 'border-primary bg-[#312E81]/50 text-text-main shadow-[0_0_10px_rgba(99,102,241,0.2)]' 
                : 'border-transparent bg-background/50 hover:bg-[#312E81] hover:border-[#312E81] text-text-sub hover:text-text-main'"
            >
              <div class="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
                   :class="modelValue === cat.id ? 'bg-primary text-white' : 'bg-white/5'">
                <component :is="cat.iconComponent" :size="16" />
              </div>
              <span class="text-sm font-medium leading-tight">{{ cat.label }}</span>
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import {
  ChevronDown, Utensils, Car, Gamepad2, ShoppingBag, HeartPulse, GraduationCap, Receipt,
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

const isOpen = ref(false);
const pickerRef = ref(null);

const allCategories = [
  // Expense
  { id: 'Makanan', label: 'Makanan', type: 'expense', iconComponent: Utensils },
  { id: 'Transportasi', label: 'Transportasi', type: 'expense', iconComponent: Car },
  { id: 'Hiburan', label: 'Hiburan', type: 'expense', iconComponent: Gamepad2 },
  { id: 'Belanja', label: 'Belanja', type: 'expense', iconComponent: ShoppingBag },
  { id: 'Kesehatan', label: 'Kesehatan', type: 'expense', iconComponent: HeartPulse },
  { id: 'Pendidikan', label: 'Pendidikan', type: 'expense', iconComponent: GraduationCap },
  { id: 'Tagihan', label: 'Tagihan', type: 'expense', iconComponent: Receipt },
  // Income
  { id: 'Gaji', label: 'Gaji', type: 'income', iconComponent: Wallet },
  { id: 'Bonus/THR', label: 'Bonus/THR', type: 'income', iconComponent: Gift },
  { id: 'Penjualan', label: 'Penjualan', type: 'income', iconComponent: Store },
  { id: 'Transfer', label: 'Transfer', type: 'income', iconComponent: ArrowLeftRight },
  // Other
  { id: 'Sosial', label: 'Sosial', type: 'other', iconComponent: Heart },
  { id: 'Investasi', label: 'Investasi', type: 'other', iconComponent: TrendingUp },
  { id: 'Lainnya', label: 'Lainnya', type: 'other', iconComponent: MoreHorizontal },
];

const currentCategories = computed(() => {
  return allCategories.filter(cat => cat.type === props.type);
});

const otherCategories = computed(() => {
  return allCategories.filter(cat => cat.type === 'other');
});

const selectedCategory = computed(() => {
  return allCategories.find(cat => cat.id === props.modelValue);
});

const selectCategory = (id) => {
  emit('update:modelValue', id);
  isOpen.value = false;
};

// Close dropdown when clicking outside
const handleClickOutside = (event) => {
  if (pickerRef.value && !pickerRef.value.contains(event.target)) {
    isOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener('mousedown', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('mousedown', handleClickOutside);
});
</script>

<style scoped>
@reference "../../css/app.css";

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Custom scrollbar for dropdown */
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  @apply bg-transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  @apply bg-border-thin rounded-full;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  @apply bg-text-sub;
}
</style>
