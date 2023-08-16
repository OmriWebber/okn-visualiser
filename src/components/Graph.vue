<script>
import { ref, watch, isProxy, toRaw, onUnmounted,  } from 'vue';
import Chart from 'chart.js/auto'

import { useChartStore } from '@/store';


export default {
    setup() {
        const chartStore = useChartStore()

        const chart = ref(null)
        let chartInstance = null

        const skipped = (ctx, value) => ctx.p0.skip || ctx.p1.skip ? value : undefined;
        const down = (ctx, value) => ctx.p0.parsed.y > ctx.p1.parsed.y ? value : undefined;

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
                        data: {x: rawData[i].t, y: rawData[i].x},
                        fill: false,
                        pointRadius: 1,
                        borderColor: '#00ff00',
                    })
                } else if (rawData[i].is_qp && !rawData[i].is_sp) {
                    coloredDataset.push({
                        data: {x: rawData[i].t, y: rawData[i].x},
                        fill: false,
                        pointRadius: 1,
                        borderColor: '#ff0000',
                    })
                } else {
                    coloredDataset.push({
                        data: {x: rawData[i].t, y: rawData[i].x},
                        fill: false,
                        pointRadius: 1,
                        borderColor: '#000000',
                    })
                }
            }
                

            const data = {
                labels: rawData.map(row => row.t),
                datasets : coloredDataset
            }

            function getBorderColor(row) {
                let color
                if (row.is_sp && !row.is_qp) {
                    color = '#00ff00'
                } else if (row.is_qp && !row.is_sp) {
                    color = '#ff0000'
                } else {
                    color = '#000000'
                }
                console.log(color)
                return color
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
                }
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