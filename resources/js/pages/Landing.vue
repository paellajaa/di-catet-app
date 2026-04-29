<template>
  <div class="min-h-screen bg-background flex flex-col relative overflow-hidden">
    <div class="absolute inset-0 pointer-events-none overflow-hidden">
      <div class="absolute top-1/4 -left-32 w-96 h-96 bg-primary/8 rounded-full blur-[100px] animate-float" />
      <div class="absolute bottom-1/4 -right-32 w-80 h-80 bg-success/6 rounded-full blur-[100px] animate-float-delayed" />
    </div>

    <header class="relative z-10 px-6 py-5 lg:px-12 lg:py-6">
      <div class="max-w-6xl mx-auto flex items-center justify-between">
        <div class="flex items-center gap-2.5">
          <div class="w-9 h-9 bg-primary/15 rounded-xl flex items-center justify-center">
            <Wallet :size="20" class="text-primary" />
          </div>
          <span class="text-lg font-bold text-primary tracking-tight">Di Catet</span>
        </div>
        <router-link to="/dashboard" class="text-sm font-medium text-text-sub hover:text-text-main transition-colors">
          Masuk →
        </router-link>
      </div>
    </header>

    <main class="relative z-10 flex-1 flex items-center">
      <div class="max-w-6xl mx-auto px-6 lg:px-12 py-12 lg:py-0 w-full">
        <div class="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div class="space-y-8 fade-in">
            <div class="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 border border-primary/20 rounded-full">
              <div class="w-1.5 h-1.5 bg-success rounded-full animate-pulse" />
              <span class="text-xs font-semibold text-primary tracking-wide">GRATIS & TANPA IKLAN</span>
            </div>

            <div class="space-y-4">
              <h1 class="text-4xl lg:text-6xl font-extrabold text-text-main leading-[1.1] tracking-tight">
                Kelola Uang
                <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary via-indigo-400 to-purple-400">Lebih Pintar</span>
                <br />dengan Di Catet
              </h1>
              <p class="text-lg lg:text-xl text-text-sub max-w-lg leading-relaxed">
                Catat pemasukan & pengeluaran harian Anda dalam satu aplikasi yang simpel, cepat, dan elegan.
              </p>
            </div>

            <div class="flex flex-wrap items-center gap-4">
              <router-link id="cta-dashboard" to="/dashboard" class="inline-flex items-center gap-2.5 px-7 py-3.5 bg-primary hover:bg-primary/90 active:scale-[0.97] rounded-2xl text-base font-bold text-white shadow-glow-primary transition-all duration-200">
                <Rocket :size="20" />
                Buka Dashboard
              </router-link>
              <a href="#features" class="inline-flex items-center gap-2 px-6 py-3.5 bg-white/5 hover:bg-white/10 border border-border-thin rounded-2xl text-sm font-semibold text-text-main transition-all duration-200">
                Lihat Fitur
                <ArrowDown :size="16" />
              </a>
            </div>

            <div class="flex items-center gap-8 pt-2">
              <div>
                <p class="text-2xl font-bold text-text-main">100%</p>
                <p class="text-xs text-text-sub font-medium">Gratis</p>
              </div>
              <div class="w-px h-10 bg-border-thin" />
              <div>
                <p class="text-2xl font-bold text-text-main">5</p>
                <p class="text-xs text-text-sub font-medium">Kategori</p>
              </div>
              <div class="w-px h-10 bg-border-thin" />
              <div>
                <p class="text-2xl font-bold text-text-main">∞</p>
                <p class="text-xs text-text-sub font-medium">Transaksi</p>
              </div>
            </div>
          </div>

          <!-- Right: Preview Card -->
          <div class="hidden lg:block slide-up">
            <div class="relative">
              <div class="absolute inset-0 bg-primary/10 rounded-3xl blur-2xl scale-95" />
              <div class="relative bg-card border border-border-thin rounded-3xl p-6 shadow-soft-lg space-y-5">
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-2">
                    <div class="w-8 h-8 bg-primary/15 rounded-lg flex items-center justify-center">
                      <Wallet :size="16" class="text-primary" />
                    </div>
                    <span class="text-sm font-bold text-primary">Di Catet</span>
                  </div>
                  <div class="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center">
                    <User :size="14" class="text-primary" />
                  </div>
                </div>
                <div class="bg-gradient-to-br from-primary/15 via-card to-card border border-primary/15 rounded-2xl p-5">
                  <p class="text-xs text-text-sub mb-1">Saldo Anda</p>
                  <p class="text-2xl font-extrabold text-white">Rp 4.250.000</p>
                </div>
                <div class="grid grid-cols-2 gap-3">
                  <div class="bg-background border border-border-thin rounded-xl p-3">
                    <div class="flex items-center gap-1.5 mb-2">
                      <ArrowUpRight :size="14" class="text-success" />
                      <span class="text-[10px] text-text-sub uppercase font-semibold">Pemasukan</span>
                    </div>
                    <p class="text-sm font-bold text-success">Rp 7.500.000</p>
                  </div>
                  <div class="bg-background border border-border-thin rounded-xl p-3">
                    <div class="flex items-center gap-1.5 mb-2">
                      <ArrowDownLeft :size="14" class="text-danger" />
                      <span class="text-[10px] text-text-sub uppercase font-semibold">Pengeluaran</span>
                    </div>
                    <p class="text-sm font-bold text-danger">Rp 3.250.000</p>
                  </div>
                </div>
                <div class="space-y-0 divide-y divide-border-thin">
                  <div class="flex items-center gap-3 py-2.5">
                    <div class="w-8 h-8 rounded-lg bg-success/10 flex items-center justify-center">
                      <Briefcase :size="14" class="text-success" />
                    </div>
                    <div class="flex-1">
                      <p class="text-xs font-semibold text-text-main">Gaji Bulanan</p>
                      <p class="text-[10px] text-text-sub">Gaji</p>
                    </div>
                    <span class="text-xs font-bold text-success">+Rp 7.500.000</span>
                  </div>
                  <div class="flex items-center gap-3 py-2.5">
                    <div class="w-8 h-8 rounded-lg bg-danger/10 flex items-center justify-center">
                      <Utensils :size="14" class="text-danger" />
                    </div>
                    <div class="flex-1">
                      <p class="text-xs font-semibold text-text-main">Makan Siang</p>
                      <p class="text-[10px] text-text-sub">Makanan</p>
                    </div>
                    <span class="text-xs font-bold text-danger">-Rp 45.000</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Features Section -->
    <section id="features" class="relative z-10 px-6 lg:px-12 py-20">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-12">
          <h2 class="text-2xl lg:text-3xl font-bold text-text-main mb-3">Kenapa Harus Di Catet?</h2>
          <p class="text-text-sub max-w-md mx-auto">Fitur lengkap yang bikin kamu semangat catat keuangan setiap hari.</p>
        </div>
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div v-for="f in features" :key="f.title" class="bg-card/60 border border-border-thin rounded-2xl p-6 hover:border-primary/30 hover:shadow-glow-primary transition-all duration-300 group">
            <div class="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110" :class="f.bg">
              <component :is="f.icon" :size="22" :class="f.color" />
            </div>
            <h3 class="text-base font-bold text-text-main mb-1.5">{{ f.title }}</h3>
            <p class="text-sm text-text-sub leading-relaxed">{{ f.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <footer class="relative z-10 border-t border-border-thin px-6 py-6">
      <div class="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <div class="flex items-center gap-2">
          <Wallet :size="16" class="text-primary" />
          <span class="text-sm font-bold text-primary">Di Catet</span>
        </div>
        <p class="text-xs text-text-sub">© 2026 Di Catet. Dibuat dengan ❤️ di Indonesia.</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { Wallet, User, Rocket, ArrowDown, ArrowUpRight, ArrowDownLeft, Briefcase, Utensils, BarChart3, Shield, Zap, Smartphone, Tags, Clock } from 'lucide-vue-next';

const features = [
  { icon: Zap, title: 'Super Cepat', desc: 'Tambah transaksi dalam hitungan detik. Tanpa loading lama.', bg: 'bg-yellow-500/15', color: 'text-yellow-400' },
  { icon: Tags, title: '5 Kategori', desc: 'Makanan, Transportasi, Hiburan, Gaji, dan Investasi.', bg: 'bg-primary/15', color: 'text-primary' },
  { icon: BarChart3, title: 'Laporan Visual', desc: 'Lihat kemana uang Anda pergi dengan grafik yang mudah dibaca.', bg: 'bg-success/15', color: 'text-success' },
  { icon: Smartphone, title: 'Mobile Friendly', desc: 'Desain responsif yang nyaman dipakai di HP maupun desktop.', bg: 'bg-cyan-500/15', color: 'text-cyan-400' },
  { icon: Shield, title: 'Data Aman', desc: 'Semua data tersimpan di database Anda sendiri. Privasi terjaga.', bg: 'bg-danger/15', color: 'text-danger' },
  { icon: Clock, title: 'Riwayat Lengkap', desc: 'Lacak semua transaksi kapan saja, dengan pencarian mudah.', bg: 'bg-purple-500/15', color: 'text-purple-400' },
];
</script>

<style scoped>
@keyframes float {
  0%, 100% { transform: translateY(0) scale(1); }
  50% { transform: translateY(-20px) scale(1.05); }
}
@keyframes float-delayed {
  0%, 100% { transform: translateY(0) scale(1); }
  50% { transform: translateY(15px) scale(1.03); }
}
.animate-float { animation: float 8s ease-in-out infinite; }
.animate-float-delayed { animation: float-delayed 10s ease-in-out infinite 2s; }
</style>
