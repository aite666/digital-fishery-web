<template>
    <el-select v-model="blockSelectedId"
        clearable
        @change="sendBlock()">
        <el-option v-for="item of list" 
            :key="item.id"
            :label="item.name"
            :value="item.id">
        </el-option>
    </el-select>
</template>

<script>
    import {fetchList, deleteBlock} from '@/api/block';

    const defaultListQuery = {
        pageNum: 1,
        pageSize: 100000000
    };
    export default {
        name: "BlockSelect",
        components:{},
        data() {
            return {
                blockSelectedId: null,
                blockSelected: null,
                blockSelectedInfo: null,
                listQuery: Object.assign({}, defaultListQuery),
                listLoading: true,
                list: null,
                total: null,
            }
        },
        created() {
            this.getList();
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
                this.listLoading = true;
                fetchList(this.listQuery).then(response => {
                    this.listLoading = false;
                    this.list = response.data.list;
                    let blockSelectedInfo = {};
                    for (let item of this.list) {
                        blockSelectedInfo[item.id.toString()] = item;
                    }
                    this.blockSelectedInfo = blockSelectedInfo;
                    this.total = response.data.total;
                });
            },
            sendBlock() { //1.子组件通过子定义事件的方式将block信息传给父组件
                this.blockSelected = this.blockSelectedInfo[this.blockSelectedId.toString()];
                this.$emit('block', this.blockSelected);
            }
        }
    }
</script>

<style scoped>

</style>