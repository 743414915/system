import {request} from "./request";

// 登录
export function login(userName, password) {
  return request({
    url: '/user/login',
    params: {
      userName,
      password
    }
  })
}

// 注册
export function register(userName, password, aginPassword) {
  return request({
    url: '/user/resqit',
    method: "post",
    params: {
      userName,
      password,
      aginPassword
    }
  })
}
