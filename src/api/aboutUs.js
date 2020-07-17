import request from '../utils/request';
let api = '/api/official/'

//关于我们列表
export function aboutUsList(data) {
    return request({
        url: api + 'admin/about/pageInfo',
        method: 'post',
        data
    })
}

//关于我们列表详情
export function aboutUsDetail(data) {
    return request({
        url: api + 'admin/about/getDetail?id='+data.id,
        method: 'get',
        data
    })
}

//关我我们编辑
export function aboutUsEdit(data) {
    return request({
        url: api + 'admin/about/edit',
        method: 'post',
        data
    })
}
//关于我们删除
export function aboutUsDelete(data) {
    return request({
        url: api + 'admin/about/del?id='+data.id,
        method: 'get',
        data
    })
}
//关于我们新增
export function aboutUsInsert(data) {
    return request({
        url: api + 'admin/about/save',
        method: 'post',
        data
    })
}