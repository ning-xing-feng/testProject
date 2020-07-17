<template>
    <div class="contain-edit">
        <div class="header_top">
            <p>规格编辑/新增</p>
            <div class="back_button">
                <el-button @click="back()" type="primary">返回</el-button>
            </div>
        </div>
        <div class="main container">
            <el-form :model="goodIntro" :rules="rulesOrder" ref="goodIntro" label-width="120px" class :disabled="!firstStep">
                <el-form-item label="规格名称：" prop="specificationName">
                    <el-input v-model="goodIntro.specificationName" placeholder="请输入"></el-input>
                </el-form-item>

                <el-form-item label="价格：" prop="price">
                    <el-input v-model="goodIntro.price" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="积分：" prop="integral">
                    <el-input v-model="goodIntro.integral" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="库存：" prop="inventory">
                    <el-input v-model="goodIntro.inventory" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="颜色：" prop="price">
                    <el-input v-model="goodIntro.colour" placeholder="请输入"></el-input>
                </el-form-item>
                <!-- <el-form-item label="商品类别 ：" prop="color"> </el-form-item> -->
                <el-form-item label="商品主图 ：" prop="goodUrl">
                    <div>
                        <el-upload class="avatar-uploader" :action="upLoadUrl" :show-file-list="false" :before-upload="handlePictureCardPreview">
                            <img v-if="goodIntro.goodUrl" :src="goodIntro.goodUrl" class="avatar" />
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </div>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitOrder('goodIntro')" :loading="loading">保存</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import { ruleDetail, ruleEdit, uploadFile,ruleInsert } from '@/api/order';
export default {
    data() {
        return {
            firstStep: true,
            id: null,
            pageCount: null,
            pageIndex: 1,
            pageSize: 10,
            upLoadUrl: '',
            upLoadHeaders: {},
            imageUrl: null,
            tableData: [],
            isTop: 'y',
            goodIntro: {
                specificationName: null,
                integral: null,
                inventory: null,
                price: null,
                goodUrl: null
            },
            rulesOrder: {
                specificationName: [{ required: true, message: '请输入商品名称', trigger: 'blur' }],
                integral: [{ required: true, message: '请选择商品类别', trigger: 'blur' }],
                inventory: [{ required: true, message: '请输入商品简介', trigger: 'blur' }],
                price: [{ required: true, message: '请输入价格', trigger: 'blur' }]
            },
            loading: false,
            dialogImageUrl: '',
            dialogVisible: false,
            dialogImageUrl1: '',
            dialogVisible1: false,
            isEdit: true,
            goodId: null
        };
    },
    mounted() {
        this.currentPage = this.$router.currentRoute.query.currentPage;
        this.id = this.$route.query.id;
        this.isEdit = this.$route.query.isEdit;
        this.goodId = this.$route.query.id;
    },
    methods: {
        getDetail() {
            let data = {
                id: this.id
            };
            console.log('dataata', data);
            var _this = this;
            ruleDetail(data).then(res => {
                console.log('详细信息', res);
                _this.goodIntro = res.data;
                console.log('this.gooodsINfo', _this.goodIntro);
            });
        },

        submitOrder(formName) {
            console.log('formName', formName);
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.loading = true;
                    let param = this.goodIntro;
                    param.goodId = this.goodId
                    console.log('formName', param);
                    ruleInsert(param).then(res => {
                        if (res.code == 200) {
                            this.$message({
                                message: '编辑成功',
                                type: 'success'
                            });
                            this.$router.push({
                                path: '/rulesGoods',
                                query: { id: this.goodId }
                            });
                        }
                    });
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        back() {
            this.$router.push({
                path: '/rulesGoods',
                query: { id: this.goodId }
            });
        },

        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePictureCardPreview(file) {
            let formdata = new FormData();
            formdata.append('file', file);
            uploadFile(formdata).then(res => {
                if (res.code == 200) {
                    console.log('文件上传', res);
                    this.goodIntro.goodUrl = res.data.fullUrl;
                    this.upLoadUrl = res.data.fullUrl
                }
            });
            console.log('param', param);
            this.dialogImageUrl = file.url;
            this.goodIntro.goodMainPhoto = file.url;
            this.dialogVisible = true;
        },
        handlePictureCardPreview1(file) {
            let param = {
                suffix: file.name.split('.')[1], // 文件后缀  png
                contentType: file.type // 文件类型  image/png
            };
            this.dialogImageUrl1 = file.url;
            this.goodIntro.goodAppendedDrawings = file.url;
            this.dialogVisible1 = true;
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
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
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 180px;
  line-height: 180px;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
