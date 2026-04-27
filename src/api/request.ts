import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios'

import { useUserStore } from '@/stores/user'

const request = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080/api',
  timeout: 10_000,
  headers: {
    'Content-Type': 'application/json',
  },
})

request.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const userStore = useUserStore()

  if (userStore.token) {
    config.headers.Authorization = `Bearer ${userStore.token}`
  }

  return config
})

request.interceptors.response.use(
  (response) => response.data,
  (error: AxiosError<{ message?: string }>) => {
    const message = error.response?.data?.message ?? error.message ?? '请求失败'

    console.error('[API Error]', message)
    return Promise.reject(new Error(message))
  },
)

export default request
