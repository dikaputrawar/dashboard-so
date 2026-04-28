<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  count: { type: Number, required: true },
  label: { type: String, required: true },
  color: { type: String, required: true },
  icon: { type: String, required: true },
})

const animatedCount = ref(0)
let intervalId = null

onMounted(() => {
  const duration = 800
  const steps = 30
  const stepTime = duration / steps
  const increment = props.count / steps
  let current = 0
  intervalId = setInterval(() => {
    current += increment
    if (current >= props.count) {
      animatedCount.value = props.count
      clearInterval(intervalId)
    } else {
      animatedCount.value = Math.floor(current)
    }
  }, stepTime)
})

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId)
})

const colorClasses = computed(() => {
  switch (props.color) {
    case 'green':
      return { bg: 'bg-green-50', border: 'border-green-500', text: 'text-green-600', iconBg: 'bg-green-100' }
    case 'yellow':
      return { bg: 'bg-yellow-50', border: 'border-yellow-400', text: 'text-yellow-600', iconBg: 'bg-yellow-100' }
    case 'red':
      return { bg: 'bg-red-50', border: 'border-red-500', text: 'text-red-600', iconBg: 'bg-red-100' }
    default:
      return { bg: 'bg-gray-50', border: 'border-gray-300', text: 'text-gray-600', iconBg: 'bg-gray-100' }
  }
})

const statusIcon = computed(() => {
  switch (props.icon) {
    case 'check':
      return `<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 ${colorClasses.value.text}" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>`
    case 'warning':
      return `<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 ${colorClasses.value.text}" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>`
    case 'x':
      return `<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 ${colorClasses.value.text}" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>`
    default:
      return ''
  }
})
</script>

<template>
  <div class="rounded-xl shadow-sm border-l-4 p-5 bg-white" :class="colorClasses.border">
    <div class="flex items-center gap-4">
      <div class="rounded-lg p-3" :class="colorClasses.iconBg" v-html="statusIcon"></div>
      <div>
        <div class="text-3xl font-bold text-gray-800">{{ animatedCount }}</div>
        <div class="text-sm text-gray-500">{{ label }}</div>
      </div>
    </div>
  </div>
</template>
