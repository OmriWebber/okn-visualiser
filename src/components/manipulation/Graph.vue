<script>
import { ref, watch, isProxy, toRaw, onUnmounted,  } from 'vue';
import Chart from 'chart.js/auto'
import zoomPlugin from 'chartjs-plugin-zoom';

import { useManipStore } from '@/store/manip'

Chart.register(zoomPlugin);

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

            // Format data for chart
            let formattedData = []
            let labels = []
            let oknStatus = []
            for (let i = 0; i < rawData.length; i++) {
                if(rawData[i].state == 'IN_SP') {
                    oknStatus.push('green')
                } else if(rawData[i].state == 'IN_QP') {
                    oknStatus.push('red')
                } else {
                    oknStatus.push('black')
                }

                // Account for first point being a plateau and shifting the oknStatus array
                if (i == 0) {
                    oknStatus.pop()
                }

                labels.push(Math.round(rawData[i].t * 1000) / 1000)
                formattedData.push(rawData[i].x * -1)
            }

            // Create data object for chart
            const data = {
                labels: labels,
                datasets: [{
                    label : 'Eye X Position by Time',
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


            const options = { 
                responsive: true, 
                maintainAspectRatio: true, 
                fill: false,
                plugins: { 
                    legend: {
                        display: true
                    },
                    zoom: {
                        zoom: {
                            wheel: {
                                enabled: true,
                            },
                            pinch: {
                                enabled: true
                            },
                            mode: 'xy',
                        },
                        pan: {
                            enabled: true,
                            mode: 'xy',
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                let label = context.formattedValue || '';
                                if (label) {
                                    label += '\n\n';
                                }
                                if (context.dataset.borderColor[context.dataIndex] == 'green') {
                                    label += 'OKN Status: In Slow Phase';
                                } else if (context.dataset.borderColor[context.dataIndex] == 'red') {
                                    label += 'OKN Status: In Quick Phase';
                                } else {
                                    label += 'OKN Status: Not Found';
                                }
                                return label;
                            }
                        }
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

        const resetZoom = () => {
            chartInstance.resetZoom();
        }

        return { chart, focusedPoint: chartStore.focusedPoint, resetZoom }
    }
};


</script>


<template>
    <div class="wrapper graph-wrapper">
        <div class="graph">
            <canvas ref="chart"></canvas>
        </div>
        <el-button class="resetZoom" type="info" @click="resetZoom">Reset Zoom</el-button>
    </div>
</template>

<style lang="scss" scoped>
    .graph-wrapper {
        height: 150%;
        .graph {
            max-width: 100%;
        }
    }
    

</style>