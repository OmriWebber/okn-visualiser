<script>
import Graph from '../components/manipulation/Graph.vue'
import Table from '../components/manipulation/Table.vue'
import Controls from '../components/manipulation/Controls.vue'
import FileUpload from '../components/manipulation/fileUpload.vue'

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
    <p>Upload an 'updated' csv file to visualise and then manipulate OKN detection with config controls.</p>

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
