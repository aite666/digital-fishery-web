import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/enterprise/list',
    method:'get',
    params:params
  })
}

export function createEnterprise(data) {
  return request({
    url:'/enterprise/create',
    method:'post',
    data:data
  })
}

export function updateEnterprise(id, data) {
  return request({
    url:'/enterprise/update/' + id,
    method:'post',
    data:data
  })
}

export function deleteEnterprise(id) {
  return request({
    url:'/enterprise/delete/' + id,
    method:'post',
  })
}

export function getEnterpriseDetail(id) {
  return request({
    url:'/enterprise/'+id,
    method:'get'
  });
}