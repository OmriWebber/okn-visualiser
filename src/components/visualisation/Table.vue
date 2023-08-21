<script>
import { useVisualStore } from '@/store'
import { storeToRefs } from 'pinia'
import { ref, watch, isProxy, toRaw, onUnmounted,  } from 'vue';

export default {
    data() {
        return {
            data: ref(null),
        };
    },
    setup() {
        const store = useVisualStore();
        let storeData = storeToRefs(store).getData;

        onUnmounted(() => {
            return { data : null }
        })

        watch(() => storeData, (newData) => {
            if (isProxy(newData)) {
                storeData = toRaw(newData);
            }
        });
        return { data: storeData };
    }
}


</script>

<template>
    <div class="wrapper table-wrapper">
        <table class="table table-striped table-hover">
            <thead class="table-sticky table-dark">
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

            <tbody>
                <tr v-for="(item) in data" :key="item">
                    <td>{{ item.id }}</td>
                    <td>{{ item.t }}</td>
                    <td>{{ item.s }}</td>
                    <td>{{ item.x }}</td>
                    <td>{{ item.y }}</td>
                    <td>{{ item.v }}</td>
                    <td>{{ item.e }}</td>
                    <td>{{ item.e1 }}</td>
                    <td>{{ item.t_local }}</td>
                    <td>{{ item.blink }}</td>
                    <td>{{ item.plateau }}</td>
                    <td>{{ item.state }}</td>
                    <td>{{ item.ramp_direction }}</td>
                    <td>{{ item.sp_start_time }}</td>
                    <td>{{ item.sp_end_time }}</td>
                    <td>{{ item.sp_start_displacement }}</td>
                    <td>{{ item.sp_end_displacement }}</td>
                    <td>{{ item.sp_duration }}</td>
                    <td>{{ item.qp_start_time }}</td>
                    <td>{{ item.qp_end_time }}</td>
                    <td>{{ item.qp_start_displacement }}</td>
                    <td>{{ item.qp_end_displacement }}</td>
                    <td>{{ item.qp_duration }}</td>
                    <td>{{ item.chain_id }}</td>
                    <td>{{ item.expected_sp_ramp_direction }}</td>
                    <td>{{ item.expected_qp_ramp_direction }}</td>
                    <td>{{ item.expected_qp_peak_velocity }}</td>
                    <td>{{ item.expected_sp_end_peak_type }}</td>
                    <td>{{ item.expected_sp_end_bound }}</td>
                    <td>{{ item.result_id }}</td>
                    <td>{{ item.result_chain_id }}</td>
                    <td>{{ item.is_sp }}</td>
                    <td>{{ item.is_qp }}</td>
                </tr>
                
            </tbody>
        </table>

            

    </div>
</template>


<style lang="scss" scoped>
.table-wrapper {
    width: 100%;
    height: 600px;
    overflow: scroll;
    .table {
        th,td {
            border: 1px solid black;
        }
        tbody td:first-child {
            position: sticky;
            left: 0;
            margin-left: -1px;
            background-color: rgba($color: #dfdfdf, $alpha: 1)
        }

        thead th:first-child {
            position: sticky;
            left: 0;
            margin-left: -1px;
        }
    }
}
    
</style>