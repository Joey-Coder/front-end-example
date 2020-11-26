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

/**
 *
 * @param {String | Number} userId
 */
export const addFollow = userId => {
  return request({
    method: 'POST',
    url: 'app/v1_0/user/followings',
    data: {
      target: userId
    }
  })
}

/**
 *
 * @param {String | Number} userId
 */
export const deleteFollow = userId => {
  return request({
    method: 'DELETE',
    url: `app/v1_0/user/followings/${userId}`
  })
}

/**
 * 获取用户信息
 */
export const getUserProfile = () => {
  return request({
    method: 'GET',
    url: 'app/v1_0/user/profile'
  })
}

export const updateUserInfo = data => {
  return request({
    method: 'PATCH',
    url: 'app/v1_0/user/profile',
    data
  })
}
