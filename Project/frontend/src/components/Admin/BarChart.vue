<template>
    <div class="chart-container">
      <canvas ref="barChart"></canvas>
    </div>
  </template>
  
  <script>
  import { Chart, registerables } from 'chart.js';
  
  Chart.register(...registerables);
  
  export default {
    name: 'BarChart',
    props: {
      chartData: {
        type: Array,
        required: true
      }
    },
    watch: {
      chartData: {
        immediate: true,
        handler() {
          if (this.chartData.length > 0) {
            this.renderChart();
          }
        }
      }
    },
    methods: {
      formatDate(dateString) {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
      },
      renderChart() {
        if (this.chart) {
          this.chart.destroy();
        }
        const ctx = this.$refs.barChart.getContext('2d');
        this.chart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: this.chartData.map(data => this.formatDate(data.chart_date)),
            datasets: [{
              label: '매출액',
              data: this.chartData.map(data => data.chart_value),
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true,
                ticks: {
                  callback: function(value) {
                    return value.toLocaleString() + '원';
                  }
                }
              }
            },
            plugins: {
              legend: {
                display: false
              },
              tooltip: {
                callbacks: {
                  label: function(tooltipItem) {
                    return tooltipItem.raw.toLocaleString() + '원';
                  }
                }
              }
            }
          }
        });
      }
    }
  }
  </script>
  
  <style scoped>
  .chart-container {
    position: relative;
    width: 100%;
    height: 400px;
  }
  </style>