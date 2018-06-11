import http from './axios'
// 主题首页
export const homeData = http.get('topics').then((res) => {
  return res
})