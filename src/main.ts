import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import axios from 'axios'

import './assets/main.css'
import { createApp } from 'vue'

// Configure axios defaults
axios.defaults.baseURL = import.meta.env.VITE_API_URL || 'http://localhost:8080'
axios.defaults.headers.common['Content-Type'] = 'application/json'

// Create Vue app instance
const app = createApp(App)

// Create and use Pinia store
app.use(createPinia())

// Use router
app.use(router)

// Mount app
app.mount('#app') 