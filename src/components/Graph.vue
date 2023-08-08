<script>
// Graph.vue
import { Line } from 'vue-chartjs';
import { ref, watch } from 'vue';
import { useChartStore } from '@/store/csvStore';

export default {
  extends: Line,
  data() {
    return {
      chartData: null,
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    };
  },
  watch: {
    chartData: (newData) => {
      this.renderChart(newData, this.options);
    }
  },
  mounted() {
    const chartStore = useChartStore();
    this.chartData = chartStore.data;

    watch(() => chartStore.data, (newData) => {
        this.chartData = newData;
    });
}
};







</script>


<template>
    <div class="col-8 wrapper graph-wrapper">
        <div class="graph">
            <h1>Graph</h1>
            <Line :data="data" :options="options" />

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