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
          <h1 class="text-2xl font-bold text-text-main">Profil</h1>
          <p class="text-sm text-text-sub mt-0.5">Pengaturan akun Anda</p>
        </div>
        <div class="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center lg:hidden">
          <User :size="18" class="text-primary" />
        </div>
      </div>
    </header>

    <!-- Profile Card -->
    <section class="px-4 py-6 lg:px-8">
      <div class="max-w-md mx-auto lg:mx-0">
        <div class="bg-card border border-border-thin rounded-card p-8 shadow-soft text-center">
          <!-- Avatar -->
          <div class="relative inline-block mb-5">
            <div class="w-24 h-24 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 border-2 border-primary/30 flex items-center justify-center mx-auto">
              <User :size="40" class="text-primary" />
            </div>
            <div class="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-success border-2 border-card flex items-center justify-center">
              <Check :size="14" class="text-white" />
            </div>
          </div>

          <!-- User Info -->
          <h2 class="text-xl font-bold text-text-main mb-1">{{ user?.name || 'User' }}</h2>
          <p class="text-sm text-text-sub mb-6">{{ user?.email || 'user@dicatet.app' }}</p>

          <!-- Stats -->
          <div class="grid grid-cols-3 gap-3 mb-6">
            <div class="bg-background rounded-xl p-3">
              <p class="text-lg font-bold text-text-main">{{ transactions.length }}</p>
              <p class="text-[10px] text-text-sub uppercase font-semibold">Transaksi</p>
            </div>
            <div class="bg-background rounded-xl p-3">
              <p class="text-lg font-bold text-success">{{ incomeCount }}</p>
              <p class="text-[10px] text-text-sub uppercase font-semibold">Masuk</p>
            </div>
            <div class="bg-background rounded-xl p-3">
              <p class="text-lg font-bold text-danger">{{ expenseCount }}</p>
              <p class="text-[10px] text-text-sub uppercase font-semibold">Keluar</p>
            </div>
          </div>
        </div>

        <!-- Settings Menu -->
        <div class="bg-card border border-border-thin rounded-card shadow-soft mt-4 overflow-hidden">
          <div v-for="(item, index) in settingsMenu" :key="item.label">
            <button class="w-full flex items-center gap-3 px-5 py-3.5 hover:bg-white/[0.03] transition-colors text-left">
              <div class="w-9 h-9 rounded-xl flex items-center justify-center" :class="item.bgColor">
                <component :is="item.icon" :size="18" :class="item.iconColor" />
              </div>
              <div class="flex-1">
                <p class="text-sm font-semibold text-text-main">{{ item.label }}</p>
                <p class="text-xs text-text-sub">{{ item.desc }}</p>
              </div>
              <ChevronRight :size="16" class="text-text-sub" />
            </button>
            <div v-if="index < settingsMenu.length - 1" class="h-px bg-border-thin mx-5" />
          </div>
        </div>

        <!-- Logout Button -->
        <button
          id="btn-logout"
          @click="handleLogout"
          :disabled="loading"
          class="w-full mt-4 py-3.5 bg-danger/10 hover:bg-danger/20 border border-danger/20 rounded-card text-sm font-bold text-danger transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50"
        >
          <LogOut :size="18" />
          {{ loading ? 'Keluar...' : 'Keluar' }}
        </button>

        <!-- App Info -->
        <div class="text-center mt-6">
          <p class="text-xs text-text-sub">Di Catet v1.0.0</p>
          <p class="text-[10px] text-text-sub/60 mt-1">Laravel + Vue.js + Tailwind CSS</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { inject, computed, onMounted } from 'vue';
import { Wallet, User, Check, ChevronRight, LogOut, Bell, Palette, Globe, Shield } from 'lucide-vue-next';
import { useAuth } from '../composables/useAuth';

const { transactions, fetchTransactions } = inject('transactions');
const { user, logout, loading } = useAuth();

onMounted(() => { fetchTransactions(); });

const incomeCount = computed(() => transactions.value.filter(tx => tx.type === 'income').length);
const expenseCount = computed(() => transactions.value.filter(tx => tx.type === 'expense').length);

const handleLogout = async () => {
  await logout();
};

const settingsMenu = [
  { icon: Bell, label: 'Notifikasi', desc: 'Atur pengingat transaksi', bgColor: 'bg-yellow-500/15', iconColor: 'text-yellow-400' },
  { icon: Palette, label: 'Tampilan', desc: 'Tema dan preferensi visual', bgColor: 'bg-primary/15', iconColor: 'text-primary' },
  { icon: Globe, label: 'Bahasa', desc: 'Bahasa Indonesia', bgColor: 'bg-success/15', iconColor: 'text-success' },
  { icon: Shield, label: 'Privasi', desc: 'Keamanan dan data', bgColor: 'bg-danger/15', iconColor: 'text-danger' },
];
</script>
