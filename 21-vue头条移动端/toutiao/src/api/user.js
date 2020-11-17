// 用户相关的请求模块
import request from '@/utils/request'
// import store from '@/store/'

// 登录

export const login = data => {
  return request({
    method: 'POST',
    url: '/app/v1_0/authorizations',
    data
  })
}

// 获取验证码
export const sendSms = mobile => {
  return request({
    method: 'GET',
    url: `/app/v1_0/sms/codes/${mobile}`
  })
}

export const getCurrentUser = mobile => {
  return request({
    method: 'GET',
    url: 'app/v1_0/user'
  })
}

// 获取用户主页频道
export const getUserChannels = () => {
  return request({
    method: 'GET',
    url: 'app/v1_0/user/channels'
  })
}
