<script setup>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js'

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend)

const props = defineProps({
  data: { type: Object, required: true },
})

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      stacked: true,
      grid: {
        display: false,
      },
    },
    y: {
      stacked: true,
      grid: {
        color: '#f3f4f6',
      },
    },
  },
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        usePointStyle: true,
        padding: 20,
      },
    },
    tooltip: {
      mode: 'index',
      intersect: false,
    },
  },
}
</script>

<template>
  <div class="bg-white rounded-xl shadow-sm p-5 flex flex-col h-full">
    <h3 class="text-base font-semibold text-gray-800">KPI Portfolio Health Composition Trend</h3>
    <p class="text-xs text-gray-500 mb-4">
      Historical Full-Month closures vs progressive Current-Month trajectory
    </p>
    <div class="flex-1 min-h-[260px]">
      <Bar :data="data" :options="chartOptions" />
    </div>
  </div>
</template>
