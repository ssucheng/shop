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
            <scroll-view class="right" :scroll-y="true">
                <div class="right-item" v-for="(item,index) in goodsLogo" :key="index">
                    <div class="right-title">
                        <span>/</span>
                        {{item.cat_name}}
                        <span>/</span>
                    </div>
                    <div class="right-content">
                       <div class="content-item" v-for="(subItem,subIndex) in item.children" :key="subIndex" @click="changclick(subItem.cat_name)">
                          <img :src="subItem.cat_icon" alt="" mode="aspectfill">
                          <p>{{subItem.cat_name}}</p>
                       </div>
                    </div>
                </div>
            </scroll-view>
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
            goodsNum:0,
            // 右边品牌的数据
            goodsLogo:[]
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
            // 解构左边侧边栏的数据
            const {message} = res.data
            this.classifyList = message
            // 页面加载的时候就渲染大家电的数据
             const {children} = this.classifyList[0]
             this.goodsLogo = children
            console.log(this.goodsLogo)
            
        })
    },
    methods: {
        changegoods(index){
            console.log(index)
            // 将点击的索引值存在data中
           this.goodsNum = index
           // 解构右边children中的数据
            const {children} = this.classifyList[this.goodsNum]
            // 渲染数据到右边
            this.goodsLogo = children
            console.log(this.goodsLogo)

        },
    // 负责跳转到搜索分类页面
        changclick(name){
            // console.log(name)
            wx.navigateTo({
                url:`/pages/search_List/main?keyworld=${name}`
            })
        }
    }
}
</script>
<style lang="scss" scoped>
@import 'style.scss';
</style>

