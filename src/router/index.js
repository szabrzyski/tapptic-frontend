import { createRouter, createWebHistory } from 'vue-router'
import Form from '../components/Form.vue'
import Success from '../components/Success.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'form',
      component: Form
    },
    {
      path: '/success',
      name: 'success',
      component: Success
    },
  ]
})

export default router
