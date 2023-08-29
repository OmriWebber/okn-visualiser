<script>
<<<<<<< HEAD
import Graph from '../components/visualisation/Graph.vue'
import Table from '../components/visualisation/Table.vue'
import FileUpload from '../components/visualisation/fileUpload.vue'
=======
import Graph from '../components/Graph.vue'
import Table from '../components/Table.vue'
import Controls from '../components/Controls.vue'
import FileUpload from '../components/fileUpload.vue'
>>>>>>> 02d6cba520e2ce4fb1adcb8e2792d7d7cb5e4ce6

export default {
  components: {
    Graph,
    Table,
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
