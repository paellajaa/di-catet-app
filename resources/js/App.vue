<template>
  <!-- Blank layout: Landing & Login -->
  <div v-if="isBlankLayout" class="min-h-screen bg-background">
    <router-view />
  </div>

  <!-- App shell -->
  <div v-else class="min-h-screen bg-background flex">

    <!-- Sidebar: DESKTOP ONLY — hidden on everything < 768px -->
    <Sidebar class="hidden md:flex" />

    <!-- Main content: clips horizontal overflow, never scrolls sideways -->
    <div class="flex-1 flex flex-col min-h-screen w-0 overflow-x-hidden">
      <main class="flex-1 pb-36">
        <router-view v-slot="{ Component }">
          <transition name="page" mode="out-in">
            <component :is="Component" @open-modal="showModal = true" />
          </transition>
        </router-view>
      </main>

      <!-- Bottom dock: mobile only -->
      <BottomNavbar @add="showModal = true" class="md:hidden" />
    </div>

    <!-- Global transaction modal -->
    <TransactionModal
      :show="showModal"
      @close="showModal = false"
      @saved="handleSaved"
    />
  </div>
</template>

<script setup>
import { ref, provide, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useTransactions } from './composables/useTransactions';
import { useAuth } from './composables/useAuth';
import BottomNavbar from './components/BottomNavbar.vue';
import Sidebar from './components/Sidebar.vue';
import TransactionModal from './components/TransactionModal.vue';
import axios from 'axios';

const route = useRoute();
const router = useRouter();
const showModal = ref(false);

const isBlankLayout = computed(() => route.meta.layout === 'blank');

const transactionsApi = useTransactions();
provide('transactions', transactionsApi);

const { checkAuth, getToken, removeToken, user } = useAuth();
provide('auth', { user });

onMounted(async () => {
  const token = getToken();
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    await checkAuth();
  }

  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        removeToken();
        delete axios.defaults.headers.common['Authorization'];
        if (router.currentRoute.value.name !== 'login') {
          router.push('/login');
        }
      }
      return Promise.reject(error);
    }
  );
});

const handleSaved = () => {
  showModal.value = false;
  transactionsApi.fetchTransactions();
};
</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: opacity 0.18s ease;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>
