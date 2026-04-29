import { createRouter, createWebHistory } from 'vue-router';

import Landing from '../pages/Landing.vue';
import Dashboard from '../pages/Dashboard.vue';
import Transactions from '../pages/Transactions.vue';
import Reports from '../pages/Reports.vue';
import Profile from '../pages/Profile.vue';
import Login from '../pages/Login.vue';

const routes = [
  {
    path: '/',
    name: 'landing',
    component: Landing,
    meta: { layout: 'blank' },
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: { layout: 'blank', guestOnly: true },
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    meta: { requiresAuth: true },
  },
  {
    path: '/transaksi',
    name: 'transaksi',
    component: Transactions,
    meta: { requiresAuth: true },
  },
  {
    path: '/laporan',
    name: 'laporan',
    component: Reports,
    meta: { requiresAuth: true },
  },
  {
    path: '/profil',
    name: 'profil',
    component: Profile,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation Guards
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  
  if (to.meta.requiresAuth && !token) {
    next({ name: 'login' });
  } else if (to.meta.guestOnly && token) {
    next({ name: 'dashboard' });
  } else {
    next();
  }
});

export default router;
