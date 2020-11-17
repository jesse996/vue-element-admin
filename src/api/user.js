import request from '@/utils/request'
import qs from 'qs'

export function login(data) {
  return request({
    // url: '/vue-element-admin/user/login',
    url: '/login',
    method: 'post',
    data: qs.stringify(data),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

export function getInfo(token) {
  return request({
    // url: '/vue-element-admin/user/info',
    url: 'user/getInfo',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/logout',
    method: 'get'
  })
}

export function getUserList() {
  return request({
    url: '/api/users',
    method: 'get'
  })
}
