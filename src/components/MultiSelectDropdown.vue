<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  label: { type: String, required: true },
  options: { type: Array, required: true },
  modelValue: { type: Array, default: () => [] },
})

const emit = defineEmits(['update:modelValue'])

const open = ref(false)
const dropdownRef = ref(null)

const allSelected = computed(() => props.modelValue.length === 0 || props.modelValue.includes('Semua'))

const displayLabel = computed(() => {
  if (props.modelValue.length === 0 || props.modelValue.includes('Semua')) {
    return props.label
  }
  if (props.modelValue.length === 1) {
    return props.modelValue[0]
  }
  return `${props.label} (${props.modelValue.length})`
})

const toggle = () => {
  open.value = !open.value
}

const close = () => {
  open.value = false
}

const selectAll = () => {
  emit('update:modelValue', [])
}

const toggleOption = (opt) => {
  if (opt === 'Semua') {
    emit('update:modelValue', [])
    return
  }
  const current = props.modelValue.filter((v) => v !== 'Semua')
  if (current.includes(opt)) {
    const next = current.filter((v) => v !== opt)
    emit('update:modelValue', next.length ? next : [])
  } else {
    emit('update:modelValue', [...current, opt])
  }
}

const isChecked = (opt) => {
  if (opt === 'Semua') return allSelected.value
  return allSelected.value || props.modelValue.includes(opt)
}

const onClickOutside = (e) => {
  if (dropdownRef.value && !dropdownRef.value.contains(e.target)) {
    close()
  }
}

onMounted(() => {
  document.addEventListener('click', onClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', onClickOutside)
})
</script>

<template>
  <div ref="dropdownRef" class="relative">
    <button
      @click.stop="toggle"
      class="flex items-center gap-2 px-3 py-1.5 text-sm border rounded-lg bg-white text-gray-700 hover:bg-gray-50 transition outline-none focus:ring-2 focus:ring-blue-500"
      :class="open ? 'ring-2 ring-blue-500' : ''"
    >
      <span>{{ displayLabel }}</span>
      <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
      </svg>
    </button>

    <Transition name="dropdown">
      <div
        v-if="open"
        class="absolute z-50 mt-1 w-56 bg-white border rounded-lg shadow-lg py-1"
      >
        <div
          v-for="opt in options"
          :key="opt"
          @click.stop="opt === 'Semua' ? selectAll() : toggleOption(opt)"
          class="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 cursor-pointer"
        >
          <div class="w-4 h-4 rounded border flex items-center justify-center transition" :class="isChecked(opt) ? 'bg-blue-500 border-blue-500' : 'bg-white border-gray-300'">
            <svg v-if="isChecked(opt)" xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
            </svg>
          </div>
          <span class="text-sm text-gray-700">{{ opt }}</span>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.dropdown-enter-active,
.dropdown-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}
.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
