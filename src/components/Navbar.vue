<script setup>
</script>

<template>
  <nav class="bg-navy-900 text-white px-6 py-4">
    <div class="max-w-7xl mx-auto flex items-center justify-between">
      <div class="text-xl font-bold">Dashboard SO</div>
      <div class="flex items-center gap-8 text-sm font-semibold">
        <router-link
          to="/"
          class="hover:text-blue-300 transition"
          :class="$route.path === '/' ? 'text-blue-300 border-b-2 border-blue-300 pb-0.5' : ''"
        >
          Executive Summary
        </router-link>
        <router-link
          to="/kpi-cards"
          class="hover:text-blue-300 transition"
          :class="$route.path === '/kpi-cards' ? 'text-blue-300 border-b-2 border-blue-300 pb-0.5' : ''"
        >
          KPI Cards
        </router-link>
        <router-link
          to="/"
          class="hover:text-blue-300 transition"
          :class="$route.path === '/registry' ? 'text-blue-300 border-b-2 border-blue-300 pb-0.5' : ''"
        >
          KPI Registry
        </router-link>
      </div>
      <div class="flex items-center gap-4">
        <button class="hover:text-blue-300 transition">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
          </svg>
        </button>
        <button class="hover:text-blue-300 transition">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
          </svg>
        </button>
      </div>
    </div>
  </nav>
</template>
