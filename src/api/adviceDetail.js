import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/adviceDetail/list',
    method:'get',
    params:params
  })
}

export function createAdviceDetail(data) {
  return request({
    url:'/adviceDetail/create',
    method:'post',
    data:data
  })
}

export function updateAdviceDetail(id, data) {
  return request({
    url:'/adviceDetail/update/' + id,
    method:'post',
    data:data
  })
}

export function deleteAdviceDetail(id) {
  return request({
    url:'/adviceDetail/delete/' + id,
    method:'post',
  })
}

export function getAdviceDetailDetail(id) {
  return request({
    url:'/adviceDetail/'+id,
    method:'get'
  });
}

export function updateAdviceDetailBatch(adviceId, dataList) {
  return request({
    url:'/adviceDetail/updateBatch/'+adviceId,
    method:'post',
    data:dataList
  })
}