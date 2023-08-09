<script>
import { ref, watch, isProxy, toRaw, onUnmounted } from 'vue';
import Chart from 'chart.js/auto'
import { useChartStore } from '@/store';


export default {
    setup() {
        const chartStore = useChartStore()

        const chart = ref(null)
        let chartInstance = null

        onUnmounted(() => {
            if (chartInstance) chartInstance.destroy()
        })

        watch(() => chartStore.data, (newData) => {
            
            
            let rawData = newData;

            if(isProxy(newData)) {
                rawData = toRaw(newData)
            }

            const data = {
                labels: rawData.map(row => row.t),
                datasets: [
                {
                    data: rawData.map(row => ({x: row.t, y: row.x})),
                    fill: false,
                    pointRadius: 1,
                    //borderColor: '#ff0000',
                    borderColor: rawData.map(row => row.is_sp ? '#00ff00' : row.is_qp ? '#ff0000' : '#ff0000'),
                }
                ]
            }

            console.log(data)

            const options = { responsive: true, maintainAspectRatio: true, plugins: { legend: {display: false} }}
            
            chartInstance = new Chart(chart.value, {
                type: 'line',
                data,
                options,
            })
        });

        return { chart }
    }
};


</script>


<template>
    <div class="col-8 wrapper graph-wrapper">
        <div class="graph">
            <h1>Graph</h1>
            <canvas ref="chart"></canvas>
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