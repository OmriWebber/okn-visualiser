<script setup>
import Graph from '../components/Graph.vue'
import Table from '../components/Table.vue'
import Controls from '../components/Controls.vue'
import FileUpload from '../components/fileUpload.vue'

import { useDataStore } from "../components/store/store";
const store = useDataStore();
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
