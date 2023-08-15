<script>
import { ref, watch, isProxy, toRaw, onUnmounted,  } from 'vue';
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
            if (chartInstance) chartInstance.destroy()
            
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
                    borderColor: rawData.map(row => row.is_sp ? '#00ff00' : row.is_qp ? '#ff0000' : '#000000'),
                }
                ]
            }

            const options = { responsive: true, maintainAspectRatio: true, plugins: { legend: {display: false} }}
            
            chartInstance = new Chart(chart.value, {
                type: 'line',
                data,
                options,
            })

            function clickHandler(evt) {
                const points = chartInstance.getElementsAtEventForMode(evt, 'nearest', { intersect: true }, true);
                if (points.length) {
                    const firstPoint = points[0];
                    const label = chartInstance.data.labels[firstPoint.index];
                    const value = chartInstance.data.datasets[firstPoint.datasetIndex].data[firstPoint.index];
                    
                    chartStore.setFocusedPoint(value);
                    console.log(chartStore.focusedPoint);

                    let rawPoint = chartStore.focusedPoint;

                    if(isProxy(rawPoint)) {
                        rawPoint = toRaw(chartStore.focusedPoint)
                    }
                    chartStore.setFocusedPoint(rawPoint);

                }
            }

            chartInstance.options.onClick = clickHandler;
        });

        return { chart, focusedPoint: chartStore.focusedPoint }
    }
};


</script>


<template>
    <div class="wrapper graph-wrapper">
        <div class="graph">
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