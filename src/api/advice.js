import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/advice/list',
    method:'get',
    params:params
  })
}

export function createAdvice(data) {
  return request({
    url:'/advice/create',
    method:'post',
    data:data
  })
}

export function updateAdvice(id, data) {
  return request({
    url:'/advice/update/' + id,
    method:'post',
    data:data
  })
}

export function deleteAdvice(id) {
  return request({
    url:'/advice/delete/' + id,
    method:'post',
  })
}

export function getAdviceDetail(id) {
  return request({
    url:'/advice/'+id,
    method:'get'
  });
}