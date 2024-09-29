import { createRouter, createWebHistory } from 'vue-router'
import { isAuthenticated } from '@/utils/supabase'
import LoginView from '@/views/auth/LoginView.vue'
import RegisterView from '@/views/auth/RegisterView.vue'
import DashboardView from '@/views/system/DashboardView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/system/dashboard',
      name: 'dashboard',
      component: DashboardView
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  const isLoggedIn = await isAuthenticated()

  if (!isLoggedIn && to.path.includes('/system')) return next({ name: 'login' })
  else if (isLoggedIn && (to.name === 'login' || to.name === 'register'))
    return next({ name: 'dashboard' })
  else next()
})

export default router
