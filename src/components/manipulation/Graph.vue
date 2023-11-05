<script>
import { ref, watch, isProxy, toRaw, onUnmounted,  } from 'vue';
import Chart from 'chart.js/auto'

import { useManipStore } from '@/store/manip'



export default {
    setup() {
        const chartStore = useManipStore()

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

            let coloredDataset = []
            console.log(rawData)
            for (let i = 0; i < rawData.length; i++) {
                if (rawData[i].is_sp && !rawData[i].is_qp) {
                    coloredDataset.push({
                        data: {x: rawData[i].t, y: rawData[i].y},
                        fill: false,
                        pointRadius: 1,
                        borderColor: '#00ff00',
                    })
                } else if (rawData[i].is_qp && !rawData[i].is_sp) {
                    coloredDataset.push({
                        data: {x: rawData[i].t, y: rawData[i].y},
                        fill: false,
                        pointRadius: 1,
                        borderColor: '#ff0000',
                    })
                } else {
                    coloredDataset.push({
                        data: {x: rawData[i].t, y: rawData[i].y},
                        fill: false,
                        pointRadius: 1,
                        borderColor: '#000000',
                    })
                }
            }
                
            console.log(rawData.map(row => ({x: row.t, y: row.x})))

            const data = {
                labels: rawData.map(row => row.t),
                datasets: [
                {
                    data: rawData.map(row => ({x: row.t, y: row.x})),
                    fill: false,
                    pointRadius: 1,
                    //borderColor: '#ff0000',
                    borderColor: rawData.map(row => row.is_sp ? '#ff0000' : row.is_qp ? '#00ff00' : '#000000'),

                }
                ]
            }

            const options = { 
                responsive: true, 
                maintainAspectRatio: true, 
                fill: false,
                interaction: {
                    intersect: false
                },
                radius: 0,
                plugins: { 
                    legend: {
                        display: false
                    } 
                },
                
            }
            
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
        height: 100%;
        .graph {
            max-width: 100%;
        }
    }
    

</style>