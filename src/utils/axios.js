import axios from 'axios'

const Axios = axios.create({
  baseURL: 'https://duoduotu.zbfib.com/api/',
  timeout: 5000,
})
Axios.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = 'Bearer ' + token
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

Axios.interceptors.response.use(
  function (response) {
    if (response.data.code === 401) {
      // router.push({ path: '/login' })
    }
    return response.data
  },
  function (error) {
    return Promise.reject(error)
  }
)

export default Axios
