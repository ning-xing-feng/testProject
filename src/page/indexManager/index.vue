<template>
    <div class="contain">
        <div class="input_modal" style="display:block">
            <el-button type="primary" @click="insert">新增banner</el-button>
        </div>
        <div class="table-content">
            <el-table
                v-loading="loading"
                :data="tableData"
                style="width: 100%;text-align:center"
                :border="true"
                @selection-change="handleSelectionChange"
            >
                <el-table-column prop="id" label="bannerID"></el-table-column>
                <!-- <el-table-column prop="userId" label="用户ID"></el-table-column> -->
                <el-table-column prop="banner图" label="商品图">
                    <template slot-scope="scope">
                        <img :src="scope.row.imgUrl" class="item_img" alt />
                    </template>
                </el-table-column>
                <el-table-column prop="id" label="操作" fixed="right" width="300">
                    <template slot-scope="scope">
                        <el-button type="primary" size="mini" @click="toEdit(scope.row.id)">编辑</el-button>
                        <el-button type="primary" size="mini" @click="toDetail(scope.row.id)">查看</el-button>
                        <el-button type="danger" size="mini" @click="deleteItem(scope.row.id)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="pageIndex"
                    :page-size="pageSize"
                    background
                    layout="total, prev, pager, next"
                    :total="pageCount"
                ></el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
import { getBannerList,deleteBanner } from '@/api/index';
export default {
    name: 'index',
    data() {
        return {
            tableData: [],
            loading: false,
            pageCount: null,
            pageIndex: 1,
            pageSize: 10,
            goodName: null,
            goodsKeys: [],
            total: 0
        };
    },
    mounted() {
        this.getList(1); //分页获取订单数据
    },
    methods: {
        getList(type) {
            if (type) {
                this.pageIndex = 1;
            }
            this.loading = true;
            let param = {
                goodName: this.goodName,
                pageIndex: this.pageIndex,
                pageSize: this.pageSize
            };
            getBannerList(param).then(res => {
                console.log('bannerlist',res.data)
                this.tableData = res.data.records;
                this.pageCount = res.data.total;
                this.loading = false;
            });
        },
        IMg(item) {
            var newIMG = item.split(',')[0];
            return newIMG;
        },
        //搜索清除
        clearValue() {
            if (this.goodName == '' || this.goodName == null) {
                this.getList(1);
            }
        },
        checkboxInit(row, index) {
            return 1; //可勾选
        },
        //多项选择
        handleSelectionChange(val) {
            var obj = {
                eliteid: '',
                skuId: ''
            };
            val.forEach(item => {
                obj.eliteid = item.eliteid;
                obj.skuId = item.skuId;
            });
            this.goodsKeys.push(obj);
            console.log('选择', this.goodsKeys);
        },
        //删除
        deleteItem(id) {
            this.$confirm('确定删除?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    let data = { id: id };
                    deleteBanner(data).then(res => {
                        console.log('删除元素', res);
                        if (res.code == 200) {
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            this.getList();
                        } else {
                            this.$message({
                                type: 'warning',
                                message: res.msg
                            });
                        }
                    });
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
        },

        //新增商品
        insert() {
            this.$router.push({
                path: '/upLoadBanner'
            });
        },
        //编辑
        toEdit(id) {
            this.$router.push({
                path: '/upLoadBanner?id=' + id
            });
        },
        //查看
        toDetail(id) {
            this.$router.push({
                path: '/viewBanner?id=' + id
            });
        },
        handleSizeChange(val) {
            this.pageSize = val;
            this.getList();
        },
        handleCurrentChange(val) {
            this.pageIndex = val;
            this.getList();
        }
    }
};
</script>

<style lang="scss" scoped>
.contain {
    .el-dialog__body {
        padding-left: 0;
        padding-top: 30px;
        border-top: 1px solid #dedede;
    }
    .dialog-con {
        background-color: #f5f5f5;
        display: flex;
        justify-content: space-between;
        ul {
            width: 28%;
            list-style: none;
            padding: 0;
            font-size: 14px;
            float: left;
            margin-top: 0;
            z-index: 999;
            li {
                list-style: none;
                height: 60px;
                line-height: 60px;
                text-align: center;
                display: block;
            }
            li.active {
                color: #21b5cc;
                background-color: #fff;
                font-size: 16px;
                border-right: 2px solid #21b5cc;
            }
            //   li:hover{font-size:16px; }
        }
        .tab-content {
            width: 70%;
            display: inline-block;
            padding-left: 10%;
            background-color: #fff;
            min-height: 300px;
            .sort {
                .sort_name {
                    font-weight: 600;
                    margin-bottom: 5px;
                }
                .group-list {
                    padding-left: 20px;
                    .el-radio {
                        display: block;
                        margin-left: 0;
                        margin-bottom: 3px;
                    }
                }
            }
        }
        .el-button--default {
            background-color: #fff !important;
        }
    }
}
.avator {
    width: 56px;
    height: 56px;
    border-radius: 50%;
}
.item_img {
    width: 90px;
    height: 50px;
}
</style>
