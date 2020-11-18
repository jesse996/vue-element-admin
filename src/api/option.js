import request from '@/utils/request'

export function fetchOptions(query) {
  return request({
    url: 'api/options',
    params: query,
    method: 'get'
  })
}

// data:type,name,username
export function addOption(data) {
  return request({
    url: 'api/options',
    method: 'post',
    data
  })
}
