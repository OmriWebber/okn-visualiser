<script>
import Papa from 'papaparse'
import { useDataStore } from "../components/store/store";
    

export default {
        setup: () => ({ dataStore: useDataStore() }),
        data() {
            return {
                csvData:[],
        }
    },
    
    methods: {
        csvToJson() {
            let csvStore = this.dataStore
            console.log(csvStore)
            let csvFile = this.$refs.file.files[0]

            if(csvFile == undefined) {
                alert("Please select a file.")
                this.csvData=[];
                return;
            }

            let that = this
            Papa.parse(csvFile, {
                header: true,
                dynamicTyping: true,
                complete: function(results) {
                    console.log(results.data)
                    csvStore.data = results.data
                }
            })
        }
    }
}
    
</script>

<template>
    <div class="fileUpload">
        <label>File<input type="file" ref="file" id="file" /></label>
        <button v-on:click="csvToJson()">Upload</button>
    </div>
</template>

<style lang="scss" scoped>

</style>