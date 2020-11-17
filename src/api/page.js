import request from '@/utils/request'

export function fetchPages(query) {
  return request({
    url: '/api/pageInfoes',
    method: 'get',
    params: query
  })
}

export function addPage(data) {
  return request({
    url: '/api/pageInfoes',
    method: 'post',
    data
  })
}

export function deletePage(id) {
  return request({
    url: '/api/pageInfoes/' + id,
    method: 'delete'
  })
}

export function updatePage({ id, ...rest }) {
  console.log('id: ' + id)
  console.log('rest: ' + JSON.stringify(rest))
  return request({
    url: '/api/pageInfoes/' + id,
    method: 'put',
    data: rest
  })
}
