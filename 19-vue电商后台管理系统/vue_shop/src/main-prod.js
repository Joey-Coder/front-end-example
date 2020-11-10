import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import './plugins/element.js'
import './assets/css/global.css'
import axios from 'axios'
import TreeTable from 'vue-table-with-tree-grid'
// 富文本依赖
import VueQuillEditor from 'vue-quill-editor'
// import 'quill/dist/quill.core.css' // import styles
// import 'quill/dist/quill.snow.css' // for snow theme
// import 'quill/dist/quill.bubble.css' // for bubble theme

//
import NProgress from 'nprogress'
// import 'nprogress/nprogress.css'

axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
// 使用拦截器设置header登陆token凭证
axios.interceptors.request.use(config => {
  NProgress.start(0.2)
  config.headers.Authorization = window.sessionStorage.getItem('token')
  // 必须return config
  return config
})

// 拦截response
axios.interceptors.response.use(config => {
  NProgress.done()
  return config
})

// 挂载属性
Vue.prototype.$http = axios

Vue.config.productionTip = false

// 注册表格插件
Vue.component('tree-table', TreeTable)

// 定义日期过滤器
Vue.filter('dateFormat', function(originVal) {
  const dt = new Date(originVal)
  const year = dt.getFullYear()
  // 字符串填充
  const month = (dt.getMonth() + 1 + '').padStart(2, '0')
  const day = (dt.getDate() + '').padStart(2, '0')
  const hour = (dt.getHours() + '').padStart(2, '0')
  const minute = (dt.getMinutes() + '').padStart(2, '0')
  const second = (dt.getSeconds() + '').padStart(2, '0')
  return `${year}-${month}-${day} ${hour}:${minute}:${second}`
})

// editor
Vue.use(VueQuillEditor)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
