import { GET, POST } from '@/libs/http'

const baseUrl = 'http://127.0.0.1:8000'

export const getAdminInit = () => GET(`${baseUrl}/admin/index/init`)

export const login = (data) => POST(`${baseUrl}/admin/index/login`, data)
