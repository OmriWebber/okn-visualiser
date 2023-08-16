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
  }
}
</script>

<template>
  <main>
    <div class="container">
      <div class="row">
        <div class="col-12">
          <p>Upload a 'signal' csv file to visualise OKN detection.</p>
          <FileUpload />
        </div>
      </div>
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
