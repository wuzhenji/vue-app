import request from '@/utils/request'

export function addLinkAPI(params) { // 添加链接
    return request({
        url: '/link',
        method: 'post',
        data: params
    })
}

export function getLinkListAPI(params) { // 获得链接列表
    return request({
        url: '/link',
        method: 'get'
    })
}

export function getLinkTagAPI(params) { // 获得链接标签列表
    return request({
        url: '/link/tag',
        method: 'get'
    })
}