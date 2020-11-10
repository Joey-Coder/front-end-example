import Vue from 'vue'
import VueRouter from 'vue-router'
// import Login from '../components/Login.vue'
// import Home from '../components/Home.vue'
// import Welcome from '../components/Welcome.vue'
// import Users from '../components/users/Users.vue'
// import Rights from '../components/power/Rights.vue'
// import Roles from '../components/power/Roles.vue'
// import Cate from '../components/goods/Cate.vue'
// import Params from '../components/goods/Params.vue'
// import List from '../components/goods/List.vue'
// import Add from '../components/goods/Add.vue'
// import Order from '../components/order/Order.vue'
// import Report from '../components/report/Report.vue'

// 路由懒加载
const Login = () =>
  import(/* webpackChunkName: "login_home_welcome" */ '../components/Login.vue')
const Home = () =>
  import(/* webpackChunkName: "login_home_welcome" */ '../components/Home.vue')
const Welcome = () =>
  import(
    /* webpackChunkName: "login_home_welcome" */ '../components/Welcome.vue'
  )

const Users = () =>
  import(/* webpackChunkName: "users" */ '../components/users/Users.vue')
const Rights = () =>
  import(/* webpackChunkName: "power" */ '../components/power/Rights.vue')
const Roles = () =>
  import(/* webpackChunkName: "power" */ '../components/power/Roles.vue')
const Add = () =>
  import(/* webpackChunkName: "goods" */ '../components/goods/Add.vue')
const Cate = () =>
  import(/* webpackChunkName: "goods" */ '../components/goods/Cate.vue')
const List = () =>
  import(/* webpackChunkName: "goods" */ '../components/goods/List.vue')
const Params = () =>
  import(/* webpackChunkName: "goods" */ '../components/goods/Params.vue')
const Order = () =>
  import(/* webpackChunkName: "order" */ '../components/order/Order.vue')
const Report = () =>
  import(
    /* webpackChunkName: "login_home_welcome" */ '../components/report/Report.vue'
  )

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
      { path: '/rights', component: Rights },
      // 角色
      { path: '/roles', component: Roles },
      // 商品分类
      { path: '/categories', component: Cate },
      // 商品参数
      { path: '/params', component: Params },
      // 商品列表
      { path: '/goods', component: List },
      // 添加商品
      { path: '/goods/add', component: Add },
      // 订单列表
      { path: '/orders', component: Order },
      // 报表
      { path: '/reports', component: Report }
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
