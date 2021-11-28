import request from '@/utils/request'
export function getHomeStats() {
  return request({
    url:'/home/stats',
    method:'get'
  })
}

export function getChartData(params) {
  return request({
    url:'/home/chart',
    method:'get',
    params:params
  })
}