import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store' // Make sure this is correctly imported
import './assets/main.css'

const app = createApp(App)

app.use(router) // Adding router to the app
app.use(store) // Make sure you are using the store

console.log(store);
app.mount('#app') // Mount the app
