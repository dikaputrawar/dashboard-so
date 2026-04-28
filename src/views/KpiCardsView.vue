<script setup>
import { ref, computed } from 'vue'
import { Doughnut } from 'vue-chartjs'
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js'
import { useKpiData } from '../composables/useKpiData.js'
import Navbar from '../components/Navbar.vue'
import MultiSelectDropdown from '../components/MultiSelectDropdown.vue'
import KpiCard from '../components/KpiCard.vue'

ChartJS.register(ArcElement, Tooltip)

const { kpiCards } = useKpiData()

// --- Header donut ---
const donutData = {
  labels: ['Achieved', 'At Risk', 'Off Track'],
  datasets: [{
    data: [50, 20, 30],
    backgroundColor: ['#22c55e', '#facc15', '#ef4444'],
    borderWidth: 0,
  }],
}
const donutOptions = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: '70%',
  plugins: { legend: { display: false }, tooltip: { enabled: false } },
}

// --- Domain badges data ---
const domainBadges = [
  { name: 'FFM', achieved: '8/10', percent: 80, color: 'green' },
  { name: 'PMDA', achieved: '7/10', percent: 70, color: 'yellow' },
  { name: 'SPM', achieved: '3/8', percent: 38, color: 'red' },
  { name: 'CSO', achieved: '5/12', percent: 42, color: 'yellow' },
  { name: 'CNQ', achieved: '2/10', percent: 20, color: 'red' },
  { name: 'NSQ', achieved: '4/8', percent: 50, color: 'yellow' },
]

const domainBg = (c) => {
  switch (c) {
    case 'green': return 'bg-green-50 border-green-200'
    case 'yellow': return 'bg-yellow-50 border-yellow-200'
    case 'red': return 'bg-red-50 border-red-200'
    default: return 'bg-gray-50 border-gray-200'
  }
}
const circleColor = (c) => {
  switch (c) {
    case 'green': return 'text-green-500'
    case 'yellow': return 'text-yellow-500'
    case 'red': return 'text-red-500'
    default: return 'text-gray-500'
  }
}

// --- VS Maret 2026 ---
const vsData = [
  { value: 82, label: 'Membaik', color: 'text-green-600' },
  { value: 30, label: 'Sama', color: 'text-yellow-500' },
  { value: 9, label: 'Memburuk', color: 'text-red-500' },
]

// --- Filters ---
const selectedDomains = ref([])
const selectedStatuses = ref([])
const selectedTrends = ref([])
const selectedRescues = ref([])
const searchQuery = ref('')

const domainOptions = ['Semua', 'FFM', 'SPM', 'CSO', 'PMDA', 'CNQ', 'NSQ']
const statusOptions = ['Semua', 'Achieved', 'At Risk', 'Off Track']
const trendOptions = ['Semua', 'Membaik', 'Stabil', 'Memburuk']
const rescueOptions = ['Semua', 'High', 'Medium', 'Low']

const filteredCards = computed(() => {
  let result = kpiCards.value

  const hasDomain = selectedDomains.value.length > 0 && !selectedDomains.value.includes('Semua')
  if (hasDomain) {
    result = result.filter(c => selectedDomains.value.includes(c.domain))
  }

  const hasStatus = selectedStatuses.value.length > 0 && !selectedStatuses.value.includes('Semua')
  if (hasStatus) {
    result = result.filter(c => selectedStatuses.value.includes(c.status))
  }

  const hasTrend = selectedTrends.value.length > 0 && !selectedTrends.value.includes('Semua')
  if (hasTrend) {
    result = result.filter(c => selectedTrends.value.includes(c.trend))
  }

  const hasRescue = selectedRescues.value.length > 0 && !selectedRescues.value.includes('Semua')
  if (hasRescue) {
    result = result.filter(c => selectedRescues.value.includes(c.rescue))
  }

  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase()
    result = result.filter(c => c.title.toLowerCase().includes(q))
  }

  return result
})
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <Navbar />

    <main class="max-w-7xl mx-auto p-6">
      <!-- BAGIAN 1: HEADER SUMMARY -->
      <div class="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div class="flex flex-col lg:flex-row items-center lg:items-start gap-8">
          <!-- Kiri: Donut + Total -->
          <div class="flex items-center gap-5 min-w-[240px]">
            <div class="relative w-24 h-24">
              <Doughnut :data="donutData" :options="donutOptions" />
              <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span class="text-sm font-bold text-gray-800">50%</span>
              </div>
            </div>
            <div>
              <div class="text-xs text-gray-500 mb-0.5">Total KPI Achieved</div>
              <div class="text-2xl font-bold text-gray-800">61<span class="text-sm font-normal text-gray-500">/121</span></div>
            </div>
          </div>

          <!-- Tengah: Domain Badges Grid -->
          <div class="flex-1 grid grid-cols-2 sm:grid-cols-3 gap-3 w-full">
            <div v-for="d in domainBadges" :key="d.name"
              class="flex items-center justify-between rounded-lg border px-3 py-2.5" :class="domainBg(d.color)">
              <div>
                <div class="text-xs font-semibold text-gray-700">{{ d.name }}</div>
                <div class="text-[10px] text-gray-500">Achieved KPI: {{ d.achieved }}</div>
              </div>
              <div class="relative w-8 h-8">
                <svg viewBox="0 0 36 36" class="w-8 h-8 -rotate-90">
                  <circle cx="18" cy="18" r="14" fill="none" stroke="#e5e7eb" stroke-width="4" />
                  <circle cx="18" cy="18" r="14" fill="none" :stroke="d.color === 'green' ? '#22c55e' : d.color === 'yellow' ? '#facc15' : '#ef4444'" stroke-width="4"
                    stroke-dasharray="88" :stroke-dashoffset="88 - (88 * d.percent / 100)" stroke-linecap="round" />
                </svg>
                <span class="absolute inset-0 flex items-center justify-center text-[8px] font-bold text-gray-700">{{ d.percent }}%</span>
              </div>
            </div>
          </div>

          <!-- Kanan: VS Maret 2026 -->
          <div class="min-w-[200px] text-center lg:text-left">
            <div class="text-sm font-semibold text-gray-600 mb-3">VS Maret 2026</div>
            <div class="flex items-center justify-center lg:justify-start gap-6">
              <div v-for="item in vsData" :key="item.label" class="text-center">
                <div class="text-2xl font-bold" :class="item.color">{{ item.value }}</div>
                <div class="text-xs text-gray-500">{{ item.label }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- BAGIAN 2: FILTER BAR -->
      <div class="bg-white rounded-xl shadow-sm p-4 mb-6">
        <div class="flex flex-col lg:flex-row items-start lg:items-center gap-3">
          <div class="flex flex-wrap items-center gap-3">
            <MultiSelectDropdown v-model="selectedDomains" label="Domain" :options="domainOptions" />
            <MultiSelectDropdown v-model="selectedStatuses" label="Status" :options="statusOptions" />
            <MultiSelectDropdown v-model="selectedTrends" label="Trend" :options="trendOptions" />
            <MultiSelectDropdown v-model="selectedRescues" label="Rescue" :options="rescueOptions" />
          </div>
          <div class="flex items-center gap-3 ml-auto w-full lg:w-auto">
            <div class="relative flex-1 lg:flex-none">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
              <input v-model="searchQuery" type="text" placeholder="Cari KPI..."
                class="w-full lg:w-64 pl-9 pr-3 py-1.5 text-sm border rounded-lg bg-white text-gray-700 outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <span class="text-sm text-gray-500 whitespace-nowrap">{{ filteredCards.length }} KPI ditampilkan</span>
          </div>
        </div>
      </div>

      <!-- BAGIAN 3: GRID KPI CARDS -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <KpiCard v-for="card in filteredCards" :key="card.id" :card="card" />
      </div>

      <div v-if="filteredCards.length === 0" class="text-center py-12 text-gray-400 text-sm">
        Tidak ada KPI yang cocok dengan filter.
      </div>
    </main>
  </div>
</template>
