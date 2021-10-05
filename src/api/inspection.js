import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/inspection/list',
    method:'get',
    params:params
  })
}

export function createInspection(data) {
  return request({
    url:'/inspection/create',
    method:'post',
    data:data
  })
}

export function updateInspection(id, data) {
  return request({
    url:'/inspection/update/' + id,
    method:'post',
    data:data
  })
}

export function deleteInspection(id) {
  return request({
    url:'/inspection/delete/' + id,
    method:'post',
  })
}

export function getInspectionDetail(id) {
  return request({
    url:'/inspection/'+id,
    method:'get'
  });
}