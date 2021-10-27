import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/blockPosition/list',
    method:'get',
    params:params
  })
}

export function createBlockPosition(data) {
  return request({
    url:'/blockPosition/create',
    method:'post',
    data:data
  })
}

export function updateBlockPosition(id, data) {
  return request({
    url:'/blockPosition/update/' + id,
    method:'post',
    data:data
  })
}

export function deleteBlockPosition(id) {
  return request({
    url:'/blockPosition/delete/' + id,
    method:'post',
  })
}

export function getBlockPositionDetail(id) {
  return request({
    url:'/blockPosition/'+id,
    method:'get'
  });
}