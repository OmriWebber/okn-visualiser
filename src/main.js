import './assets/main.scss'

import { createApp } from 'vue';
import App from './App.vue';
import router from './router'
import {VueCsvImportPlugin} from "vue-csv-import";


const app = createApp(App)
app.use(router)
app.use(VueCsvImportPlugin)
app.mount('#app')
