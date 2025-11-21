import request from '@/utils/request'
import type { UserRegisterRequest, UserLoginRequest } from '@/types'

const baseURL = '/user'

const API = {
  login: '/login',
  register: '/regist',
  get: '/',
}

// 注册
export const userRegister = (body: UserRegisterRequest) =>
  request.post(baseURL + API.register, body)

// 登录
export const userLogin = (body: UserLoginRequest) => request.post(baseURL + API.login, body)
