import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/alarm/rule/list',
    method:'get',
    params:params
  })
}

export function createAlarmRule(data) {
  return request({
    url:'/alarm/rule/create',
    method:'post',
    data:data
  })
}

export function updateAlarmRule(id, data) {
  return request({
    url:'/alarm/rule/update/' + id,
    method:'post',
    data:data
  })
}

export function deleteAlarmRule(id) {
  return request({
    url:'/alarm/rule/delete/' + id,
    method:'post',
  })
}

export function getAlarmRuleDetail(id) {
  return request({
    url:'/alarm/rule/'+id,
    method:'get'
  });
}