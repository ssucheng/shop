<template>
    <div>
        <!-- 搜索框 -->
        <!-- <Search></Search> -->
        <Search/>
        <!-- 主题的部分 -->
        <div class="main">
            <scroll-view :scroll-y="true" class="left">
                <div class="left-item" :class="{active:index === goodsNum }" v-for="(item,index) in classifyList" :key="index"
                @click="changegoods(index)">
                    <span>{{item.cat_name}}</span>
                </div>
            </scroll-view>
            <div class="right">
                321
            </div>
        </div>
    </div>
</template>
<script>
import Search from "../../components/Search.vue"
import {request} from '../../utils/request.js'
export default{
    data(){
        return{
            // 请求的服务器地址
            baseUrl:"https://www.zhengzhicheng.cn",
            // 左边栏的数据
            classifyList:[],
            // 定义一个点击按钮的索引值
            goodsNum:0
        }
    },
    // 组件的复用
    components: {
        Search
    },
    mounted () {
        // 请求数据
        request(this.baseUrl + "/api/public/v1/categories").then(res=>{
            console.log(res)
            const {message} = res.data
            this.classifyList = message
        })
    },
    methods: {
        changegoods(index){
            console.log(index)
           this.goodsNum = index
        }
    }
}
</script>
<style lang="scss" scoped>
@import 'style.scss';
</style>

