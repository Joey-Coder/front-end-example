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

/**
 *
 * @param {Object} params {page:1, per_page:10, q:'python'}
 */
export const getResults = params => {
  return request({
    method: 'GET',
    url: '/app/v1_0/search',
    params
  })
}
