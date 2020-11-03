import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'
import Users from '../components/users/Users.vue'
import Rights from '../components/power/Rights.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  {
    path: '/home',
    component: Home,
    redirect: '/welcome',
    // welcome 是home的子组件
    children: [
      { path: '/welcome', component: Welcome },
      // 用户列表子路由
      { path: '/users', component: Users },
      // 权限管理
      { path: '/rights', component: Rights }
    ]
  }
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
