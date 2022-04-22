import {request} from "./request";

export function selectRecode(username, startPage, endPage) {
  return request({
    url: '/logindate/selectRecode',
    params: {
      username,
      startPage,
      endPage
    }
  })
}

export function selectSize(username) {
  return request({
    url: '/logindate/selectSize',
    params: {
      username
    }
  })
}

export function freezeOrNot(userId, freeze) {
  return request({
    url: '/logindate/freezeOrNot',
    params: {
      userId,
      freeze
    }
  })
}