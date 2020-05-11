import request from '@/utils/request'

export function uploadAPI(data) { // 文件上传
    return request({
      url: `/common/upload`,
      method: 'post',
      data
    })
  }
