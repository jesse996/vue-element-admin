import request from '@/utils/request'

export function fetchList(query) {
  return request({
    // url: '/vue-element-admin/article/list',
    url: '/api/articles',
    method: 'get',
    params: query
  })
}

export function fetchArticle(id) {
  return request({
    // url: '/vue-element-admin/article/detail',
    url: '/api/articles/' + id,
    method: 'get'
  })
}

export function fetchPv(pv) {
  return request({
    url: '/vue-element-admin/article/pv',
    method: 'get',
    params: { pv }
  })
}

export function createArticle(data) {
  return request({
    url: '/api/articles',
    method: 'post',
    data
  })
}

export function updateArticle(data) {
  return request({
    url: '/api/articles',
    method: 'patch',
    data
  })
}
