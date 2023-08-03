<script setup>
import Graph from '../components/Graph.vue'
import Table from '../components/Table.vue'
import Controls from '../components/Controls.vue'

const dataURL = "data.csv";

</script>

<template>
  <main>
    <div class="container">
      <div class="row">
        <Graph :msg=dataURL />
        <Controls />
      </div>
      <div class="row">
        <Table />
      </div>
    </div>
    
  </main>
</template>
