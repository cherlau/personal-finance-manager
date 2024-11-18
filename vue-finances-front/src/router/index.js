import Vue from 'vue'
import VueRouter from 'vue-router'

import { AUTH_TOKEN } from '@/plugins/apollo'
import AuthService from '@/modules/auth/services/auth-service'
import AuthRoutes from '@/modules/auth/router'
import DashboardRoutes from '@/modules/dashboard/router'

Vue.use(VueRouter)

const routes = [
  ...AuthRoutes,
  ...DashboardRoutes,
  { path: '', redirect: '/login' }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(async (to, from, next) => {
  console.log(to)

  if (to.matched.some(route => route.meta.requiresAuth)) {
    const token = window.localStorage.getItem(AUTH_TOKEN)
    const loginRoute = {
      path: '/login',
      query: { redirect: to.fullPath }
    }

    if (token) {
      try {
        console.log('Fetching user...')
        await AuthService.user({ fetchPolicy: 'network-only' })
        return next()
      } catch (error) {
        console.error(error)
        return next(loginRoute)
      }
    }
    return next(loginRoute)
  }
  next()
})

export default router
