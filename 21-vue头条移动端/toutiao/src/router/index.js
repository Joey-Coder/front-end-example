import Vue from 'vue'
import VueRouter from 'vue-router'
import { Dialog } from 'vant'
import store from '@/store'

Vue.use(VueRouter)

// 配置路由表
const routes = [
  // 路由懒加载
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/'),
    meta: { requiresAuth: false }
  },
  // 含有底边栏的页面
  {
    path: '/',
    component: () => import('@/views/layout/'),
    children: [
      {
        path: '', // 默认子路由，
        name: 'home',
        component: () => import('@/views/home/'),
        meta: { requiresAuth: false }
      },
      {
        path: '/question',
        name: 'question',
        component: () => import('@/views/question/'),
        meta: { requiresAuth: false }
      },
      {
        path: '/video',
        name: 'video',
        component: () => import('@/views/video/'),
        meta: { requiresAuth: false }
      },
      {
        path: '/my',
        name: 'my',
        component: () => import('@/views/my/'),
        meta: { requiresAuth: false }
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
    component: () => import('@/views/user-profile'),
    meta: { requiresAuth: true }
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  // 如果以登录，则直接通过
  if (store.state.user) {
    return next()
  }
  // 需要登录
  if (to.meta.requiresAuth) {
    Dialog.confirm({
      title: '访问提示',
      message: '该功能需要登录才能访问，需要登录么？'
    })
      .then(() => {
        next()
      })
      .catch(() => {
        // 取消，中断导航
        next(false)
      })
  } else {
    next()
  }
})

export default router
