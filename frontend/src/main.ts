import { createApp } from 'vue'
import App from './App.vue'
// import router from './router'
// import store from './store'
import axios from 'axios'

axios.defaults.withCredentials = true

const app = createApp(App)

// const requireComponent = require.context('./components', true, /\.vue$/)

// requireComponent.keys().forEach((fileName) => {
//   const componentConfig = requireComponent(fileName)
//   const componentName = fileName
//     .split('/')
//     .pop()
//     .replace(/\.\w+$/, '')
//   app.component(componentName, componentConfig.default || componentConfig)
// })

// app.use(store)
// app.use(router)

app.mount('#app')