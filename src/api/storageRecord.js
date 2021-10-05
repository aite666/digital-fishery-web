import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/storageRecord/list',
    method:'get',
    params:params
  })
}

export function createStorageRecord(data) {
  return request({
    url:'/storageRecord/create',
    method:'post',
    data:data
  })
}

export function updateStorageRecord(id, data) {
  return request({
    url:'/storageRecord/update/' + id,
    method:'post',
    data:data
  })
}

export function deleteStorageRecord(id) {
  return request({
    url:'/storageRecord/delete/' + id,
    method:'post',
  })
}

export function getStorageRecordDetail(id) {
  return request({
    url:'/storageRecord/'+id,
    method:'get'
  });
}