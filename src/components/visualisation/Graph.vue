<script>
import { ref, watch, isProxy, toRaw, onUnmounted,  } from 'vue';
import Chart from 'chart.js/auto'
import { useVisualStore } from '@/store/visual'

export default {
    setup() {
        const chartStore = useVisualStore()

        const chart = ref(null)
        let chartInstance = null

        onUnmounted(() => {
            if (chartInstance) chartInstance.destroy()
        })

        // Watch for changes in store data
        watch(() => chartStore.data, (newData) => {
            if (chartInstance) chartInstance.destroy()
            
            let rawData = newData;

            if(isProxy(newData)) {
                rawData = toRaw(newData)
            }

            // Format data for chart
            let formattedData = []
            let labels = []
            let oknStatus = []
            for (let i = 0; i < rawData.length; i++) {
                if((rawData[i].is_sp == 'true' && rawData[i].is_qp == 'false') || (rawData[i].is_sp == true && rawData[i].is_qp == false)) {
                    oknStatus.push('green')
                } else if((rawData[i].is_qp == 'true' && rawData[i].is_sp == 'false') || (rawData[i].is_qp == true && rawData[i].is_sp == false)) {
                    oknStatus.push('red')
                } else {
                    oknStatus.push('black')
                }

                labels.push(Math.round(rawData[i].t * 1000) / 1000)
                formattedData.push(rawData[i].x * -1)
            }

            // Create data object for chart
            const data = {
                labels: labels,
                datasets: [{
                    label : 'X Position',
                    data : formattedData,
                    fill: false,
                    pointRadius: 1,
                    spanGaps: true,
                    borderColor: oknStatus,
                    segment: {
                        borderColor: ctx => {
                            let index = ctx.p0.parsed.x;
                            return oknStatus[index];
                        }
                    }
                }]
                    
            }

            // Chart options
            const options = { 
                responsive: true, 
                maintainAspectRatio: true, 
                plugins: { 
                    legend: {
                        display: false
                    } 
                },
            }
            
            // Create chart
            chartInstance = new Chart(chart.value, {
                type: 'line',
                data,
                options,
            })

            // Add click handler to chart
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