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

}
</script>

<template>
  <main class="manipulation">
    <div class="container">
    <center><p>Upload an 'updated' csv file to visualise and then manipulate OKN detection with config controls.</p></center>

      <FileUpload />
      <div class="row">
        <div class="col-8">
          <Graph />
        </div>
        <div class="col-4">
          <Controls />
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

<style>
@media (min-width: 1024px) {
  .manipulation {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
