<script>
import Graph from '../components/Graph.vue'
import Table from '../components/Table.vue'
import Controls from '../components/Controls.vue'
import FileUpload from '../components/fileUpload.vue'

export default {
  components: {
    Graph,
    Table,
    Controls,
    FileUpload
  },
  data() {
    return {
      chartData: null
    }
  },
  methods: {
    updateChartData({ x, t }) {
      this.chartData = {
        labels: x, // assuming "t" is the data for x-axis
        datasets: [{
          label: 'T Data',
          data: t
        }]
      }
    }
  }
}
</script>

<template>
  <main>
    <div class="container">
      <FileUpload />
      <div class="row">
        <Graph />
        <Controls />
      </div>
      <div class="row">
        <Table />
      </div>
    </div>
    
  </main>
</template>
