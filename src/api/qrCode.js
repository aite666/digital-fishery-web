import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/qrCode/list',
    method:'get',
    params:params
  })
}

export function createQrCode(data) {
  return request({
    url:'/qrCode/create',
    method:'post',
    data:data
  })
}

export function updateQrCode(id, data) {
  return request({
    url:'/qrCode/update/' + id,
    method:'post',
    data:data
  })
}

export function deleteQrCode(id) {
  return request({
    url:'/qrCode/delete/' + id,
    method:'post',
  })
}

export function getQrCodeDetail(id) {
  return request({
    url:'/qrCode/'+id,
    method:'get'
  });
}