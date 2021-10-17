import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/news/list',
    method:'get',
    params:params
  })
}

export function createNews(data) {
  return request({
    url:'/news/create',
    method:'post',
    data:data
  })
}

export function updateNews(id, data) {
  return request({
    url:'/news/update/' + id,
    method:'post',
    data:data
  })
}

export function deleteNews(id) {
  return request({
    url:'/news/delete/' + id,
    method:'post',
  })
}

export function getNewsDetail(id) {
  return request({
    url:'/news/'+id,
    method:'get'
  });
}