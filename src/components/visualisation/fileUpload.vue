<script>
import Papa from 'papaparse';
import { useVisualStore } from '@/store/visual'


export default {
  methods: {
    handleFileUpload(event) {
        const file = event.target.files[0];
        const chartStore = useVisualStore();

        if (file) {
            Papa.parse(file, {
                header: true,
                dynamicTyping: true,
                complete: result => {
                    const data = result.data;
                    console.log(data)
                    chartStore.setData(data);
                }
            });
        }
    }
  }
};
</script>

<template>
    <div class="fileUpload">
        <input type="file" @change="handleFileUpload">
    </div>
</template>

<style lang="scss" scoped>

</style>