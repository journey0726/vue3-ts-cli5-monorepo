import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'

const BASE_URL = process.env.VUE_APP_URL_PREFIX || '127.0.0.1:3000'

export const request = (config: AxiosRequestConfig) => {
  const instance: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 5000,
  })
  // 请求拦截器
  instance.interceptors.request.use(
    (config) => {
      return config
    },
    (err) => {}
  )

  // 响应拦截器
  instance.interceptors.response.use(
    (res) => {
      return res.data
    },
    (err) => {
      console.log(err)
    }
  )

  return instance(config)
}
