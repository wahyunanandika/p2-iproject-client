import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import LoginPage from '../views/LoginPage.vue'
import RegisterPage from '../views/RegisterPage.vue'
import PlayerDetail from '../views/PlayerDetail.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage

    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterPage
    },
    {
      path: '/:id',
      name: 'detailplayer',
      component: PlayerDetail
    }
  ]
})

router.beforeEach((to, from, next) => {
  const isLogin = !!localStorage.access_token
  const status = localStorage.status
  if (isLogin && (to.name === 'register' || to.name == 'login')) {
    next({ name: 'home' })
  } else if (!isLogin && to.name === 'detailplayer') {
    next({ name: 'login' })
  } else if ((isLogin && status === 'member') && to.name === 'detailplayer') {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Subscribe First',
      footer: '<a href="">Why do I have this issue?</a>'
    })
    next({ name: 'home' })
  } else {
    next()
  }
})

export default router
