import request from '@/utils/request'

export function getBlogListAPI(params) { // 获得博客列表
    return request({
        url: `/blog`,
        method: 'get',
        params
    })
}

export function addBlogAPI(params) { // 添加评论
    return request({
        url: '/blog',
        method: 'post',
        data: params
    })
}

export function getBlogCommentAPI(params) { // 获得博客评论
    return request({
        url: '/blogcomment',
        method: 'get',
        params
    })
}

export function addBlogCommentAPI(params) { // 添加评论
    return request({
        url: '/blogcomment',
        method: 'post',
        data: params
    })
}

export function getBlogTagAPI(params) { // 获得标签列表
    return request({
        url: '/blogtag',
        method: 'get'
    })
}

export function getBlogTagStatisticsAPI(params) { // 获得博客标签统计
    return request({
        url: '/blogtag/statistics',
        method: 'get'
    })
}
