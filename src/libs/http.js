import { fetch } from '@tauri-apps/plugin-http'
import qs from 'qs'

const GET = async (url) => {
  const response = await fetch(`${url}`, {
    method: 'GET',
    credentials: 'include', // include, *same-origin, omit
  })
  return response.json()
}

const POST = async (url, data, headers = {}) => {
  const response = await fetch(`${url}`, {
    method: 'POST',
    body: qs.stringify(data),
    credentials: 'include', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-Requested-With': 'XMLHttpRequest',
      ...headers,
    },
  })
  return response.json()
}

const POST_JSON = async (url, data, headers = {}) => {
  const response = await fetch(`${url}`, {
    method: 'POST',
    body: JSON.stringify(data),
    credentials: 'include', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  })
  return response.json()
}

export { GET, POST, POST_JSON }
