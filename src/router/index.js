import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '@/views/DashboardView.vue'
import KpiCardsView from '@/views/KpiCardsView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'executive-summary', component: DashboardView },
    { path: '/kpi-cards', name: 'kpi-cards', component: KpiCardsView },
  ],
})

export default router
