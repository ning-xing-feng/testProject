import request from '../utils/request';
let api = '/api/official/'
export function login(data) {
    return request({
        url: api + 'admin/login/login',
        method: 'post',
        data
    })
}
//图片上传oss/upload/upload
export function uploadFile(data) {
    return request({
        url: api + 'oss/upload/upload',
        method: 'post',
        data
    })
}

//首页列表POST /
export function getList(data) {
    return request({
        url: api + 'admin/banner/pageInfo',
        method: 'post',
        data
    })
}
//新增banner
export function uploadBanner(data) {
    return request({
        url: api + 'admin/banner/save',
        method: 'post',
        data
    })
}
//获取banner list
export function getBannerList(data) {
    return request({
        url: api + 'admin/banner/pageInfo',
        method: 'post',
        data
    })
}
//删除banner 
export function deleteBanner(data) {
    return request({
        url: api + 'admin/banner/del?id=' + data.id,
        method: 'get',
        data
    })
}
//获取banner详情
export function getBannerDetail(data) {
    return request({
        url: api + 'admin/banner/getDetail?id=' + data.id,
        method: 'get',
        data
    })
}
//banner编辑
export function editBanner(data) {
    return request({
        url: api + 'admin/banner/edit',
        method: 'post',
        data
    })
}

//角色列表POST 
export function roleList(data) {
    return request({
        url: api + 'admin/sys/role/search',
        method: 'post',
        data
    })
}
//角色新增
export function roleInsert(data) {
    return request({
        url: api + 'admin/sys/role/insert',
        method: 'post',
        data
    })
}
//角色编辑
export function roleEdit(data) {
    return request({
        url: api + 'admin/sys/role/update',
        method: 'post',
        data
    })
}
//角色详情
export function roleDetail(data) {
    return request({
        url: api + 'admin/sys/role/getDetail?id=' + data.id,
        method: 'post',
        data
    })
}
//角色删除
export function roleDelete(data) {
    return request({
        url: api + 'admin/sys/role/delete?id=' + data.id,
        method: 'post',
        data
    })
}

//用户列表
export function userList(data) {
    return request({
        url: api + 'admin/sys/user/pageSearch',
        method: 'post',
        data
    })
}
//用户编辑
export function userEdit(data) {
    return request({
        url: api + 'admin/sys/user/update',
        method: 'post',
        data
    })
}

//用户详情
export function userDetail(data) {
    return request({
        url: api + 'admin/sys/user/getDetail?id=' + data.id,
        method: 'post',
        data
    })
}
//用户新增
export function userInsert(data) {
    return request({
        url: api + 'admin/sys/user/insert',
        method: 'post',
        data
    })
}
//用户删除
export function userDelete(data) {
    return request({
        url: api + 'admin/sys/user/delete?id=' + data.id,
        method: 'post',
        data
    })
}

//文章类别列表
export function articleTpeList(data) {
    return request({
        url: api + 'admin/article/type/pageInfo',
        method: 'post',
        data
    })
}
//文章类别详情

export function articleTypeDetail(data) {
    return request({
        url: api + 'admin/article/type/getDetail?id=' + data.id,
        method: 'get',
        data
    })
}
//文章类别编辑
export function articleTypeEdit(data) {
    return request({
        url: api + 'admin/article/type/edit',
        method: 'post',
        data
    })
}
//文章类别编辑
export function articleTypeInsert(data) {
    return request({
        url: api + 'admin/article/type/save',
        method: 'post',
        data
    })
}
//文章类别删除
export function articleTypeDelete(data) {
    return request({
        url: api + 'admin/article/type/del?id=' + data.id,
        method: 'get',
        data
    })
}

//文章列表
export function articleList(data) {
    return request({
        url: api + 'admin/article/pageInfo',
        method: 'post',
        data
    })
}
//文章列表编辑
export function articleEdit(data) {
    return request({
        url: api + 'admin/article/edit',
        method: 'post',
        data
    })
}
//文章列表详情
export function articleDetail(data) {
    return request({
        url: api + 'admin/article/getDetail?id=' + data.id,
        method: 'get',
        data
    })
}
//文章列表新增
export function articleInsert(data) {
    return request({
        url: api + 'admin/article/save',
        method: 'post',
        data
    })
}

//文章列表删除
export function articleDelete(data) {
    return request({
        url: api + 'admin/article/del?id=' + data.id,
        method: 'get',
        data
    })
}

//用户参数配置POST 

export function paramList(data) {
    return request({
        url: api + 'admin/config/param/pageInfo',
        method: 'post',
        data
    })
}
//编辑
export function paramEdit(data) {
    return request({
        url: api + 'admin/config/param/edit',
        method: 'post',
        data
    })
}
//详情
export function paramDetail(data) {
    return request({
        url: api + 'admin/config/param/get?id=' + data.id,
        method: 'get',
        data
    })
}
//新增
export function paramInsert(data) {
    return request({
        url: api + 'admin/config/param/save',
        method: 'post',
        data
    })
}
//删除
export function paramDelete(data) {
    return request({
        url: api + 'admin/config/param/del?id=' + data.id,
        method: 'get',
        data
    })
}
/**
 * 合作伙伴  POST /
 */
//列表
export function parptnerList(data) {
    return request({
        url: api + 'admin/partner/pageInfo',
        method: 'post',
        data
    })
}
//新增 
export function parptnerAdd(data) {
    return request({
        url: api + 'admin/partner/save',
        method: 'post',
        data
    })
}
//删除
export function parptnerDelete(data) {
    return request({
        url: api + 'admin/partner/del?id=' + data.id,
        method: 'get',
        data
    })
}
//编辑 
export function parptnerEdit(data) {
    return request({
        url: api + 'admin/partner/edit',
        method: 'post',
        data
    })
}
//详情 
export function parptnerDetail(data) {
    return request({
        url: api + 'admin/partner/getDetail?id=' + data.id,
        method: 'get',
        data
    })
}

/**
 * 用户反馈
 */
//列表
export function feedBackList(data) {
    return request({
        url: api + 'admin/feedback/list',
        method: 'post',
        data
    })
}
//详情  
export function feedBackDetail(data) {
    return request({
        url: api + 'admin/feedback/detail?id=' + data.id,
        method: 'get',
        data
    })
}
/**
 * 产品视频
 */
//视频列表 POST /
export function videoList(data) {
    return request({
        url: api + 'admin/product/video/pageInfo',
        method: 'post',
        data
    })
}
//编辑
export function videoEdit(data) {
    return request({
        url: api + 'admin/product/video/edit',
        method: 'post',
        data
    })
}
//新增
export function videoInsert(data) {
    return request({
        url: api + 'admin/product/video/save',
        method: 'post',
        data
    })
}
//详情
export function videoDetail(data) {
    return request({
        url: api + 'admin/product/video/getDetail?id=' + data.id,
        method: 'get',
        data
    })
}
//删除
export function videoDelete(data) {
    return request({
        url: api + 'admin/product/video/del?id=' + data.id,
        method: 'get',
        data
    })
}