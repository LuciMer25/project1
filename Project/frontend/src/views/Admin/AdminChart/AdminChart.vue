<template>
    <div>
      <div class="card mb-4">
        <div class="card-header">
          <i class="fas fa-chart-pie me-1"></i>
          카테고리별 매출 차트
        </div>
        <div class="card-body">
          <PieChart :chartData="categoryChartData" />
        </div>
      </div>
      <div class="card mb-4">
        <div class="card-header">
          <i class="fas fa-chart-bar me-1"></i>
          일일 매출 차트
        </div>
        <div class="card-body">
          <BarChart :chartData="intervalChartData" />
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import PieChart from '@/components/Admin/PieChart.vue';
  import BarChart from '@/components/Admin/BarChart.vue';
  import axios from 'axios';
  
  export default {
    components: {
      PieChart, BarChart
    },
    data() {
      return {
        categoryChartData: [],
        intervalChartData: []
      };
    },
    async created() {
      try {
        const resCategory = await axios.get('/api/adminChart/categoryChart');
        if (resCategory.data.list && resCategory.data.list.length > 0) {
          this.categoryChartData = resCategory.data.list;
        } else {
          this.categoryChartData = [];
        }
  
        const resInterval = await axios.get('/api/adminChart/IntervalChart');
        if (resInterval.data.list && resInterval.data.list.length > 0) {
          this.intervalChartData = resInterval.data.list;
        } else {
          this.intervalChartData = [];
        }
      } catch (err) {
        console.error(err);
      }
    }
  };
  </script>
  
  <style scoped>
  .card {
    margin: 20px;
  }
  </style>