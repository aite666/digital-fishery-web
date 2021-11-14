import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url: '/alarm/list',
    method: 'get',
    params: params
  })
}

export function fetchAlarmList(params) {
  return request({
    url: '/alarm/list',
    method: 'get',
    params: params
  })
}

export function getCount(params) {
  return request({
    url: '/alarm/count',
    method: 'get',
    params: params
  })
}

export function updateStatus(params) {
  return request({
    url: '/updateStatus',
    method: 'get',
    params: params
  })
}

export function deleteAlarmRecord(id) {
  return request({
    url: '/alarm/delete/' + id,
    method: 'post',
  })
}
