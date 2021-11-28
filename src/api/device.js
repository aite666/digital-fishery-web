import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/device/list',
    method:'get',
    params:params
  })
}

export function getDeviceList(params) {
  return request({
    url:'/device/list',
    method:'get',
    params:params
  })
}

export function createDevice(data) {
  return request({
    url:'/device/create',
    method:'post',
    data:data
  })
}

export function updateDevice(id, data) {
  return request({
    url:'/device/update/' + id,
    method:'post',
    data:data
  })
}

export function deleteDevice(id) {
  return request({
    url:'/device/delete/' + id,
    method:'post',
  })
}

export function getDeviceDetail(id) {
  return request({
    url:'/device/'+id,
    method:'get'
  });
}

export function getDeviceNodeCharts(params) {
    return request({
        url:'/device/node/charts',
        method:'get',
        params:params
    });
}

export function getDeviceRealtimeList(params) {
    return request({
        url:'/device/realtime/list',
        method:'get',
        params:params
    });
}

export function fetchAllDeviceList() {
    return request({
        url:'/device/list',
        method:'get',
        params: {
          pageNum: 1,
          pageSize: 1000000
        }
    });
}

export function refeashDevice() {
  return request({
    url:'/device/refeash',
    method:'get'
  });
}
