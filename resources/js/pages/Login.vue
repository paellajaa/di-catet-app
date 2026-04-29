<template>
  <div class="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
    <!-- Animated background elements -->
    <div class="absolute inset-0 pointer-events-none overflow-hidden">
      <div class="absolute top-1/4 -left-32 w-96 h-96 bg-primary/8 rounded-full blur-[100px] animate-float" />
      <div class="absolute bottom-1/4 -right-32 w-80 h-80 bg-success/6 rounded-full blur-[100px] animate-float-delayed" />
    </div>

    <div class="w-full max-w-md relative z-10 fade-in">
      <div class="bg-card border border-border-thin rounded-3xl p-8 shadow-soft-lg text-center">
        
        <!-- Logo -->
        <div class="w-16 h-16 bg-primary/15 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Wallet :size="32" class="text-primary" />
        </div>

        <h1 class="text-2xl font-bold text-text-main mb-2">Selamat Datang di Di Catet</h1>
        <p class="text-sm text-text-sub mb-8">Silakan masuk untuk melanjutkan mengelola keuangan Anda dengan lebih pintar.</p>

        <!-- Error Alert -->
        <div v-if="route.query.error" class="mb-6 bg-danger/10 border border-danger/20 rounded-xl p-3 text-sm text-danger text-left flex items-start gap-2">
          <AlertCircle :size="16" class="mt-0.5 shrink-0" />
          <span>Gagal login dengan Google. Silakan coba lagi.</span>
        </div>

        <!-- Google Login Button -->
        <button
          @click="handleLogin"
          :disabled="loading"
          class="w-full relative flex items-center justify-center gap-3 py-3.5 px-4 bg-white hover:bg-gray-50 active:scale-[0.98] rounded-xl text-sm font-bold text-gray-900 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed shadow-sm group"
        >
          <!-- Google SVG Icon -->
          <svg v-if="!loading" class="w-5 h-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          
          <span v-if="loading" class="inline-flex items-center gap-2">
            <svg class="animate-spin h-4 w-4 text-gray-900" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none" />
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Mengalihkan...
          </span>
          <span v-else>Lanjutkan dengan Google</span>
        </button>

        <p class="text-xs text-text-sub mt-6">
          Dengan melanjutkan, Anda menyetujui Ketentuan Layanan dan Kebijakan Privasi kami.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Wallet, AlertCircle } from 'lucide-vue-next';
import { useAuth } from '../composables/useAuth';
import axios from 'axios';

const route = useRoute();
const router = useRouter();
const { loginWithGoogle, checkAuth, loading } = useAuth();

onMounted(async () => {
  // Check if we received a token from the backend redirect
  if (route.query.token) {
    loading.value = true;
    localStorage.setItem('token', route.query.token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${route.query.token}`;
    
    const success = await checkAuth();
    if (success) {
      router.push('/dashboard');
    } else {
      router.replace({ path: '/login', query: { error: 1 } });
    }
    loading.value = false;
  }
});

const handleLogin = () => {
  loginWithGoogle();
};
</script>

<style scoped>
@reference "../../css/app.css";

@keyframes float {
  0%, 100% { transform: translateY(0) scale(1); }
  50% { transform: translateY(-20px) scale(1.05); }
}

@keyframes float-delayed {
  0%, 100% { transform: translateY(0) scale(1); }
  50% { transform: translateY(15px) scale(1.03); }
}

.animate-float {
  animation: float 8s ease-in-out infinite;
}

.animate-float-delayed {
  animation: float-delayed 10s ease-in-out infinite 2s;
}
</style>
