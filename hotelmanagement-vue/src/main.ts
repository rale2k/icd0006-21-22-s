import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'


import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import "@/assets/bootswatch.min.css"

import "@/assets/main.css"

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(router)

app.mount('#app')
