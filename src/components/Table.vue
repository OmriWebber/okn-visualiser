<script>
import { ref, onMounted, onUnmounted } from 'vue'
import Papa from 'papaparse'
import axios from 'axios'

export default {
    data() {
        return {
            csvData:[],
        }
    },
    methods: {
        csvToJson() {
            console.log("test")
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
                    that.csvData = results.data
                    console.log(that.csvData)
                }
            })
        }
    }
}
</script>

<template>
    <div class="col-12 wrapper table-wrapper">
        <div class="fileUpload">
            <label>
                File
                <input type="file" ref="file" id="file" />
            </label>
            <button v-on:click="csvToJson()">Upload</button>
        </div>
        <table>
            <thead>
                <tr>
                    <th scope="col">id</th>
                    <th scope="col">t</th>
                    <th scope="col">s</th>
                    <th scope="col">x</th>
                    <th scope="col">y</th>
                    <th scope="col">v</th>
                    <th scope="col">e</th>
                    <th scope="col">e1</th>
                    <th scope="col">t_local</th>
                    <th scope="col">blink</th>
                    <th scope="col">plateau</th>
                    <th scope="col">state</th>
                    <th scope="col">ramp_direction</th>
                    <th scope="col">sp_start_time</th>
                    <th scope="col">sp_end_time</th>
                    <th scope="col">sp_start_displacement</th>
                    <th scope="col">sp_end_displacement</th>
                    <th scope="col">sp_duration</th>
                    <th scope="col">qp_start_time</th>
                    <th scope="col">qp_end_time</th>
                    <th scope="col">qp_start_displacement</th>
                    <th scope="col">qp_end_displacement</th>
                    <th scope="col">qp_duration</th>
                    <th scope="col">chain_id</th>
                    <th scope="col">expected_sp_ramp_direction</th>
                    <th scope="col">expected_qp_ramp_direction</th>
                    <th scope="col">expected_qp_peak_velocity</th>
                    <th scope="col">expected_sp_end_peak_type</th>
                    <th scope="col">expected_sp_end_bound</th>
                    <th scope="col">result_id</th>
                    <th scope="col">result_chain_id</th>
                    <th scope="col">is_sp</th>
                    <th scope="col">is_qp</th>
                </tr>
            </thead>

            <tbody v-for="(data, i) in csvData" :key="i">
                <tr>
                    <td>{{ data.id }}</td>
                    <td>{{ data.t }}</td>
                    <td>{{ data.s }}</td>
                    <td>{{ data.x }}</td>
                    <td>{{ data.y }}</td>
                    <td>{{ data.v }}</td>
                    <td>{{ data.e }}</td>
                    <td>{{ data.e1 }}</td>
                    <td>{{ data.t_local }}</td>
                    <td>{{ data.blink }}</td>
                    <td>{{ data.plateau }}</td>
                    <td>{{ data.state }}</td>
                    <td>{{ data.ramp_direction }}</td>
                    <td>{{ data.sp_start_time }}</td>
                    <td>{{ data.sp_end_time }}</td>
                    <td>{{ data.sp_start_displacement }}</td>
                    <td>{{ data.sp_end_displacement }}</td>
                    <td>{{ data.sp_duration }}</td>
                    <td>{{ data.qp_start_time }}</td>
                    <td>{{ data.qp_end_time }}</td>
                    <td>{{ data.qp_start_displacement }}</td>
                    <td>{{ data.qp_end_displacement }}</td>
                    <td>{{ data.qp_duration }}</td>
                    <td>{{ data.chain_id }}</td>
                    <td>{{ data.expected_sp_ramp_direction }}</td>
                    <td>{{ data.expected_qp_ramp_direction }}</td>
                    <td>{{ data.expected_qp_peak_velocity }}</td>
                    <td>{{ data.expected_sp_end_peak_type }}</td>
                    <td>{{ data.expected_sp_end_bound }}</td>
                    <td>{{ data.result_id }}</td>
                    <td>{{ data.result_chain_id }}</td>
                    <td>{{ data.is_sp }}</td>
                    <td>{{ data.is_qp }}</td>
                </tr>
                
            </tbody>
        </table>

            

    </div>
</template>


<style lang="scss" scoped>
.table-wrapper {
    height: 600px;
    .table {
        max-height: 600px;
        overflow-y: scroll;
        max-width: 100px !important;
        overflow-x: hidden;
    }
}
    
</style>