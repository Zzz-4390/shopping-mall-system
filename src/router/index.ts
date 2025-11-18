import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/HomePage.vue'
import Login from '@/pages/LoginPage.vue'
import Register from '@/pages/RegisterPage.vue'
import Message from '@/pages/MessagePage.vue'
import Profile from '@/pages/ProfilePage.vue'
import Cart from '@/pages/CartPage.vue'

const routes = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/register',
    component: Register,
  },
  {
    // path: '/message/:id',
    path: '/message',
    component: Message,
  },
  {
    // path: '/profile/:id',
    path: '/profile',
    component: Profile,
  },
  {
    // path: '/cart/:id',
    path: '/cart',
    component: Cart,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
