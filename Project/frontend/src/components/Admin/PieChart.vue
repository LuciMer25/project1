<template>
    <div class="chart-container">
      <canvas ref="pieChart"></canvas>
    </div>
  </template>
  
  <script>
  import { Chart, registerables } from 'chart.js';
  
  Chart.register(...registerables);
  
  export default {
    name: 'PieChart',
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
      renderChart() {
        if (this.chart) {
          this.chart.destroy();
        }
        const ctx = this.$refs.pieChart.getContext('2d');
        this.chart = new Chart(ctx, {
          type: 'pie',
          data: {
            labels: this.chartData.map(data => data.chart_name),
            datasets: [{
              data: this.chartData.map(data => data.chart_value),
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: 'top',
              },
              tooltip: {
                callbacks: {
                  label: function(tooltipItem) {
                    return tooltipItem.label + ': ' + tooltipItem.raw.toLocaleString() + '원';
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
    width: 300px;
    height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
  }
  
  canvas {
    max-width: 100%;
    max-height: 100%;
  }
  </style>