import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/storage/list',
    method:'get',
    params:params
  })
}

export function fetchStorageList(params) {
  return request({
    url:'/storage/list',
    method:'get',
    params:params
  })
}

export function createStorage(data) {
  return request({
    url:'/storage/create',
    method:'post',
    data:data
  })
}

export function updateStorage(id, data) {
  return request({
    url:'/storage/update/' + id,
    method:'post',
    data:data
  })
}

export function deleteStorage(id) {
  return request({
    url:'/storage/delete/' + id,
    method:'post',
  })
}

export function getStorageDetail(id) {
  return request({
    url:'/storage/'+id,
    method:'get'
  });
}