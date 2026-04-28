<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  exceptions: { type: Array, required: true },
  modelValue: { type: String, default: '10' },
})

const emit = defineEmits(['update:modelValue'])

const topN = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})

const modalOpen = ref(false)
const selectedRow = ref(null)

const filteredExceptions = computed(() => {
  if (topN.value === 'all') return props.exceptions
  const n = parseInt(topN.value, 10)
  return props.exceptions.slice(0, n)
})

const openModal = (row) => {
  selectedRow.value = row
  modalOpen.value = true
}
const closeModal = () => {
  modalOpen.value = false
  selectedRow.value = null
}

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

const statusIcon = (status) => {
  switch (status) {
    case 'Achieved':
      return `<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>`
    case 'At Risk':
      return `<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>`
    case 'Off Track':
      return `<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>`
    default:
      return ''
  }
}

const isPositiveDeltaRed = (delta) => {
  return delta.startsWith('+')
}
</script>

<template>
  <div class="bg-white rounded-xl shadow-sm p-5 relative">
    <div class="flex items-center justify-between mb-4">
      <h3 class="text-base font-semibold text-gray-800">Top Exceptions - Perlu Perhatian Segera</h3>
      <select v-model="topN" class="text-sm border rounded-lg px-3 py-1.5 bg-white text-gray-600 outline-none focus:ring-2 focus:ring-blue-500">
        <option value="5">Show Top 5</option>
        <option value="10">Show Top 10</option>
        <option value="all">Show All</option>
      </select>
    </div>

    <div class="overflow-x-auto">
      <table class="w-full text-sm text-left min-w-[720px]">
        <thead class="text-xs text-gray-500 uppercase bg-gray-50">
          <tr>
            <th class="px-4 py-3 rounded-tl-lg"></th>
            <th class="px-4 py-3">KPI</th>
            <th class="px-4 py-3">Domain</th>
            <th class="px-4 py-3">Status</th>
            <th class="px-4 py-3">Actual</th>
            <th class="px-4 py-3">Target</th>
            <th class="px-4 py-3">Delta</th>
            <th class="px-4 py-3">Top Driver</th>
            <th class="px-4 py-3 rounded-tr-lg">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, i) in filteredExceptions" :key="i" class="border-b hover:bg-gray-50">
            <td class="px-4 py-3" v-html="statusIcon(row.status)"></td>
            <td class="px-4 py-3 font-medium text-gray-800">{{ row.kpi }}</td>
            <td class="px-4 py-3 text-gray-600">{{ row.domain }}</td>
            <td class="px-4 py-3">
              <span class="px-2.5 py-0.5 rounded-full text-xs font-medium" :class="statusBadge(row.status)">
                {{ row.status }}
              </span>
            </td>
            <td class="px-4 py-3 text-gray-600">{{ row.actual }}</td>
            <td class="px-4 py-3 text-gray-600">{{ row.target }}</td>
            <td class="px-4 py-3 font-medium" :class="isPositiveDeltaRed(row.delta) ? 'text-red-600' : 'text-green-600'">
              {{ row.delta }}
            </td>
            <td class="px-4 py-3 text-gray-600">{{ row.topDriver }}</td>
            <td class="px-4 py-3">
              <button @click="openModal(row)" class="px-3 py-1 rounded-lg bg-blue-600 text-white text-xs font-medium hover:bg-blue-700 transition">
                {{ row.aksi }}
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal Overlay -->
    <Transition name="fade">
      <div v-if="modalOpen" class="fixed inset-0 z-50 flex items-center justify-center" @click.self="closeModal">
        <div class="absolute inset-0 bg-black bg-opacity-50"></div>
        <div class="relative bg-white rounded-xl shadow-lg w-full max-w-md mx-4 p-6">
          <div class="flex items-center justify-between mb-4">
            <h4 class="text-lg font-bold text-gray-800">KPI Detail</h4>
            <button @click="closeModal" class="text-gray-400 hover:text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
          </div>
          <div v-if="selectedRow" class="space-y-3 text-sm">
            <div class="flex justify-between"><span class="text-gray-500">KPI</span><span class="font-medium text-gray-800">{{ selectedRow.kpi }}</span></div>
            <div class="flex justify-between"><span class="text-gray-500">Domain</span><span class="font-medium text-gray-800">{{ selectedRow.domain }}</span></div>
            <div class="flex justify-between"><span class="text-gray-500">Status</span><span class="px-2 py-0.5 rounded-full text-xs font-medium" :class="statusBadge(selectedRow.status)">{{ selectedRow.status }}</span></div>
            <div class="flex justify-between"><span class="text-gray-500">Actual</span><span class="font-medium text-gray-800">{{ selectedRow.actual }}</span></div>
            <div class="flex justify-between"><span class="text-gray-500">Target</span><span class="font-medium text-gray-800">{{ selectedRow.target }}</span></div>
            <div class="flex justify-between"><span class="text-gray-500">Delta</span><span class="font-medium" :class="isPositiveDeltaRed(selectedRow.delta) ? 'text-red-600' : 'text-green-600'">{{ selectedRow.delta }}</span></div>
            <div class="pt-2 border-t">
              <span class="text-gray-500">Root Cause</span>
              <p class="mt-1 text-gray-700 font-medium">{{ selectedRow.topDriver }}</p>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
