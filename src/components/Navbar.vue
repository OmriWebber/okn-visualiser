<script setup>
import { RouterLink } from 'vue-router';

</script>

<template>
    <header>
        <nav class="container">
            <div class="branding">
                <img class="logo" src="../assets/logo.png" alt="">
                <h1>OKN Visualiser</h1>
            </div>
            <ul class="nav-links">
                <RouterLink to="/">Home</RouterLink>
                <RouterLink to="/about">About</RouterLink>
                <button class="button uploadData">Upload Data</button>
            </ul>
        </nav>
    </header>
</template>



<style lang="scss" scoped>
    header {
        background-color: #f1f1f1;
        nav {
            display: flex;
            align-items: center;
            padding: 25px 16px;

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

                a {
                    text-decoration: none;
                    color: inherit;
                }

            }
        }
    }
</style>