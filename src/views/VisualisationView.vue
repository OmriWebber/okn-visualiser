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
        labels: x, // assuming "x" is the data for x-axis
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
    <center><p>Upload an 'signal' csv file to visualise</p></center>

      <FileUpload />
      <div class="row">
        <div class="col-12">
          <Graph />
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <Table />
        </div>
      </div>
    </div>
    
  </main>
</template>
