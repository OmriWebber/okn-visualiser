<script>
import Slider from '@vueform/slider'
import { useManipStore } from '@/store';
import { storeToRefs } from 'pinia';


export default {
    components: {
      Slider,
    },
    data() {
      return {
        data : []
      }
    },
    setup() {
        const chartStore = useManipStore()
        let storeData = storeToRefs(chartStore);

        console.log(storeData)
        return { storeData }
    }
  }

</script>

<template>
    <div class="wrapper controls-wrapper">
        <div class="controls"><h1>Controls</h1></div>
        <Slider v-model="data.x" min="" />

    </div>
</template>

<style src="@vueform/slider/themes/default.css"></style>

<style lang="scss" scoped>
    .controls-wrapper {
        height: 600px;
        .controls {
            max-width: 100%;
        }
    }
</style>