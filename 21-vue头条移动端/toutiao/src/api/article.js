import request from '@/utils/request'

// 获取栏目的文章数据
export const getArticles = params => {
  return request({
    method: 'GET',
    url: '/app/v1_1/articles',
    params
  })
}

/**
 *
 * @param {String | Number} articleId
 */
export const getArticleById = articleId => {
  return request({
    method: 'GET',
    url: `/app/v1_0/articles/${articleId}`
  })
}

/**
 *
 * @param {String | Number} articleId
 */
export const addCollect = articleId => {
  return request({
    method: 'POST',
    url: '/app/v1_0/article/collections',
    data: { target: articleId }
  })
}

/**
 *
 * @param {String | Number} articleId
 */
export const deleteCollect = articleId => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/article/collections/${articleId}`
  })
}
