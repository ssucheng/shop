<template>
  <div>
    <!-- 搜索框 -->
    <div class="search_wraper">
        <div class="search_input">
          <icon type="search" size="16"/>
          {{query}}
        </div>
    </div>
    <!-- 排序栏 -->
    <div class="goodsTab">
        <div class="goodsTab-item" v-for="(item,index) in tabList" :key="index"
        :class="{active:index == tabNum}"
        @click="changeTab(index)">
          {{item}}
        </div>
    </div>
    <!-- 产品列表 -->
    <div class="product">
      <a :href="'/pages/goods_detail/main?goods_id='+ item.goods_id"  v-for="(item,index) in goodsList" :key="index">
        <div class="product-item">
          <div class="item-img">
            <img :src="item.goods_small_logo" alt="">
          </div>
          <div class="item-text">
              <p>{{item.goods_name}}</p>
              <div class="price">
                 <span>￥</span><span>{{item.goods_price}}</span>.00
              </div>
          </div>
        </div>
      </a>
    </div>
  </div>
</template>

<script>
import {request} from '../../utils/request.js'
export default {
    data(){
      return{
        tabList:["综合","销量","价格"],
        // 点击存储的num
        tabNum : 0,
        // 分类页面传递过来的关键词
        query:'',
        //设置基础的服务器地址
        baseUrl:"https://www.zhengzhicheng.cn",
        baseUrl1:"https://itjustfun.cn",
        // 商品数据
        goodsList:[],
        // 页面的数据pagesize
        pagesize:20,
        // 一个判断数据还有没有的变量
        hasMore:true,
        //分页
        pagenum:1
      }
    },
    // 接受分类界面传递过来的参数
    onLoad(option){
      console.log(option)
      this.query = option.keyworld
    },
    // 在页面卸载的时候初始化所有data数据
    onUnload(){
      Object.assign(this,this.$options.data());
    },
    // 页面触底触发的函数
    onReachBottom(){
      this.getState()
    },
    mounted () {
      // console.log(1)
      // 请求数据  第一次更改封装的request函数
     this.getState()
    },
    methods: {
      changeTab(index){
        // console.log(index)
        this.tabNum = index
      },
      // 封装 一个获取数据的函数
      getState(){
        // 判断下hasMore 的值来判断下还有没有数据 没有 就禁止发送请求
        if(!this.hasMore){
          return;
        }
         request.get(this.baseUrl1+"/api/public/v1/goods/search",{query:this.query,pagenum:this.pagenum,pagesize:this.pagesize}).then((res)=>{
        console.log(res)
        // 解构商品数据
        const {goods} = res.data.data
        this.goodsList = this.goodsList.concat(goods)

        // console.log(this.goodsList)
        // 判断下返回来的数据条数够不够20条(不足20条的意思就是 数据已经到了最后一页了)
        if(goods.length < 20){
          this.hasMore = false
        }
        // 页面再次上拉的时候就变成递增整体数据条数(pagenum)
        this.pagenum = this.pagenum + 1

      })
      }
    }
}
</script>

<style lang="scss" scoped>
@import "style.scss";
</style>
