import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/equipmentCategory/list',
    method:'get',
    params:params
  })
}

export function createEquipmentCategory(data) {
  return request({
    url:'/equipmentCategory/create',
    method:'post',
    data:data
  })
}

export function updateEquipmentCategory(id, data) {
  return request({
    url:'/equipmentCategory/update/' + id,
    method:'post',
    data:data
  })
}

export function deleteEquipmentCategory(id) {
  return request({
    url:'/equipmentCategory/delete/' + id,
    method:'post',
  })
}

export function getEquipmentCategoryDetail(id) {
  return request({
    url:'/equipmentCategory/'+id,
    method:'get'
  });
}