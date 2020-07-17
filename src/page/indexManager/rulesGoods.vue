<template>
    <div class="contain">
        <div >
            <div class="input_modal" style="display:block">
                <el-button type="primary" @click="insert">新增规格</el-button>
            </div>
            <div class="input_modal">
                <div class="input-item">
                    <span>规格名称: </span>
                    <el-input
                        v-model="specificationName"
                        placeholder="请输入"
                        class="proName"
                        @input="clearValue"
                        @keyup.enter.native="getList(1)"
                    ></el-input>
                </div>
                <div class="input-item">
                    <el-button type="primary" @click="getList(1)">查询</el-button>
                    <el-button @click="back()" type="primary">返回</el-button>
                </div>
            </div>
            <!-- <div class="rule_item">
                <span></span>
                <span>规格列表</span>
            </div> -->
            <div class="table-content">
                <el-table
                    v-loading="loading"
                    :data="tableData"
                    style="width: 100%;text-align:center"
                    :border="true"
                    @selection-change="handleSelectionChange"
                >
                    <!-- <el-table-column type="selection" width="55" :selectable="checkboxInit"></el-table-column> -->
                    <el-table-column prop="goodId" label="商品ID"></el-table-column>
                    <el-table-column prop="goodName" label="商品图">
                        <template slot-scope="scope">
                            <img :src="IMg(scope.row.goodUrl)" class="item_img" alt />
                        </template>
                    </el-table-column>
                    <el-table-column prop="integral" label="积分"> </el-table-column>
                    <el-table-column prop="inventory" label="库存"></el-table-column>
                    <el-table-column prop="price" label="价格"> </el-table-column>
                    <el-table-column prop="colour" label="颜色"></el-table-column>
                    <el-table-column prop="specificationName" label="规格名称"></el-table-column>

                    <el-table-column prop="id" label="操作" fixed="right" width="220">
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
    </div>
</template>
<script>
import { ruleList, ruleDelete } from '@/api/order';
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
            total: 0,
            goodId: null,
            specificationName: null
        };
    },
    mounted() {
        this.goodId = this.$route.query.id;
        this.getList(1); //分页获取订单数据
    },
    methods: {
        getList(type) {
            if (type) {
                this.pageIndex = 1;
            }
            this.loading = true;
            let param = {
                goodId: this.goodId,
                pageIndex: this.pageIndex,
                pageSize: this.pageSize,
                specificationName: this.specificationName
            };
            ruleList(param).then(res => {
                this.tableData = res.data.list;
                this.pageCount = res.data.total;
                this.loading = false;
            });
        },
        IMg(item) {
            if(item){
                var newIMG = item.split(',')[0];
                return newIMG;
            }else{
                return false
            }
            
        },
        //搜索清除
        clearValue() {
            if (this.specificationName == '' || this.specificationName == null) {
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
                    ruleDelete(data).then(res => {
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
        back() {
            this.$router.push({
                path: '/index',
                query: { currentPage: this.currentPage }
            });
        },
        //新增规格
        insert() {
            this.$router.push({
                path: '/insertRule?id='+this.goodId
            });
        },
        //编辑
        toEdit(id) {
            this.$router.push({
                path: '/ruleEdit?id=' + id
            });
        },
        //查看
        toDetail(id) {
            var isEdit = false
            this.$router.push({
                path: '/ruleEdit?id=' + id+'&isEdit='+isEdit
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
.rule_container {
    background: #fff;
    height: 100%;
    padding: 20px;
    .rule_item {
        display: flex;
        margin: 20px 0;
        span {
            display: block;
            &:nth-last-child(1) {
                font-size: 16px;
                color: #888;
            }
        }
        span:nth-of-type(1) {
            width: 10px;
            height: 25px;
            background: #21b5cc;
            margin-right: 10px;
        }
    }
}
</style>
