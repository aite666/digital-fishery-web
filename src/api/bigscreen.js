import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/bigscreen/list',
    method:'get',
    params:params
  })
}

export function createBigscreen(data) {
  return request({
    url:'/bigscreen/create',
    method:'post',
    data:data
  })
}

export function updateBigscreen(id, data) {
  return request({
    url:'/bigscreen/update/' + id,
    method:'post',
    data:data
  })
}

export function updateBigscreenByName(name, data) {
    return request({
      url:'/bigscreen/updateByName/' + name,
      method:'post',
      data:data
    })
  }

export function deleteBigscreen(id) {
  return request({
    url:'/bigscreen/delete/' + id,
    method:'post',
  })
}

export function getBigscreenDetail(id) {
  return request({
    url:'/bigscreen/'+id,
    method:'get'
  });
}