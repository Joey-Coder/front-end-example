const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: '/button', component: () => import('pages/Button.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  },
  // youtube
  {
    path: '/youtube',
    component: () => import('pages/youtube.vue')
  },
  // whatsapp

  {
    path: '/whatsapp',
    component: () => import('pages/whatsapp.vue'),
    children: [{ path: '', component: () => import('pages/Index.vue') }]
  }
]

export default routes