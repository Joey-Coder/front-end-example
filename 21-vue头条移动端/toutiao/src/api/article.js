import request from '@/utils/request'

// 获取栏目的文章数据
export const getArticles = params => {
  return request({
    method: 'GET',
    url: '/app/v1_1/articles',
    params
  })
}
