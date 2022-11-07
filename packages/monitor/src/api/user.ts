import { request } from './request'

export const getUserInfo = () => {
  return request({
    url: '/123.txt',
  })
}
