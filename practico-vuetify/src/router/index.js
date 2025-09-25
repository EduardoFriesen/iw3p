import { createRouter, createWebHistory } from 'vue-router'
import { auth } from '@/auth/session'

import Home from '@/views/Home.vue'
import Productos from '@/views/Productos.vue'
import ProductoDetalle from '@/views/ProductoDetalle.vue'
import Clientes from '@/views/Clientes.vue'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'

const routes = [
  { path: '/', name: 'Home', component: Home, meta: { requiresAuth: true } },
  { path: '/productos', name: 'Productos', component: Productos, meta: { requiresAuth: true } },
  { path: '/productos/:id', name: 'ProductoDetalle', component: ProductoDetalle, props: true, meta: { requiresAuth: true } },
  { path: '/clientes', name: 'Clientes', component: Clientes, meta: { requiresAuth: true } },
  { path: '/login', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: Register },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Guardia de navegación global
router.beforeEach((to, from, next) => {
  const requiresAuth = to.meta.requiresAuth

  if (requiresAuth && !auth.isAuthenticated.value) {
    next('/login')
  } else if ((to.path === '/login' || to.path === '/register') && auth.isAuthenticated.value) {
    // Si ya estás logueado, no podés ir a login o register
    next('/')
  } else {
    next()
  }
})
router.beforeEach((to, from, next) => {
  const requiresAuth = to.meta.requiresAuth

  if (requiresAuth && !auth.isAuthenticated.value) {
    next('/login')
  } else if ((to.path === '/login' || to.path === '/register') && auth.isAuthenticated.value) {
    next('/')
  } else {
    next()
  }
})


export default router
