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
                <RouterLink to="/">Visualisation</RouterLink>
                <RouterLink to="/manipulation">Manipulation</RouterLink>
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