<template>
  <div class="grid grid-cols-12 gap-4 md:gap-6">
    <div class="col-span-12 space-y-6 xl:col-span-7">
      <ecommerce-metrics />
      <monthly-target />
    </div>
    <div class="col-span-12 xl:col-span-5">
      <monthly-sale />
    </div>

    <div class="col-span-12">
      <statistics-chart />
    </div>

    <div class="col-span-12 xl:col-span-5">
      <customer-demographic />
    </div>

    <div class="col-span-12 xl:col-span-7">
      <recent-orders />
    </div>
  </div>
</template>

<script setup>
  import EcommerceMetrics from '../component/dashboard/EcommerceMetrics.vue'
  import MonthlyTarget from '../component/dashboard/MonthlySale.vue'
  import MonthlySale from '../component/dashboard/MonthlyTarget.vue'
  import CustomerDemographic from '../component/dashboard/CustomerDemographic.vue'
  import StatisticsChart from '../component/dashboard/StatisticsChart.vue'
  import RecentOrders from '../component/dashboard/RecentOrders.vue'
</script>
