<template>
  <nav class="dock-wrapper">
    <div class="dock">

      <!-- Home -->
      <router-link id="nav-home" to="/dashboard" custom v-slot="{ navigate, isActive }">
        <button @click="navigate" class="dock-btn" :class="{ active: isActive }" aria-label="Dashboard">
          <Home :size="22" :stroke-width="isActive ? 2 : 1.6" />
          <span class="dock-label">home</span>
        </button>
      </router-link>

      <!-- Transaksi -->
      <router-link id="nav-transactions" to="/transaksi" custom v-slot="{ navigate, isActive }">
        <button @click="navigate" class="dock-btn" :class="{ active: isActive }" aria-label="Transaksi">
          <Receipt :size="22" :stroke-width="isActive ? 2 : 1.6" />
          <span class="dock-label">transaksi</span>
        </button>
      </router-link>

      <!-- FAB: Add -->
      <button
        id="nav-add"
        @click="$emit('add')"
        class="dock-fab"
        aria-label="Tambah transaksi"
      >
        <Plus :size="24" :stroke-width="2" />
      </button>

      <!-- Laporan -->
      <router-link id="nav-reports" to="/laporan" custom v-slot="{ navigate, isActive }">
        <button @click="navigate" class="dock-btn" :class="{ active: isActive }" aria-label="Laporan">
          <BarChart3 :size="22" :stroke-width="isActive ? 2 : 1.6" />
          <span class="dock-label">laporan</span>
        </button>
      </router-link>

      <!-- Profil -->
      <router-link id="nav-profile" to="/profil" custom v-slot="{ navigate, isActive }">
        <button @click="navigate" class="dock-btn" :class="{ active: isActive }" aria-label="Profil">
          <User :size="22" :stroke-width="isActive ? 2 : 1.6" />
          <span class="dock-label">profil</span>
        </button>
      </router-link>

    </div>
  </nav>
</template>

<script setup>
import { Home, Receipt, Plus, BarChart3, User } from 'lucide-vue-next';
defineEmits(['add']);
</script>

<style scoped>
@reference "../../css/app.css";

/* ── Wrapper: full-width, centers the dock ── */
.dock-wrapper {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 50;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  /* 20px gap from bottom + iPhone home indicator clearance */
  padding-bottom: max(20px, env(safe-area-inset-bottom, 20px));
  padding-left: 1.25rem;
  padding-right: 1.25rem;
  pointer-events: none;
}

/* ── The dock pill ── */
.dock {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 360px;
  padding: 0.5rem 0.875rem;
  border-radius: 9999px;
  pointer-events: auto;

  background: rgba(15, 23, 42, 0.88);
  backdrop-filter: blur(20px) saturate(1.3);
  -webkit-backdrop-filter: blur(20px) saturate(1.3);
  border: 1px solid rgba(255, 255, 255, 0.07);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.4),
              inset 0 1px 0 rgba(255, 255, 255, 0.04);
}

/* ── Regular nav button ── */
.dock-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3px;
  min-width: 44px;
  min-height: 52px;
  padding: 0.375rem 0.625rem;
  border-radius: 9999px;
  color: #64748b; /* slate-500 */
  transition: color 0.15s ease, background 0.15s ease;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
}
.dock-btn:hover {
  color: #94a3b8;
  background: rgba(255, 255, 255, 0.04);
}
.dock-btn.active {
  color: #818cf8; /* indigo accent */
}

/* ── Label under icon ── */
.dock-label {
  font-size: 9px;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  letter-spacing: 0.02em;
  line-height: 1;
}

/* ── FAB: center add button ── */
.dock-fab {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 9999px;
  background: #818cf8; /* indigo */
  color: #fff;
  flex-shrink: 0;
  transition: transform 0.15s ease, filter 0.15s ease;
  -webkit-tap-highlight-color: transparent;
  box-shadow: 0 2px 12px rgba(129, 140, 248, 0.35);
}
.dock-fab:hover {
  filter: brightness(1.1);
}
.dock-fab:active {
  transform: scale(0.93);
}
</style>
