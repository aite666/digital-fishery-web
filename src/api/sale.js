import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/sale/list',
    method:'get',
    params:params
  })
}

export function createSale(data) {
  return request({
    url:'/sale/create',
    method:'post',
    data:data
  })
}

export function updateSale(id, data) {
  return request({
    url:'/sale/update/' + id,
    method:'post',
    data:data
  })
}

export function deleteSale(id) {
  return request({
    url:'/sale/delete/' + id,
    method:'post',
  })
}

export function getSaleDetail(id) {
  return request({
    url:'/sale/'+id,
    method:'get'
  });
}