import {request} from "./request";

export function selectRepair(name, startPage, count) {
  return request({
    url: '/repair/allRepair',
    params: {
      name,
      startPage,
      count
    }
  })
}

export function finishRepair(repairId) {
  return request({
    url: '/repair/finishRepair',
    params: {
      repairId
    }
  })
}

export function addRepair(name, context) {
  return request({
    url: '/repair/addRepair',
    params: {
      name,
      context
    }
  })
}