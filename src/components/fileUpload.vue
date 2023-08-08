<script>
import Papa from 'papaparse';
import { useChartStore } from '@/store/csvStore';

export default {
  methods: {
    processFile(event) {
      const file = event.target.files[0];
      
      if (file) {
        Papa.parse(file, {
          complete: (result) => {
            const chartStore = useChartStore();
            const labels = [];
            const data = [];

            // Assuming the CSV has two columns: Label and Value
            result.data.forEach(row => {
              labels.push(row[0]);
              data.push(row[1]);
            });

            chartStore.updateData({
              labels,
              datasets: [{
                label: 'CSV Data',
                backgroundColor: '#f87979',
                data
              }]
            });
          }
        });
      }
    }
  }
};
</script>

<template>
    <div class="fileUpload">
        <input type="file" @change="processFile($event)">
    </div>
</template>

<style lang="scss" scoped>

</style>