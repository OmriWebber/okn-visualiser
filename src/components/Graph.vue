<script>
import { ref, onMounted, onUnmounted } from 'vue'
import Chart from 'chart.js/auto'
import Papa from 'papaparse'
import axios from 'axios'

export default {
  setup() {
    const chart = ref(null)
    let chartInstance = null

    onMounted(async () => {
      const response = await axios.get('okn.csv')
      const parsedData = Papa.parse(response.data, { header: true, dynamicTyping: true }).data

      const data = {
        labels: parsedData.map(row => row.t),
        datasets: [
          {
            data: parsedData.map(row => ({x: row.t, y: row.x})),
            fill: true,
            pointRadius: 1,
            borderColor: parsedData.map(row => row.is_sp ? '#00ff00' : row.is_qp ? '#ff0000' : '#000000'),
          }
        ]
      }

      

      const options = { responsive: true, maintainAspectRatio: true, plugins: { legend: {display: false} }}

      chartInstance = new Chart(chart.value, {
        type: 'line',
        data,
        options,
      })
    })

    onUnmounted(() => {
      if (chartInstance) chartInstance.destroy()
    })

    return { chart }
  }
}
</script>


<template>
    <div class="col-8 wrapper graph-wrapper">
        <div class="graph">
            <h1>Graph</h1>
            <canvas ref="chart"></canvas>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .graph-wrapper {
        height: 600px;
        .graph {
            max-width: 100%;
        }
    }
    

</style>