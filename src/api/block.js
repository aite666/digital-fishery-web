import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/block/list',
    method:'get',
    params:params
  })
}

export function createBlock(data) {
  return request({
    url:'/block/create',
    method:'post',
    data:data
  })
}

export function updateBlock(id, data) {
  return request({
    url:'/block/update/' + id,
    method:'post',
    data:data
  })
}

export function deleteBlock(id) {
  return request({
    url:'/block/delete/' + id,
    method:'post',
  })
}

export function getBlockDetail(id) {
  return request({
    url:'/block/'+id,
    method:'get'
  });
}