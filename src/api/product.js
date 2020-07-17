import request from '../utils/request';
let api = '/api/official/'

//产品类别列表
export function productTypeList(data) {
    return request({
        url: api + 'admin/product/type/pageInfo',
        method: 'post',
        data
    })
}
//产品类别新增
export function insertProductType(data) {
    return request({
        url: api + 'admin/product/type/save',
        method: 'post',
        data
    })
}
//产品类别详情
export function productTypeDetail(data) {
    return request({
        url: api + 'admin/product/type/getDetail?id='+data.id,
        method: 'get',
        data
    })
}
//产品类别编辑
export function productTypeEdit(data) {
    return request({
        url: api + 'admin/product/type/edit',
        method: 'post',
        data
    })
}
//产品类别删除
export function productTypeDelete(data) {
    return request({
        url: api + 'admin/product/type/del?id='+data.id,
        method: 'get',
        data
    })
}


//产品列表
export function productList(data) {
    return request({
        url: api + 'admin/product/pageInfo',
        method: 'post',
        data
    })
}
//产品新增
export function productInsert(data) {
    return request({
        url: api + 'admin/product/save',
        method: 'post',
        data
    })
}
//产品编辑
export function productEdit(data) {
    return request({
        url: api + 'admin/product/edit',
        method: 'post',
        data
    })
}
//产品详情
export function productDetail(data) {
    return request({
        url: api + 'admin/product/getDetail?id='+data.id,
        method: 'get',
        data
    })
}
//删除
export function productDelete(data) {
    return request({
        url: api + 'admin/product/del?id='+data.id,
        method: 'get',
        data
    })
}