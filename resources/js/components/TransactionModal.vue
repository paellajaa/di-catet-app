<template>
  <!-- Modal Backdrop -->
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="show"
        class="fixed inset-0 z-[100] flex items-end lg:items-center justify-center"
        @click.self="$emit('close')"
      >
        <!-- Overlay -->
        <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="$emit('close')" />

        <!-- Modal Content -->
        <div class="relative w-full max-w-md bg-card rounded-t-3xl lg:rounded-2xl border border-border-thin shadow-soft-lg p-6 scale-in z-10">
          <!-- Handle bar (mobile) -->
          <div class="lg:hidden w-10 h-1 bg-border-thin rounded-full mx-auto mb-4" />

          <!-- Header -->
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-lg font-bold text-text-main">Tambah Transaksi</h2>
            <button
              id="modal-close"
              @click="$emit('close')"
              class="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
            >
              <X :size="18" class="text-text-sub" />
            </button>
          </div>

          <!-- Form -->
          <form @submit.prevent="handleSubmit" class="space-y-4">
            <!-- Type Toggle -->
            <div class="flex gap-2 p-1 bg-background rounded-xl">
              <button
                type="button"
                @click="form.type = 'expense'"
                class="flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200"
                :class="form.type === 'expense'
                  ? 'bg-danger/15 text-danger shadow-sm'
                  : 'text-text-sub hover:text-text-main'"
              >
                <ArrowDownLeft :size="16" class="inline mr-1 -mt-0.5" />
                Pengeluaran
              </button>
              <button
                type="button"
                @click="form.type = 'income'"
                class="flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200"
                :class="form.type === 'income'
                  ? 'bg-success/15 text-success shadow-sm'
                  : 'text-text-sub hover:text-text-main'"
              >
                <ArrowUpRight :size="16" class="inline mr-1 -mt-0.5" />
                Pemasukan
              </button>
            </div>

            <!-- Description -->
            <div>
              <label for="description" class="block text-sm font-medium text-text-sub mb-1.5">Deskripsi</label>
              <input
                id="description"
                v-model="form.description"
                type="text"
                placeholder="Contoh: Makan siang"
                required
                class="input-field"
              />
            </div>

            <!-- Amount -->
            <div>
              <label for="amount" class="block text-sm font-medium text-text-sub mb-1.5">Nominal (Rp)</label>
              <div class="relative">
                <span class="absolute left-3 top-1/2 -translate-y-1/2 text-text-sub text-sm font-medium">Rp</span>
                <input
                  id="amount"
                  v-model="form.amount"
                  type="number"
                  min="1"
                  step="1"
                  placeholder="0"
                  required
                  class="input-field !pl-10"
                />
              </div>
            </div>

            <!-- Category -->
            <div class="relative z-50">
              <label class="block text-sm font-medium text-text-sub mb-1.5">Kategori</label>
              <CategoryPicker v-model="form.category" :type="form.type" />
            </div>

            <!-- Error Message -->
            <p v-if="errorMsg" class="text-sm text-danger bg-danger/10 px-3 py-2 rounded-lg">
              {{ errorMsg }}
            </p>

            <!-- Submit -->
            <button
              id="modal-submit"
              type="submit"
              :disabled="submitting"
              class="w-full py-3 bg-primary hover:bg-primary/90 active:scale-[0.98] rounded-xl text-sm font-bold text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span v-if="submitting" class="inline-flex items-center gap-2">
                <svg class="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none" />
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Menyimpan...
              </span>
              <span v-else>Simpan Transaksi</span>
            </button>
          </form>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, reactive, inject, watch } from 'vue';
import { X, ArrowUpRight, ArrowDownLeft } from 'lucide-vue-next';
import CategoryPicker from './CategoryPicker.vue';

const props = defineProps({
  show: Boolean,
});

const emit = defineEmits(['close', 'saved']);

const { createTransaction } = inject('transactions');

const form = reactive({
  description: '',
  amount: '',
  type: 'expense',
  category: '',
});

const submitting = ref(false);
const errorMsg = ref('');

// Reset form when modal opens
watch(() => props.show, (val) => {
  if (val) {
    form.description = '';
    form.amount = '';
    form.type = 'expense';
    form.category = '';
    errorMsg.value = '';
  }
});

const handleSubmit = async () => {
  submitting.value = true;
  errorMsg.value = '';

  const success = await createTransaction({
    description: form.description,
    amount: Number(form.amount),
    type: form.type,
    category: form.category,
  });

  submitting.value = false;

  if (success) {
    emit('saved');
  } else {
    errorMsg.value = 'Gagal menyimpan. Periksa kembali data Anda.';
  }
};
</script>

<style scoped>
@reference "../../css/app.css";

.input-field {
  @apply w-full px-3 py-2.5 bg-background border border-border-thin rounded-xl text-sm text-text-main placeholder-text-sub/50 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all duration-200;
}

/* Modal transition */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.25s ease;
}

.modal-enter-active .relative,
.modal-leave-active .relative {
  transition: transform 0.25s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .relative {
  transform: translateY(100%);
}

.modal-leave-to .relative {
  transform: translateY(100%);
}

@media (min-width: 1024px) {
  .modal-enter-from .relative {
    transform: scale(0.95);
  }

  .modal-leave-to .relative {
    transform: scale(0.95);
  }
}
</style>
