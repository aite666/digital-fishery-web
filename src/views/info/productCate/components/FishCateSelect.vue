<template>
    <el-select v-model="productCateId"
        clearable
        @change="sendProductCate()">
        <el-option v-for="item of productCategoryList" 
            :key="item.id"
            :label="item.name"
            :value="item.id">
        </el-option>
    </el-select>
</template>

<script>
    import {fetchListWithParentName} from '@/api/productCate';

    export default {
        name: "FishCateSelect",
        components:{},
        props: {
            productCateSelectedId: {
                type: Number,
                default: null
            }
        },
        data() {
            return {
                productCateSelected: null,
                productCateId: null,
                productCateSelectedInfo: null,
                productCategoryList: null,
            }
        },
        created() {
            this.productCateId = this.productCateSelectedId;
            this.getList();
        },
        watch: {
            productCateSelectedId (newV, oldV) {
                this.productCateId = newV
            }
        },
        methods: {
            handleResetSearch() {
                this.listQuery = Object.assign({}, defaultListQuery);
            },
            handleSearchList() {
                this.listQuery.pageNum = 1;
                this.getList();
            },
            handleSizeChange(val){
                this.listQuery.pageNum = 1;
                this.listQuery.pageSize = val;
                this.getList();
            },
            handleCurrentChange(val){
                this.listQuery.pageNum = val;
                this.getList();
            },
            getList() {
                fetchListWithParentName('养殖鱼类').then(response => {
                    let list = response.data;
                    let productCategoryList = [];
                    let productCateSelectedInfo = {};
                    for (let item of list) {
                        productCategoryList.push({
                            'id': item['id'],
                            'name': item['name'],
                        });
                        productCateSelectedInfo[item['id'].toString()] = item;
                    }
                    this.productCategoryList = productCategoryList;
                    this.productCateSelectedInfo = productCateSelectedInfo;
                });
            },
            sendProductCate() { //1.子组件通过子定义事件的方式将productCate信息传给父组件
                this.productCateSelected = this.productCateSelectedInfo[this.productCateId.toString()];
                this.$emit('fish-cate', this.productCateSelected);
            }
        }
    }
</script>

<style scoped>

</style>