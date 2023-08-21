<script>
import { useManipStore } from '@/store'
import { storeToRefs } from 'pinia'
import { ref, watch, isProxy, toRaw, onUnmounted,  } from 'vue';

export default {
    data() {
        return {
            data: ref(null),
        };
    },
    setup() {
        const store = useManipStore();
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
                    <th scope="col">x_value</th>
                    <th scope="col">y_value</th>
                    <th scope="col">x_nom</th>
                    <th scope="col">y_nom</th>
                    <th scope="col">record_timestamp</th>
                    <th scope="col">sensor_timestamp</th>
                    <th scope="col">frame_rate</th>
                    <th scope="col">is_event</th>
                    <th scope="col">event_id</th>
                    <th scope="col">direction</th>
                    <th scope="col">updated_x_nom</th>
                    <th scope="col">updated_y_nom</th>
                    <th scope="col">updated_dXdt_nom</th>
                    <th scope="col">updated_dYdt_nom</th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="(item) in data" :key="item">
                    <td>{{ item.x_value }}</td>
                    <td>{{ item.y_value }}</td>
                    <td>{{ item.x_nom }}</td>
                    <td>{{ item.y_nom }}</td>
                    <td>{{ item.record_timestamp }}</td>
                    <td>{{ item.sensor_timestamp }}</td>
                    <td>{{ item.frame_rate }}</td>
                    <td>{{ item.is_event }}</td>
                    <td>{{ item.event_id }}</td>
                    <td>{{ item.direction }}</td>
                    <td>{{ item.updated_x_nom }}</td>
                    <td>{{ item.updated_y_nom }}</td>
                    <td>{{ item.updated_dXdt_nom }}</td>
                    <td>{{ item.updated_dYdt_nom }}</td>
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