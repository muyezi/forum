import http from '../axios'

// 文章详情
export function getTopic(id) {
  const url = `topic/${id}`
  return http.get(url)
}

// 评论
export function toReplies(id, params) {
  return http.post(
    `topic/${id}/replies`, params, {
      direct: true
    }
  )
}

// 点赞
export function toSetUps(id) {
  return http
    .post(`reply/${id}/ups`, {}, {
      direct: true
    })
}