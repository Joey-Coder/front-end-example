// 获取全部频道内容
import request from '@/utils/request'

export const getAllChannels = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/channels'
  })
}

// 获取全部频道内容

export const addUserChannels = data => {
  return request({
    method: 'PUT',
    url: '/app/v1_0/user/channels',
    data
  })
}

// 删除指定频道
export const deleteUserChannels = channelId => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/user/channels/${channelId}`
  })
}
