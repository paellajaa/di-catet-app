<template>
  <aside class="sidebar-rail">
    <!-- Logo -->
    <div class="pt-6 pb-8 flex justify-center">
      <router-link to="/" class="group" title="Di Catet">
        <div class="w-10 h-10 rounded-2xl bg-accent/10 flex items-center justify-center
                    group-hover:bg-accent/15 transition-colors duration-200">
          <Wallet :size="20" class="text-accent" />
        </div>
      </router-link>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 flex flex-col items-center gap-1 px-2">
      <router-link
        v-for="item in menuItems"
        :key="item.to"
        :id="`sidebar-${item.id}`"
        :to="item.to"
        custom
        v-slot="{ navigate, isActive }"
      >
        <button
          @click="navigate"
          class="sidebar-btn"
          :class="{ active: isActive }"
          :title="item.label"
        >
          <component :is="item.icon" :size="20" :stroke-width="isActive ? 2 : 1.5" />
        </button>
      </router-link>
    </nav>

    <!-- User -->
    <div class="pb-6 flex justify-center">
      <router-link to="/profil" custom v-slot="{ navigate }">
        <button @click="navigate" class="group" title="Profil">
          <div class="w-10 h-10 rounded-full bg-surface border border-white/[0.06]
                      flex items-center justify-center
                      group-hover:border-accent/30 transition-colors duration-200">
            <User :size="18" class="text-text-sub group-hover:text-accent transition-colors" />
          </div>
        </button>
      </router-link>
    </div>
  </aside>
</template>

<script setup>
import { inject } from 'vue';
import { Home, Receipt, BarChart3, User, Wallet } from 'lucide-vue-next';

const { user } = inject('auth');

const menuItems = [
  { id: 'home', to: '/dashboard', label: 'Dashboard', icon: Home },
  { id: 'transactions', to: '/transaksi', label: 'Transaksi', icon: Receipt },
  { id: 'reports', to: '/laporan', label: 'Laporan', icon: BarChart3 },
  { id: 'profile', to: '/profil', label: 'Profil', icon: User },
];
</script>

<style scoped>
@reference "../../css/app.css";

.sidebar-rail {
  @apply w-[72px] flex flex-col h-screen sticky top-0 bg-background;
  border-right: 1px solid rgba(255, 255, 255, 0.04);
}

.sidebar-btn {
  @apply relative w-11 h-11 rounded-xl flex items-center justify-center
         text-text-sub transition-all duration-200;
}
.sidebar-btn:hover {
  @apply text-text-main;
  background: rgba(255, 255, 255, 0.04);
}
.sidebar-btn.active {
  @apply text-accent;
  background: rgba(129, 140, 248, 0.1);
}
</style>
