const Login = () => import('@/modules/auth/views/Login.vue')

export default [
  {
    path: '/login',
    name: 'login',
    component: Login
  }
]
