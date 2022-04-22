import {request} from "./request";

export function selectUser(username) {
  return request({
    url: "/user/selectUser",
    params: {
      username
    }
  })
}

export function modifyPassword(userId, username, newPassword) {
  return request({
    url: "/user/modifyPassword",
    method: "post",
    params: {
      userId,
      username,
      newPassword
    }
  })
}

export function perfectInfo(department, hostelNum, userId) {
  return request({
    url: '/user/perfectInfo',
    params: {
      department,
      hostelNum,
      userId
    }
  })
}

export function selectAllNotBy() {
  return request({
    url: '/user/selectAllNotBy'
  })
}