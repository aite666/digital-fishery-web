<template>
    <el-cascader
          v-model="selectProductCateValue"
          :props="{ checkStrictly: true }"
           @change="sendProductCate()"
          :options="productCateOptions"
          clearable>
    </el-cascader>
</template>

<script>
    import {fetchListWithChildren} from '@/api/productCate';

    export default {
        name: "ProductCateSelect",
        components:{},
        props: {
            selectedId: {
                type: Number,
                default: null
            }
        },
        data() {
            return {
                productCateSelectedId: null,
                productCateSelected: null,
                productCateSelectedInfo: null,
                selectProductCateValue: [],
                productCateOptions: [],
                parentIdInfo: {},
            }
        },
        watch:{
            selectedId(val, valOld){ 
                if (val && val.toString() in this.parentIdInfo) {
                    this.selectProductCateValue = this.parentIdInfo[val.toString()];
                }
            }
        },
        created() {
            this.getProductCateList();
        },
        methods: {
            getProductCateList() {
                fetchListWithChildren().then(response => {
                    let list = response.data;
                    let productCateOptions = [];
                    let productCateSelectedInfo = {};
                    let parentIdInfo = {};
                    for (let i = 0; i < list.length; i++) {
                        let children = [];
                        parentIdInfo[list[i].id.toString()] = [list[i].id]
                        if (list[i].children != null && list[i].children.length > 0) {
                            for (let j = 0; j < list[i].children.length; j++) {
                                children.push({label: list[i].children[j].name, value: list[i].children[j].id});
                                productCateSelectedInfo[list[i].children[j].id.toString()] = list[i].children[j];
                                parentIdInfo[list[i].children[j].id.toString()] = [list[i].id, list[i].children[j].id]
                            }
                        }
                        productCateOptions.push({label: list[i].name, value: list[i].id, children: children});
                        productCateSelectedInfo[list[i].id.toString()] = list[i];
                    }
                    this.productCateOptions = productCateOptions;
                    this.productCateSelectedInfo = productCateSelectedInfo;
                    this.parentIdInfo = parentIdInfo;
                    if (this.selectedId && this.selectedId.toString() in this.parentIdInfo) {
                        this.selectProductCateValue = this.parentIdInfo[this.selectedId.toString()];
                    }
                    this.$emit('product-cate-info', this.productCateSelectedInfo);
                });
            },
            sendProductCate() { //1.子组件通过子定义事件的方式将productCate信息传给父组件
                if (this.selectProductCateValue.length > 0) {
                    this.productCateSelectedId = this.selectProductCateValue[this.selectProductCateValue.length - 1];
                    this.productCateSelected = this.productCateSelectedInfo[this.productCateSelectedId.toString()];
                } else {
                    this.productCateSelectedId = null;
                    this.productCateSelected = null;
                }
                this.$emit('product-cate', this.productCateSelected);
            }
        }
    }
</script>

<style scoped>

</style>