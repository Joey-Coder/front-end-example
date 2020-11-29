// 封装请求模块
import axios from 'axios'
import store from '@/store'
import JSONbig from 'json-bigint'
import { Toast } from 'vant'
import router from '@/router/'

const refreshTokenReq = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/'
})

const request = axios.create({
  // 基础路径
  baseURL: 'http://ttapi.research.itcast.cn/',
  transformResponse: [
    // 处理大数
    function(data) {
      try {
        return JSONbig.parse(data)
      } catch (err) {
        console.log('转换失败', err)
        return data
      }
    }
  ]
})

// 请求拦截器
request.interceptors.request.use(
  function(config) {
    const { user } = store.state
    if (user) {
      config.headers.Authorization = `Bearer ${user.token}`
    }
    return config
  },
  function(error) {
    return Promise.reject(error)
  }
)

// 响应拦截器
request.interceptors.response.use(
  // 响应码为2xx
  function(response) {
    return response
  },
  // 响应码除去2xx
  async function(error) {
    const status = error.response.status
    if (status === 400) {
      Toast.fail('客户端参数异常')
    } else if (status === 401) {
      const { user } = store.state
      if (!user || !user.token) {
        return redirectLogin()
      }
      try {
        const { data } = await refreshTokenReq({
          method: 'PUT',
          url: '/app/v1_0/authorizations',
          headers: {
            Authorization: `Bearer ${user.refresh_token}`
          }
        })
        // 更新token
        user.token = data.data.token
        store.commit('setUser', user)
      } catch (err) {
        return redirectLogin()
      }
      Toast.fail('登录过时')
    } else if (status === 403) {
      Toast.fail('没有操作权限')
    } else if (status >= 500) {
      Toast.fail('服务端错误')
    }
    return Promise.reject(error)
  }
)

//
function redirectLogin() {
  // push 方法会形成历史记录，replace则不会
  // router.replace('/login')
  router.replace({
    name: 'login',
    query: {
      // 记录跳转前的路由路径
      redirect: router.currentRoute.fullPath
    }
  })
}

export default request
