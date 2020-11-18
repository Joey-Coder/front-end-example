// 搜索相关的请求模块
import request from '@/utils/request'

/**
 * 获取关键词建议
 * @param {String} q 搜索词
 */
export const getSuggestions = q => {
  return request({
    method: 'GET',
    url: '/app/v1_0/suggestion',
    params: { q }
  })
}
