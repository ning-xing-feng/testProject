import request from '../utils/request';
let api = '/api/mall/'

//图片上传oss/upload/upload
export function uploadFile(data) {
    return request({
        url: api + 'oss/upload/upload',
        method: 'post',
        data
    })
}


//订单列表
export function orderList(data) {
    return request({
        url: api + 'admin/order/pageSearch',
        method: 'post',
        data
    })
}

//订单详情
export function orderDetail(data) {
    return request({
        url: api + 'admin/order/getOrderDetail?id='+data.id,
        method: 'post',
        data
    })
}
//订单删除
export function orderDelete(data) {
    return request({
        url: api + 'admin/order/delete?orderNo='+data.orderNo,
        method: 'post',
        data
    })
}
//订单修改
export function orderUpdata(data) {
    return request({
        url: api + 'admin/order/delete?id='+data.id,
        method: 'post',
        data
    })
}
//修改订单状态POST /
export function orderStatus(data) {
    return request({
        url: api + 'admin/order/updateStatus?id='+data.id,
        method: 'post',
        data
    })
}

/**
 * 商品规格模块
 */

//规格列表

export function ruleList(data) {
    return request({
        url: api + 'admin/sys/goodSpecification/pageSearch',
        method: 'post',
        data
    })
}

//新增商品规格
export function ruleInsert(data) {
    return request({
        url: api + 'admin/sys/goodSpecification/insert',
        method: 'post',
        data
    })
}
//获取商品规格
export function ruleDetail(data) {
    return request({
        url: api + 'admin/sys/goodSpecification/getDetail?id='+data.id,
        method: 'post',
        data
    })
}
//删除商品规格
export function ruleDelete(data) {
    return request({
        url: api + 'admin/sys/goodSpecification/delete?id='+data.id,
        method: 'post',
        data
    })
}
//修改商品规格
export function ruleEdit(data) {
    return request({
        url: api + 'admin/sys/goodSpecification/update',
        method: 'post',
        data
    })
}
