<template>
    <div class="contain-edit">
        <div class="header_top">
            <p>会员管理 >> 录入会员信息</p>
            <div class="back_button">
                <el-button @click="back()" type="primary">返回</el-button>
            </div>
        </div>
        <div class="main container">
            <el-form :model="goodIntro" :rules="rulesOrder" ref="goodIntro" label-width="120px" class :disabled="!firstStep">
                <el-form-item label="商品名称：" prop="goodName">
                    <el-input v-model="goodIntro.goodName" placeholder="请输入"></el-input>
                </el-form-item>

                <el-form-item label="商品类别 ：" prop="type">
                    <el-select v-model="goodIntro.type" placeholder="请选择">
                        <el-option v-for="item in shopsType" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label=" 商品主图 ：" prop="goodMainPhoto">
                    <div>
                        <el-upload
                            list-type="picture-card"
                            :http-request="myUpload"
                            :action="upLoadUrl"
                            :class="{ uploadShow: uploadState }"
                            :file-list="fileShowList1"
                            :on-remove="handleRemove"
                            :before-upload="handlePictureCardPreview"
                            multiple
                        >
                            <i class="el-icon-plus"></i>
                        </el-upload>
                    </div>
                </el-form-item>
                <el-form-item label="商品附图：" prop="goodAppendedDrawings">
                    <div>
                        <el-upload
                            list-type="picture-card"
                            :http-request="myUpload"
                            :action="upLoadUrl1"
                            :class="{ uploadShow: uploadState }"
                            :file-list="fileShowList2"
                            :on-remove="handleRemove1"
                            :before-upload="handlePictureCardPreview1"
                            multiple
                        >
                            <i class="el-icon-plus"></i>
                        </el-upload>
                    </div>
                </el-form-item>
                <el-form-item label="商品简介：" prop="goodIntro">
                    <el-input type="textarea" v-model="goodIntro.goodIntro" placeholder="请输入角色描述" :rows="5"></el-input>
                </el-form-item>
                <el-form-item v-if="firstStep">
                    <el-button type="primary" @click="submitOrder('goodIntro')" :loading="loading">保存</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import { listInsert, listDetail } from '@/api/goods';
import { uploadFile } from '@/api/order';
import http from '@/utils/config';
export default {
    data() {
        return {
            shopsType: [
                {
                    value: '1',
                    label: '普通商品'
                },
                {
                    value: '2',
                    label: '爆款商品'
                }
            ],
            formTitle: '新增客户',
            currentPage: 1,
            firstStep: true,
            secondStep: false,
            id: null,
            pageCount: null,
            pageIndex: 1,
            pageSize: 10,
            upLoadUrl: '',
            upLoadUrl1: '',
            upLoadHeaders: {},
            imageUrl: null,
            tableData: [],
            isTop: 'y',
            upLoadHeaders: { 'Content-Type': 'multipart/form-data' },
            goodIntro: {
                goodName: null,
                type: null,
                goodIntro: null,
                goodMainPhoto: null,
                goodAppendedDrawings: null
            },
            rulesOrder: {
                goodName: [{ required: true, message: '请输入商品名称', trigger: 'blur' }],
                type: [{ required: true, message: '请选择商品类别', trigger: 'blur' }],
                goodIntro: [{ required: true, message: '请输入商品简介', trigger: 'blur' }]
            },
            loading: false,
            dialogImageUrl: '',
            dialogVisible: false,
            dialogImageUrl1: '',
            dialogVisible1: false,
            fileShowList1: [], // 显示的图片列表
            fileShowList2: [], //商品附图
            uploadState: false,
            imgArr1: [], //商品图
            imgArr2: [] //商品附图
        };
    },
    mounted() {
        this.currentPage = this.$router.currentRoute.query.currentPage;
        this.id = this.$route.query.id;
        console.log('id', this.id);
        if (this.id) {
            this.getDetail();
            this.firstStep = false;
        }
        let id = window.localStorage.getItem('token');
        console.log('config', http.http);
        // this.upLoadUrl = http.http + '/oss/upload/upload'+'?sessionId='+id;
    },
    methods: {
       getDetail() {
            let data = {
                id: this.id
            };
            listDetail(data).then(res => {
                console.log('详细信息', res);
                this.goodIntro = res.data;
                if (this.goodIntro.goodMainPhoto != '') {
                    var arr1 = this.goodIntro.goodMainPhoto.split(',');
                    for (var i = 0; i < arr1.length; i++) {
                        var img1 = {
                            uid: arr1[i]
                                .split('?')[1]
                                .split('&')[0]
                                .split('=')[1],
                            name: arr1[i].split('?')[0],
                            url: arr1[i]
                        };
                        this.fileShowList1.push(img1);
                    }
                    this.imgArr1 = this.fileShowList1;
                }

                if (this.goodIntro.goodAppendedDrawings.split != '') {
                    var arr2 = this.goodIntro.goodAppendedDrawings.split(',');
                    for (var i = 0; i < arr2.length; i++) {
                        var img2 = {
                            uid: arr2[i]
                                .split('?')[1]
                                .split('&')[0]
                                .split('=')[1],
                            name: arr2[i].split('?')[0],
                            url: arr2[i]
                        };
                        this.fileShowList2.push(img2);
                    }
                    this.imgArr2 = this.fileShowList2;
                }

                console.log('fsfhsfkjshsjkfhs', this.fileShowList1, this.fileShowList2);
            });
        },

        submitOrder(formName) {
            console.log('formName', formName);
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.loading = true;
                    let param = this.goodIntro;
                    console.log('提交信息', param);
                    //处理商品图
                    var goodMainPhoto = [];
                    this.imgArr1.map(ele => {
                        goodMainPhoto.push(ele.name);
                    });
                    param.goodMainPhoto = goodMainPhoto.join(',');
                    //处理商品附图
                    var goodAppendedDrawings = [];
                    this.imgArr2.map(ele => {
                        goodAppendedDrawings.push(ele.name);
                    });
                    param.goodAppendedDrawings = goodAppendedDrawings.join(',');
                    console.log('新增商品', param);
                    listInsert(param).then(res => {
                        if (res.code == 200) {
                            this.$message({
                                message: '新增成功',
                                type: 'success'
                            });
                            this.$router.push({
                                path: '/index'
                            });
                        }
                        console.log('订单保存', res);
                    });
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        back() {
            this.$router.push({
                path: '/index',
                query: { currentPage: this.currentPage }
            });
        },

        handleRemove1(file, fileList) {
            console.log('删除', file, fileList);
        },

        handleFileSuccess(res, file) {
            if (res.status == 200) {
                let picItem = res.data.bussData;
                this.fileList.push(picItem);
            }
        },
        handleRemove(file, fileList) {
            console.log('删除', file, fileList);
            let deleteUrl = file.url;
            let len = this.imgArr1.length;
            for (var i = 0; i < this.imgArr1.length; i++) {
                if (this.imgArr1[i].uid == file.uid) {
                    this.imgArr1.splice(i, 1);
                }
            }
        },
        handleRemove1(file, fileList) {
            console.log('删除', file, fileList);
            for (var i = 0; i < this.imgArr2.length; i++) {
                if (this.imgArr1[i].uid == file.uid) {
                    this.imgArr2.splice(i, 1);
                }
            }
        },
        handlePictureCardPreview(file) {
            console.log('file', file);
            let formdata = new FormData();
            formdata.append('file', file);
            var imgs = {
                uid: file.uid,
                name: ''
            };
            uploadFile(formdata).then(res => {
                if (res.code == 200) {
                    console.log('res', res);
                    imgs.name = res.data.fullUrl;
                    this.imgArr1.push(imgs);
                }
            });
            console.log('imgArr', this.imgArr1);
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        handlePictureCardPreview1(file) {
            console.log('file', file);
            let formdata = new FormData();
            formdata.append('file', file);
            var imgs = {
                uid: file.uid,
                name: ''
            };
            uploadFile(formdata).then(res => {
                if (res.code == 200) {
                    console.log('res', res);
                    imgs.name = res.data.fullUrl;
                    this.imgArr2.push(imgs);
                }
            });
            console.log('imgArr', this.imgArr1);
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        myUpload(content) {
            // 重写覆盖上传方法
        }
    }
};
</script>

<style lang="scss">
.el-dialog__header {
    background-color: #21b5cc !important;
    color: #fff;
}
.el-input .el-input--mini .el-input--suffix {
    width: 210px !important;
}
.el-input__inner {
    width: 210px !important;
    min-width: 130px;
}
.contain .input_modal {
    margin-top: 0;
}
.el-form-item__content {
    display: flex;
    // flex-wrap: wrap;
}

.el-dialog__title {
    color: #fff;
}
.el-dialog__headerbtn .el-dialog__close {
    color: #fff;
}
.el-textarea__inner {
    width: 50% !important;
}
</style>
