import { ref, computed } from 'vue'

export function useKpiData() {
  const summaryCards = ref([
    { count: 61, label: 'KPI Achieved', color: 'green', icon: 'check' },
    { count: 40, label: 'KPI At Risk', color: 'yellow', icon: 'warning' },
    { count: 20, label: 'KPI Off Track', color: 'red', icon: 'x' },
  ])

  const distributionByMonth = ref({
    'April 2026': [50, 20, 30],
    'March 2026': [45, 25, 30],
    'February 2026': [40, 30, 30],
  })

  const distributionData = computed(() => ({
    labels: ['Achieved', 'At Risk', 'Off Track'],
    datasets: [
      {
        data: distributionByMonth.value[selectedMonth.value] || [50, 20, 30],
        backgroundColor: ['#22c55e', '#facc15', '#ef4444'],
        borderWidth: 0,
      },
    ],
  }))

  const trendData = ref({
    labels: ['JAN MTD', 'FEB MTD', 'MAR MTD', 'APR W1', 'APR W2', 'APR MTD'],
    datasets: [
      {
        label: 'Achieved',
        data: [45, 48, 52, 50, 55, 61],
        backgroundColor: '#22c55e',
      },
      {
        label: 'At Risk',
        data: [25, 22, 20, 25, 30, 40],
        backgroundColor: '#facc15',
      },
      {
        label: 'Off Track',
        data: [30, 30, 28, 25, 15, 20],
        backgroundColor: '#ef4444',
      },
    ],
  })

  const exceptions = ref([
    { kpi: 'Site Availability', domain: 'FFM', status: 'Off Track', actual: '94.2%', target: '99.5%', delta: '+5.3%', topDriver: 'Power outage frequent', aksi: 'Detail' },
    { kpi: 'MTTR Critical', domain: 'FFM', status: 'At Risk', actual: '3.2h', target: '2.0h', delta: '+1.2h', topDriver: 'Spare part shortage', aksi: 'Detail' },
    { kpi: 'Fiber Utilization', domain: 'NPM', status: 'Achieved', actual: '78.5%', target: '75.0%', delta: '-3.5%', topDriver: 'Traffic growth stable', aksi: 'Detail' },
    { kpi: 'Customer Complaint', domain: 'CCM', status: 'Off Track', actual: '120', target: '80', delta: '+40', topDriver: 'Billing dispute spike', aksi: 'Detail' },
    { kpi: 'SLA Compliance', domain: 'NPM', status: 'At Risk', actual: '96.5%', target: '98.0%', delta: '+1.5%', topDriver: 'Vendor delay', aksi: 'Detail' },
    { kpi: 'Revenue Growth', domain: 'FIN', status: 'Achieved', actual: '12.5%', target: '10.0%', delta: '-2.5%', topDriver: 'New product launch', aksi: 'Detail' },
    { kpi: 'Churn Rate', domain: 'CCM', status: 'Off Track', actual: '3.2%', target: '2.0%', delta: '+1.2%', topDriver: 'Competitor promo', aksi: 'Detail' },
    { kpi: 'CAPEX Efficiency', domain: 'FIN', status: 'At Risk', actual: '92%', target: '95%', delta: '+3%', topDriver: 'Project overrun', aksi: 'Detail' },
    { kpi: 'Ticket Resolution', domain: 'CCM', status: 'Achieved', actual: '98%', target: '95%', delta: '-3%', topDriver: 'Automation rollout', aksi: 'Detail' },
    { kpi: 'Network Latency', domain: 'NPM', status: 'Off Track', actual: '45ms', target: '30ms', delta: '+15ms', topDriver: 'Backhaul congestion', aksi: 'Detail' },
  ])

  const domains = ref([
    {
      name: 'FFM',
      counts: { green: 8, yellow: 3, red: 2 },
      miniPercent: 62,
      kpis: [
        { name: 'Site Availability', status: 'Off Track' },
        { name: 'MTTR Critical', status: 'At Risk' },
        { name: 'Preventive Maintenance', status: 'Achieved' },
      ],
    },
    {
      name: 'NPM',
      counts: { green: 6, yellow: 2, red: 1 },
      miniPercent: 67,
      kpis: [
        { name: 'Fiber Utilization', status: 'Achieved' },
        { name: 'SLA Compliance', status: 'At Risk' },
        { name: 'Network Latency', status: 'Off Track' },
      ],
    },
    {
      name: 'CCM',
      counts: { green: 5, yellow: 4, red: 3 },
      miniPercent: 42,
      kpis: [
        { name: 'Customer Complaint', status: 'Off Track' },
        { name: 'Churn Rate', status: 'Off Track' },
        { name: 'Ticket Resolution', status: 'Achieved' },
      ],
    },
    {
      name: 'FIN',
      counts: { green: 4, yellow: 2, red: 1 },
      miniPercent: 57,
      kpis: [
        { name: 'Revenue Growth', status: 'Achieved' },
        { name: 'CAPEX Efficiency', status: 'At Risk' },
        { name: 'OPEX Control', status: 'Achieved' },
      ],
    },
    {
      name: 'HR',
      counts: { green: 3, yellow: 1, red: 0 },
      miniPercent: 75,
      kpis: [
        { name: 'Employee Satisfaction', status: 'Achieved' },
        { name: 'Training Completion', status: 'Achieved' },
        { name: 'Headcount Plan', status: 'At Risk' },
      ],
    },
    {
      name: 'IT',
      counts: { green: 5, yellow: 2, red: 1 },
      miniPercent: 63,
      kpis: [
        { name: 'System Uptime', status: 'Achieved' },
        { name: 'Security Incidents', status: 'Achieved' },
        { name: 'App Performance', status: 'At Risk' },
      ],
    },
  ])

  const selectedMonth = ref('April 2026')
  const topN = ref('10')

  return {
    summaryCards,
    distributionData,
    distributionByMonth,
    trendData,
    exceptions,
    domains,
    selectedMonth,
    topN,
  }
}
