<script setup>
import { useKpiData } from '../composables/useKpiData.js'
import Navbar from '../components/Navbar.vue'
import SummaryCard from '../components/SummaryCard.vue'
import KpiDistribution from '../components/KpiDistribution.vue'
import KpiTrend from '../components/KpiTrend.vue'
import TopExceptions from '../components/TopExceptions.vue'
import KpiDomainCard from '../components/KpiDomainCard.vue'

const { summaryCards, distributionData, trendData, exceptions, domains, selectedMonth, topN } = useKpiData()
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <Navbar />

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
