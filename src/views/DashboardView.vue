<script setup>
import { useKpiData } from '../composables/useKpiData.js'
import SummaryCard from '../components/SummaryCard.vue'
import KpiDistribution from '../components/KpiDistribution.vue'
import KpiTrend from '../components/KpiTrend.vue'
import TopExceptions from '../components/TopExceptions.vue'
import KpiDomainCard from '../components/KpiDomainCard.vue'

const { summaryCards, distributionData, trendData, exceptions, domains, selectedMonth, topN } = useKpiData()
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Navbar -->
    <nav class="bg-navy-900 text-white px-6 py-4">
      <div class="max-w-7xl mx-auto flex items-center justify-between">
        <div class="text-xl font-bold">Dashboard SO</div>
        <div class="flex items-center gap-8 text-sm font-semibold">
          <a href="#" class="hover:text-blue-300 transition">Executive Summary</a>
          <a href="#" class="hover:text-blue-300 transition">KPI Cards</a>
          <a href="#" class="hover:text-blue-300 transition">KPI Registry</a>
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

    <main class="max-w-7xl mx-auto p-6">
      <!-- Summary Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <SummaryCard
          v-for="card in summaryCards"
          :key="card.label"
          :count="card.count"
          :label="card.label"
          :color="card.color"
          :icon="card.icon"
        />
      </div>

      <!-- Row 2: Distribution + Trend -->
      <div class="flex flex-col lg:flex-row gap-4 mb-6">
        <div class="lg:w-[30%]">
          <KpiDistribution v-model="selectedMonth" :data="distributionData" />
        </div>
        <div class="lg:w-[70%]">
          <KpiTrend :data="trendData" />
        </div>
      </div>

      <!-- Top Exceptions -->
      <div class="mb-6">
        <TopExceptions v-model="topN" :exceptions="exceptions" />
      </div>

      <!-- KPI Health per Domain -->
      <div class="mb-6">
        <h3 class="text-base font-semibold text-gray-800 mb-4">KPI Health per Domain</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <KpiDomainCard
            v-for="domain in domains"
            :key="domain.name"
            :domain="domain"
          />
        </div>
      </div>
    </main>
  </div>
</template>
