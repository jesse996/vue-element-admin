import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { addOption } from '@/api/option'
// import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000, // request timeout
  header: {
    'Content-Type': 'application/json' // 如果写成contentType会报错
  }
})

// request interceptor  // console.log('[request.js] username= ' + username)
// service.interceptors.request.use(
//   config => {
//     // do something before request is sent

//     // if (store.getters.token) {
//     //   // let each request carry token
//     //   // ['X-Token'] is a custom headers key
//     //   // please modify it according to the actual situation
//     //   config.headers['X-Token'] = getToken()
//     // }
//     return config
//   },
//   error => {
//     // do something with request error
//     console.log(error) // for debug
//     return Promise.reject(error)
//   }
// )

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    const status = response.status

    if (status === 401 || status === 500 || (res.code && res.code !== 200)) {
      if (status === 401) {
        // to re-login
        MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
          confirmButtonText: 'Re-Login',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    }
    const config = response.config

    // 用户登陆时记录登陆操作
    if (config.url === '/login') {
      // console.log(response)
      const username = res.data.username
      const type = config.method
      const optionData = { username, type, name: '登陆' }
      addOption(optionData)
        .then(data => {
          // console.log('add option res:')
          // console.log(data)
        }).catch(e => {
          // console.log('add option err:')
          console.log(e)
        })
    }
    const username = store.getters.name

    if (config.url.startsWith('/api/users')) {
      let optionData
      if (config.method === 'post') {
        // console.log('---------添加')
        // console.log(response)
        // const role = res.role
        const addedName = res.username
        const type = '管理员'
        // if (role.endsWith('admin')) {
        //   type = '超级管理员'
        // } else if (role.endsWith('editor')) {
        //   type = '管理员'
        // }
        const name = '添加' + type + ': ' + addedName
        optionData = { username, type: config.method, name }
        // } else if (config.method === 'get') {
        //   optionData = { username, type: config.method, name: '获取用户' }
      } else if (config.method === 'put' || config.method === 'patch') {
        // console.log('---------修改')
        // console.log(response)
        const name = '修改管理员: ' + res.username
        optionData = { username, type: config.method, name }
      } else if (config.method === 'delete') {
        // console.log('---------删除')
        // console.log(response.request.responseURL.split('users/')[1])
        const deletedUsername = response.request.responseURL.split('?')[1]
        // console.log(deletedUsername)
        optionData = { username, type: config.method, name: '删除管理员: ' + deletedUsername }
      } else {
        return res
      }
      addOption(optionData)
        .then(data => {
          // console.log(data)
        }).catch(e => {
          // console.log('add option err:')
          console.log(e)
        })
    }

    return res

    // if the custom code is not 20000, it is judged as an error.
    // if (res.code !== 20000) {
    //   Message({
    //     message: res.message || 'Error',
    //     type: 'error',
    //     duration: 5 * 1000
    //   })

    //   // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
    //   // if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
    //   if (res.code === 401) {
    //     // to re-login
    //     MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
    //       confirmButtonText: 'Re-Login',
    //       cancelButtonText: 'Cancel',
    //       type: 'warning'
    //     }).then(() => {
    //       store.dispatch('user/resetToken').then(() => {
    //         location.reload()
    //       })
    //     })
    //   }
    //   return Promise.reject(new Error(res.message || 'Error'))
    // } else {
    //   return res
    // }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
