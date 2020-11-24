import request from '@/utils/request'

/**
 * 获取文章评论
 * @param {String | Number} params
 */
export const getComments = params => {
  return request({
    method: 'GET',
    url: '/app/v1_0/comments',
    params
  })
}

/**
 * 获取文章评论
 * @param {String | Number} target
 */
export const addCommentLike = target => {
  return request({
    method: 'POST',
    url: '/app/v1_0/comment/likings',
    data: { target }
  })
}

/**
 * 获取文章评论
 * @param {String | Number} params
 */
export const deleteCommentLike = commentId => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/comment/likings/${commentId}`
  })
}

/**
 * 发布文章评论
 * @param {Object} data
 */
export const addComment = data => {
  return request({
    method: 'POST',
    url: '/app/v1_0/comments',
    data
  })
}
