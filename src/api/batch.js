import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/batch/list',
    method:'get',
    params:params
  })
}

export function createBatch(data) {
  return request({
    url:'/batch/create',
    method:'post',
    data:data
  })
}

export function updateBatch(id, data) {
  return request({
    url:'/batch/update/' + id,
    method:'post',
    data:data
  })
}

export function deleteBatch(id) {
  return request({
    url:'/batch/delete/' + id,
    method:'post',
  })
}

export function getBatchDetail(id) {
  return request({
    url:'/batch/'+id,
    method:'get'
  });
}


export function getProductCategoryList(blockId) {
  return request({
    url:'/batch/listProductCategory',
    method:'get',
    params:{'blockId': blockId}
  });
}