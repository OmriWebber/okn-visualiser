<script setup>
import { useManipStore } from '@/store/manip'
import { ref } from 'vue'

const manipStore = useManipStore();
console.log(manipStore)
 
const value1 = ref(manipStore.maxXValue)
const value2 = ref(0)
const value3 = ref(0)
const value4 = ref(0)
const value5 = ref(0)

const updateMaxXSlider = (val) => {
  manipStore.updateMaxXValue(val)
}

const formatTooltip = (val) => {
  return val / 100
}
</script>

<template>
    <div class="wrapper controls-wrapper">
        <div class="controls container">
            <div class="row">
                <h3 class="col-md-8">Controls</h3>
                <el-button type="primary" class="col-md-4">Export</el-button>
            </div>
            <div class="row">
                <div class="slider-demo-block">
                    <span class="demonstration">Max X</span>
                    <el-slider v-model="value1" @change="updateMaxXSlider" :format-tooltip="formatTooltip" />
                </div>
                <div class="slider-demo-block">
                    <span class="demonstration">Max Y</span>
                    <el-slider v-model="value2" :format-tooltip="formatTooltip" />
                </div>
                <div class="slider-demo-block">
                    <span class="demonstration">Max Acceleration</span>
                    <el-slider v-model="value3" :format-tooltip="formatTooltip" />
                </div>
                <div class="slider-demo-block">
                    <span class="demonstration">Max Deceleration</span>
                    <el-slider v-model="value4" :format-tooltip="formatTooltip" />
                </div>
                <div class="slider-demo-block">
                    <span class="demonstration">DX</span>
                    <el-slider v-model="value5" :format-tooltip="formatTooltip" />
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