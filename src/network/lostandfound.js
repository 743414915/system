import {request} from "./request";

export function selectAll() {
  return request({
    url: '/lostandfound/selectAll'
  })
}

export function addInfo(name, context, phone) {
  return request({
    url: '/lostandfound/release',
    params: {
      name,
      context,
      phone,
    }
  })
}

export function selectLike(keyword) {
  return request({
    url: '/lostandfound/selectLike',
    params: {
      keyword
    }
  })
}