import request from '@/utils/request'

export function getTodoListAPI(params) {
  return request({
    url: `/todo`,
    method: 'get',
    params
  })
}

export function todoCreateAPI(params) {
  return request({
    url: '/todo/create',
    method: 'post',
    data: params
  })
}
export function updateTodoAPI(params) {
  return request({
    url: '/todo/update',
    method: 'post',
    data: params
  })
}

export function updateStatusTodoAPI(params) {
  return request({
    url: '/todo/updateStatus',
    method: 'post',
    data: params
  })
}
