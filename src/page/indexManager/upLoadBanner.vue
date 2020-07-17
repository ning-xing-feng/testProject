<template>
    <div class="contain-edit">
        <div class="header_top">
            <p>首页 >> 新增/编辑banner</p>
            <div class="back_button">
                <el-button @click="back()" type="primary">返回</el-button>
            </div>
        </div>
        <div class="main container">
            <el-form
                :model="goodIntro"
                :rules="rulesOrder"
                ref="goodIntro"
                label-width="120px"
            >
                <el-form-item label=" banner图 ：" prop="goodMainPhoto">
                    <div>
                        <el-upload
                            class="avatar-uploader"
                            :action="upLoadUrl"
                            :show-file-list="false"
                            :on-remove="handleRemove"
                            :before-upload="handlePictureCardPreview"
                        >
                            <img v-if="goodIntro.imgUrl" :src="goodIntro.imgUrl" class="avatar" />
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </div>
                </el-form-item>
                <el-form-item >
                    <el-button
                        type="primary"
                        @click="submitOrder('goodIntro')"
                        :loading="loading"
                    >保存</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import { uploadBanner, uploadFile ,getBannerDetail,editBanner} from '@/api/index.js';
import http from '@/utils/config';
export default {
    data() {
        return {
            currentPage: 1,
            firstStep: true,
            id: null,
            pageCount: null,
            pageIndex: 1,
            pageSize: 10,
            upLoadUrl: '',
            tableData: [],
            goodIntro: {
                imgUrl: null
            },
            rulesOrder: {
                imgUrl: [{ required: true, message: '请先上传图片', trigger: 'blur' }]
            },
            loading: false,
            imgArr1: [] //商品图
        };
    },
    mounted() {
        this.currentPage = this.$router.currentRoute.query.currentPage;
        this.id = this.$route.query.id;
        console.log('id', this.id);
        if (this.id) {
            this.getDetail();
        }
        let id = window.localStorage.getItem('token');
        console.log('config', http.http);
    },
    methods: {
        getDetail() {
            let data = {
                id: this.id
            };
            getBannerDetail(data).then(res => {
                console.log('详细信息', res);
                this.goodIntro = res.data;
                this.imgUrl = res.data.imgUrl
            });
        },

        submitOrder(formName) {
            console.log('formName', formName);
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.loading = true;
                    let param = {
                        imgUrl: this.goodIntro.imgUrl,
                        userId: sessionStorage.getItem('userId'),
                        id:this.id
                    };
                    console.log('提交', param);
                    if (this.id) {
                        editBanner(param).then(res => {
                            if (res.code == 200) {
                                this.$message({
                                    message: '新增成功',
                                    type: 'success'
                                });
                                this.$router.push({
                                    path: '/index'
                                });
                            }
                            console.log('banne保存', res);
                        });
                    } else {
                        uploadBanner(param).then(res => {
                            if (res.code == 200) {
                                this.$message({
                                    message: '新增成功',
                                    type: 'success'
                                });
                                this.$router.push({
                                    path: '/index'
                                });
                            }
                            console.log('banne保存', res);
                        });
                    }
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
                    this.goodIntro.imgUrl = res.data.fullUrl;
                }
            });
            console.log('imgArr', this.imgArr1);
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
