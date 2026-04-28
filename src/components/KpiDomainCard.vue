<script setup>
import { computed } from 'vue'
import { Doughnut } from 'vue-chartjs'
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js'

ChartJS.register(ArcElement, Tooltip)

const props = defineProps({
  domain: { type: Object, required: true },
})

const statusBadge = (status) => {
  switch (status) {
    case 'Achieved':
      return 'bg-green-100 text-green-700'
    case 'At Risk':
      return 'bg-yellow-100 text-yellow-700'
    case 'Off Track':
      return 'bg-red-100 text-red-700'
    default:
      return 'bg-gray-100 text-gray-700'
  }
}

const miniChartData = computed(() => ({
  labels: ['Achieved', 'Remaining'],
  datasets: [
    {
      data: [props.domain.miniPercent, 100 - props.domain.miniPercent],
      backgroundColor: ['#22c55e', '#e5e7eb'],
      borderWidth: 0,
    },
  ],
}))

const miniChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: '75%',
  plugins: {
    legend: { display: false },
    tooltip: { enabled: false },
  },
}
</script>

<template>
  <div class="bg-white rounded-xl shadow-sm p-5">
    <div class="flex items-center justify-between mb-4">
      <h4 class="text-base font-semibold text-gray-800">{{ domain.name }}</h4>
      <div class="flex items-center gap-2">
        <span class="px-2 py-0.5 rounded-md bg-green-100 text-green-700 text-xs font-semibold">{{ domain.counts.green }}</span>
        <span class="px-2 py-0.5 rounded-md bg-yellow-100 text-yellow-700 text-xs font-semibold">{{ domain.counts.yellow }}</span>
        <span class="px-2 py-0.5 rounded-md bg-red-100 text-red-700 text-xs font-semibold">{{ domain.counts.red }}</span>
      </div>
    </div>

    <div class="flex items-center gap-4 mb-4">
      <div class="relative w-16 h-16">
        <Doughnut :data="miniChartData" :options="miniChartOptions" />
        <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span class="text-sm font-bold text-gray-800">{{ domain.miniPercent }}%</span>
        </div>
      </div>
      <div class="text-xs text-gray-500">Health Score</div>
    </div>

    <div class="space-y-2">
      <div v-for="(kpi, i) in domain.kpis" :key="i" class="flex items-center justify-between text-sm">
        <span class="text-gray-700 truncate">{{ kpi.name }}</span>
        <span class="px-2 py-0.5 rounded-full text-xs font-medium whitespace-nowrap" :class="statusBadge(kpi.status)">
          {{ kpi.status }}
        </span>
      </div>
    </div>
  </div>
</template>
