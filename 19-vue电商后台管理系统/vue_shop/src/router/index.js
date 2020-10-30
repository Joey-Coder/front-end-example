import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  { path: '/home', component: Home }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  // to 表示去哪个页面
  // from 从哪个页面来的
  // next 继续跳转
  if (to.path === '/login') return next()
  const tokenStr = window.sessionStorage.getItem('token')
  // 此处没有验证token的正确性
  if (!tokenStr) return next('/login')
  next()
})

export default router
