import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/batchOut/list',
    method:'get',
    params:params
  })
}

export function createBatchOut(data) {
  return request({
    url:'/batchOut/create',
    method:'post',
    data:data
  })
}

export function updateBatchOut(id, data) {
  return request({
    url:'/batchOut/update/' + id,
    method:'post',
    data:data
  })
}

export function deleteBatchOut(id) {
  return request({
    url:'/batchOut/delete/' + id,
    method:'post',
  })
}

export function getBatchOutDetail(id) {
  return request({
    url:'/batchOut/'+id,
    method:'get'
  });
}

export function getBatchOutCount(params) {
  return request({
    url:'/batchOut/count',
    method:'get',
    params:params
  })
}