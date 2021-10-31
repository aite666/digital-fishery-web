import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/deviceFactor/list',
    method:'get',
    params:params
  })
}

export function createDeviceFactor(data) {
  return request({
    url:'/deviceFactor/create',
    method:'post',
    data:data
  })
}

export function updateDeviceFactor(id, data) {
  return request({
    url:'/deviceFactor/update/' + id,
    method:'post',
    data:data
  })
}

export function deleteDeviceFactor(id) {
  return request({
    url:'/deviceFactor/delete/' + id,
    method:'post',
  })
}

export function getDeviceFactorDetail(id) {
  return request({
    url:'/deviceFactor/'+id,
    method:'get'
  });
}
