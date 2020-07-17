import request from '../utils/request';
let api = '/api/mall/'

/**
 * 首页商品管理模块
 * @param {*} data 
 */
export function login(data) {
    return request({
        url: api + 'admin/login/login',
        method: 'post',
        data
    })
}
//列表
export function getList(data) {
    return request({
        url: api + 'admin/sys/goods/pageSearch',
        method: 'post',
        data
    })
}
//查看
export function listDetail(query) {
    return request({
        url: api + 'admin/sys/goods/getDetail?id='+query.id,
        method: 'post',
        query
    })
}
//删除
export function listDelete(query) {
    console.log('query',query)
    return request({
        url: api + 'admin/sys/goods/delete?id='+query.id,
        method: 'post',
        query
    })
}
//新增
export function listInsert(data) {
    return request({
        url: api + 'admin/sys/goods/insert',
        method: 'post',
        data
    })
}
//编辑
export function listUpdata(data) {
    return request({
        url: api + 'admin/sys/goods/update',
        method: 'post',
        data
    })
}