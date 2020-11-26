import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 配置路由表
const routes = [
  // 路由懒加载
  { path: '/login', name: 'login', component: () => import('@/views/login/') },
  // 含有底边栏的页面
  {
    path: '/',
    component: () => import('@/views/layout/'),
    children: [
      {
        path: '', // 默认子路由，
        name: 'home',
        component: () => import('@/views/home/')
      },
      {
        path: '/question',
        name: 'question',
        component: () => import('@/views/question/')
      },
      {
        path: '/video',
        name: 'video',
        component: () => import('@/views/video/')
      },
      {
        path: '/my',
        name: 'my',
        component: () => import('@/views/my/')
      }
    ]
  },
  // 搜索
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/search/')
  },
  // 文章详情
  {
    path: '/article/:articleId',
    name: 'article',
    component: () => import('@/views/article/'),
    // 路由传递参数为组件的属性
    props: true
  },
  // 编辑个人信息
  {
    path: '/user/profile',
    name: 'user-profile',
    component: () => import('@/views/user-profile')
  }
]

const router = new VueRouter({
  routes
})

export default router
