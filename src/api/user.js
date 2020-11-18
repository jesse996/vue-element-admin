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
    url: 'api/users/' + token,
    method: 'get'
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

export function addUser(data) {
  return request({
    url: '/api/users',
    method: 'post',
    data
  })
}

export function deleteUser({ id, username }) {
  return request({
    url: '/api/users/' + id,
    method: 'delete',
    params: { username }
  })
}

export function updateUser({ id, ...rest }) {
  return request({
    url: '/api/users/' + id,
    method: 'patch',
    data: rest
  })
}
