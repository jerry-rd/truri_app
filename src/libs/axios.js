import axios from 'axios'
import qs from 'qs'

// Create axios instance with base configuration
const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_API || '',
  timeout: 15000,
})

service.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  (response) => {
    const res = response.data
    return res
  },
  (error) => {
    return Promise.reject(error)
  }
)

const GET = (url, params) => {
  return service({
    url,
    method: 'get',
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
    },
    params,
  })
}

const POST = (url, params, headers) => {
  return service({
    url,
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-Requested-With': 'XMLHttpRequest',
      ...headers,
    },
    data: headers ? params : qs.stringify(params),
  })
}

export { GET, POST }
