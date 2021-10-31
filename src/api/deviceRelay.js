import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/deviceRelay/list',
    method:'get',
    params:params
  })
}

export function createDeviceRelay(data) {
  return request({
    url:'/deviceRelay/create',
    method:'post',
    data:data
  })
}

export function updateDeviceRelay(id, data) {
  return request({
    url:'/deviceRelay/update/' + id,
    method:'post',
    data:data
  })
}

export function deleteDeviceRelay(id) {
  return request({
    url:'/deviceRelay/delete/' + id,
    method:'post',
  })
}

export function getDeviceRelayDetail(id) {
  return request({
    url:'/deviceRelay/'+id,
    method:'get'
  });
}
