import BASE_URL from './base'
import axios from 'axios'
import store from '@/store/store'
import router from '@/router'
import qs from 'qs'

async function login (url, data) {
  axios.defaults.withCredentials = true
  axios({
    url: BASE_URL + url,
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify(data)
  })
    .then(response => {
      let data = response.data
      if (data.customerName !== undefined) {
        store.setSession(data.customerName)
        router.push('/')
      } else {
        alert('登录失败' + data.result)
        router.push('/')
      }
    })
}

async function logout (url) {
  axios.defaults.withCredentials = true
  axios({
    url: BASE_URL + url,
    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
    .then(response => {
      let data = response.data
      if (data.result === true) {
        store.removeSession()
        router.push('/')
        location.reload()
      } else {
        alert('退出失败')
      }
    })
}

async function logoff (url) {
  axios.defaults.withCredentials = true
  axios({
    url: BASE_URL + url,
    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
    .then(response => {
      let data = response.data
      if (data.result === true) {
        store.removeSession()
        router.push('/')
        location.reload()
      } else {
        alert('注销失败')
      }
    })
}

async function register (url, data) {
  axios.defaults.withCredentials = true
  axios({
    url: BASE_URL + url,
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify(data)
  })
    .then(response => {
      let data = response.data
      if (data.result === true) {
        alert('注册成功')
        router.push('/login')
      } else {
        alert(data.result + '注册失败')
      }
    })
}

export default {login, logout, register, logoff}
