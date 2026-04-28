<script setup>
import { computed } from 'vue'

const props = defineProps({
  card: { type: Object, required: true },
})

const statusBorder = computed(() => {
  switch (props.card.status) {
    case 'Achieved': return 'border-l-[3px] border-green-500'
    case 'At Risk': return 'border-l-[3px] border-yellow-400'
    case 'Off Track': return 'border-l-[3px] border-red-500'
    default: return ''
  }
})

const statusBadge = computed(() => {
  switch (props.card.status) {
    case 'Achieved': return 'bg-green-100 text-green-700'
    case 'At Risk': return 'bg-yellow-100 text-yellow-700'
    case 'Off Track': return 'bg-red-100 text-red-700'
    default: return 'bg-gray-100 text-gray-700'
  }
})

const domainColor = computed(() => {
  const map = {
    FFM: 'bg-blue-100 text-blue-700',
    SPM: 'bg-purple-100 text-purple-700',
    CSO: 'bg-pink-100 text-pink-700',
    PMDA: 'bg-indigo-100 text-indigo-700',
    CNQ: 'bg-orange-100 text-orange-700',
    NSQ: 'bg-teal-100 text-teal-700',
  }
  return map[props.card.domain] || 'bg-gray-100 text-gray-700'
})

const deltaBadge = computed(() => {
  const isGood = props.card.delta < 0
  return isGood ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
})

const deltaText = computed(() => {
  const sign = props.card.delta > 0 ? '+' : ''
  return `${sign}${props.card.delta}%`
})

const targetPosition = computed(() => {
  const total = props.card.progressActual + props.card.progressOver || 100
  return (props.card.targetVal / total) * 100
})
</script>

<template>
  <div class="bg-white rounded-xl shadow-sm p-5 hover:shadow-md transition" :class="statusBorder">
    <!-- Row 1: badges + period -->
    <div class="flex items-center justify-between mb-3">
      <div class="flex items-center gap-2">
        <span class="px-2 py-0.5 rounded-md text-xs font-semibold" :class="domainColor">
          {{ card.domain }}
        </span>
        <span class="px-2 py-0.5 rounded-full text-xs font-medium" :class="statusBadge">
          {{ card.status }}
        </span>
      </div>
      <span class="text-xs text-gray-400">{{ card.period }}</span>
    </div>

    <!-- Title -->
    <h4 class="text-sm font-bold text-gray-800 mb-3 truncate">{{ card.title }}</h4>

    <!-- Progress bar -->
    <div class="relative h-2 bg-gray-100 rounded-full mb-1 overflow-hidden">
      <div class="absolute left-0 top-0 h-full rounded-l-full" :style="{ width: card.progressActual + '%', backgroundColor: '#3b82f6' }"></div>
      <div v-if="card.progressOver" class="absolute h-full" :style="{ left: card.progressActual + '%', width: card.progressOver + '%', backgroundColor: '#ef4444' }"></div>
      <!-- Target indicator dot -->
      <div class="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white border border-gray-400" :style="{ left: targetPosition + '%' }"></div>
    </div>

    <!-- Achieved / Target line -->
    <div class="flex items-center justify-between text-xs text-gray-500 mb-3">
      <span>Achieved KPI: {{ card.achievedKpi }}</span>
      <span>Target: {{ card.targetVal }}{{ card.unit }}</span>
    </div>

    <!-- Big number + delta -->
    <div class="flex items-end justify-between mb-1">
      <div class="text-2xl font-bold text-gray-800">
        {{ card.actual }}<span class="text-sm font-normal text-gray-500 ml-0.5">{{ card.unit }}</span>
      </div>
      <span class="px-2 py-0.5 rounded-md text-xs font-semibold" :class="deltaBadge">
        {{ deltaText }}
      </span>
    </div>

    <!-- Target value -->
    <div class="text-xs text-gray-400 mb-4">Target: {{ card.targetVal }}{{ card.unit }}</div>

    <!-- Buttons -->
    <div class="flex items-center justify-between">
      <button class="px-3 py-1.5 rounded-lg border border-gray-300 text-gray-600 text-xs font-medium hover:bg-gray-50 transition">
        Preview
      </button>
      <button class="px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-medium hover:bg-blue-700 transition">
        Detail
      </button>
    </div>
  </div>
</template>
