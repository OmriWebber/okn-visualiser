<script setup>
import { useManipStore } from '@/store/manip'
import { useConfigStore } from '@/store/config'
import { ref, watch } from 'vue'

const manipStore = useManipStore();
const configStore = useConfigStore();
 
const minYValue = ref(manipStore.defaultConfig.minYValue)
const maxYValue = ref(manipStore.defaultConfig.maxYValue)
const amplitudeValue = ref(manipStore.defaultConfig.Amplitude)
const rampingValue = ref(manipStore.defaultConfig.Ramping)


const updateMinYSlider = (val) => {
  configStore.updateMinY(val)
}

const updateMaxYSlider = (val) => {
  configStore.updateMaxY(val)
}

const updateAmplitudeSlider = (val) => {
  configStore.updateAmplitude(val)
}

const updateRampingSlider = (val) => {
  configStore.updateRamping(val)

}

const formatTooltip = (val) => {
  return val / 100
}

const downloadData = () => {
    // Convert the data to a JSON string
    const jsonStr = JSON.stringify(manipStore.data);

    // Create a Blob from the JSON string
    const blob = new Blob([jsonStr], { type: 'application/json' });

    // Create a URL from the Blob
    const url = URL.createObjectURL(blob);

    // Create a download link and click it programmatically
    const link = document.createElement('a');
    const today = new Date();
    const date = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate();
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const timestamp = date + ' ' + time;
    link.href = url;
    link.download = 'Updated Data - ' + timestamp + '.json';
    link.click();

    // Revoke the URL
    URL.revokeObjectURL(url);
};
</script>

<template>
    <div class="wrapper controls-wrapper">
        <div class="controls container">
            <div class="row">
                <h3 class="col-md-8">Controls</h3>
                <el-button type="primary" class="col-md-4" @click="downloadData">Export</el-button>
            </div>
            <div class="row">
                <div class="slider-demo-block">
                    <span class="demonstration">Min Y</span>
                    {{ formatTooltip(minYValue).toFixed(3) }}
                    <el-slider v-model="minYValue" @change="updateMinYSlider" :min=manipStore.defaultConfig.minYValue*100 :max=manipStore.defaultConfig.maxYValue*100 step="0.01" :format-tooltip="formatTooltip" />
                </div>
                <div class="slider-demo-block">
                    <span class="demonstration">Max Y</span>
                    {{ formatTooltip(maxYValue).toFixed(3) }}
                    <el-slider v-model="maxYValue" @change="updateMaxYSlider" :min=manipStore.defaultConfig.maxYValue*100 :max=(manipStore.defaultConfig.maxYValue*100)+1 step="0.01" :format-tooltip="formatTooltip" />
                </div>
                <div class="slider-demo-block">
                    <span class="demonstration">Amplitude</span>
                    <el-slider v-model="amplitudeValue" @change="updateAmplitudeSlider" :min="0" :max="10" :format-tooltip="formatTooltip" />
                </div>
                <div class="slider-demo-block">
                    <span class="demonstration">Ramping</span>
                    <el-slider v-model="rampingValue" @change="updateRampingSlider" :min="0" :max="10" :format-tooltip="formatTooltip" />
                </div>
            </div>

            <div class="row" style="justify-content: space-evenly; margin-top:30px;">
                <el-button class="col-5" type="danger">Reset</el-button>
                <el-button class="col-5" type="success">Apply</el-button>
            </div>
            
        </div>

    </div>
</template>


<style lang="scss" scoped>
    .controls-wrapper {
        height: 600px;
        .controls {
            max-width: 100%;
        }
    }
</style>