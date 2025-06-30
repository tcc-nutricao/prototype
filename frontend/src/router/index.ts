import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import LoadingFeatures from '../views/LoadingFeatures.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/loading-features',
    name: 'LoadingFeatures',
    component: LoadingFeatures
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
