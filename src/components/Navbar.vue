<script setup>
import { RouterLink } from 'vue-router';
import { useVisualStore } from '@/store/visual'
import { useManipStore } from '@/store/manip'
import Papa from 'papaparse';


import csv from '@/assets/testData/signal.csv';

function handleFileUpload() {
    console.log("test");
    const file = csv;
    const manipStore = useManipStore();
    const visualStore = useVisualStore();
    manipStore.setData(csv);
    visualStore.setData(csv);
    if (file) {
        Papa.parse(file, {
            header: false,
            dynamicTyping: true,
            complete: result => {
                const data = result.data;
                console.log(data)
                
            }
        });
    }
}

</script>

<template>
    <header>
        <nav class="container">
            <div class="branding">
                <img class="logo" src="../assets/logo.png" alt="">
                <h1>OKN Visualiser</h1>
            </div>
            <ul class="nav-links">
                <RouterLink to="/">Visualisation</RouterLink>
                <RouterLink to="/manipulation">Manipulation</RouterLink>
                <el-button type="info" id="loadTestData" @click="handleFileUpload">Load Test Data</el-button>
            </ul>
        </nav>
    </header>
</template>



<style lang="scss" scoped>
    header {
        background-color: #202020;
        nav {
            display: flex;
            align-items: center;
            padding: 25px 16px;
            color: rgb(216, 216, 216);

            .branding {
                display: flex;
                align-items: center;
                gap: 8px;

                img {
                    max-width: 50px
                }

                h1 {
                    font-size: 24px;
                }
            }

            .nav-links {
                display: flex;
                flex: 1;
                justify-content: flex-end;
                gap: 12px;
                list-style: none;
                margin-bottom: 0px;
                margin-top: 10px;

                a {
                    text-decoration: none;
                    color: inherit;
                }

            }
        }
    }
</style>