import { createApp } from 'vue'
import App from './App.vue'
import './index.css'  
import router from './router'
import axios from 'axios'

axios.defaults.withCredentials = true

const app = createApp(App)

app.use(router)

const components = import.meta.glob('./components/**/*.vue', { eager: true })

Object.entries(components).forEach(([path, definition]) => {
  const name = path
    .split('/')
    .pop()
    ?.replace(/\.\w+$/, '') || ''
  
  app.component(name, (definition as any).default)
})

app.mount('#app')