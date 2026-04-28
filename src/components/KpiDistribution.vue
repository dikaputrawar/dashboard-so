<script setup>
import { ref, computed, watch } from 'vue'
import { Doughnut } from 'vue-chartjs'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

const props = defineProps({
  data: { type: Object, required: true },
  monthOptions: { type: Array, default: () => ['April 2026', 'March 2026', 'February 2026'] },
  modelValue: { type: String, default: 'April 2026' },
})

const emit = defineEmits(['update:modelValue'])

const selectedMonth = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})

watch(selectedMonth, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    // trigger side effect: console log or future analytics hook
  }
})

const chartData = computed(() => props.data)

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: '70%',
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      callbacks: {
        label: (ctx) => `${ctx.label}: ${ctx.raw}%`,
      },
    },
  },
}

const achievedPercent = computed(() => {
  const idx = chartData.value.labels.indexOf('Achieved')
  return idx >= 0 ? chartData.value.datasets[0].data[idx] : 0
})

const legendItems = computed(() => {
  return chartData.value.labels.map((label, i) => ({
    label,
    percent: chartData.value.datasets[0].data[i],
    color: chartData.value.datasets[0].backgroundColor[i],
  }))
})
</script>

<template>
  <div class="bg-white rounded-xl shadow-sm p-5 flex flex-col h-full">
    <div class="flex items-center justify-between mb-4">
      <h3 class="text-base font-semibold text-gray-800">Distribusi Status KPI</h3>
      <select v-model="selectedMonth" class="text-sm border rounded-lg px-3 py-1.5 bg-white text-gray-600 outline-none focus:ring-2 focus:ring-blue-500">
        <option v-for="m in monthOptions" :key="m" :value="m">{{ m }}</option>
      </select>
    </div>

    <div class="relative flex-1 min-h-[220px]">
      <Doughnut :data="chartData" :options="chartOptions" />
      <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div class="text-center">
          <div class="text-3xl font-bold text-gray-800">{{ achievedPercent }}%</div>
          <div class="text-xs text-gray-500">Achieved</div>
        </div>
      </div>
    </div>

    <div class="mt-4 space-y-2">
      <div v-for="item in legendItems" :key="item.label" class="flex items-center justify-between text-sm">
        <div class="flex items-center gap-2">
          <span class="w-3 h-3 rounded-full" :style="{ backgroundColor: item.color }"></span>
          <span class="text-gray-600">{{ item.label }}</span>
        </div>
        <span class="font-semibold text-gray-800">{{ item.percent }}%</span>
      </div>
    </div>
  </div>
</template>
