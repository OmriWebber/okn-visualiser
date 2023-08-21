<script>
import Papa from 'papaparse';
import { useManipStore } from '@/store';


export default {
  methods: {
    handleFileUpload(event) {
        const file = event.target.files[0];
        const chartStore = useManipStore();

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