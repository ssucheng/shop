<template>
  <div class="goods_detail" >
    <!-- 轮播图 -->
      <div class="swipe">
            <swiper
          :indicator-dots="indicatorDots"
          :autoplay="autoplay"
          :interval="interval"
          :duration="duration"
          :circular="circular"
        >
          <block v-for="(item,index) in detail.pics" :key="index">
            <swiper-item>
              <image
                :src="item.pics_big"
                class="slide-image"
              />
            </swiper-item>
          </block>
        </swiper>
      </div>  
      <!-- 文字描述 describe-->
      <div class="describe">
          <div class="describe-price">
            ￥{{detail.goods_price}}
          </div>
          <div class="describe-title">
              <div class="left">
                  {{detail.goods_name}}
              </div>
              <div class="right">
                <span class="iconfont icon-shoucang"></span>
                <p>收藏</p>
              </div>       
          </div>
      </div>
      <!-- 商品详情
       -->
       <div class="goods_detail">
         <div class="goods_detail_title">
            商品详情
         </div>
         <div v-html="detail.goods_introduce">
                  
         </div>
       </div>
       <!-- 底部栏   -->
       <div class="footer">
         <!-- 联系客服的按钮  
          -->
          <button class="contact" open-type="contact">联系客服</button>
          <div class="footer-left" >
            <span class="iconfont icon-kefu"></span>
            <p>联系客服</p>
          </div>
          <a class="footer-left" href="/pages/cart/main" open-type="switchTab">
            <span class="iconfont icon-gouwuche"></span>
            <p>购物车</p>
          </a>
          <div class="footer-right" @click="handleAddCart">
            加入购物车
          </div>
          <div class="footer-right" @click="handleAddCart">
            立即购买
          </div>
       </div>

  </div>
</template>

<script>
import {request} from '../../utils/request.js'
export default {
  data(){
    return{
      // 基础的服务器地址
      baseUrl:"https://www.zhengzhicheng.cn",
      baseUrl1:"https://itjustfun.cn",
      // 是否显示面板指示点
      indicatorDots:true,
      // 是否自动轮播
      autoplay:true,
      // 自动切换时间间隔
      interval:5000,
      // 滑动时间时长
      duration:500,
      // 采用衔接式滑动
      circular:true,
      // 轮播图图片地址数组
      imgUrl:[],
      // 解构的总体数据
      detail:{},
      // 传过来的商品id
      goodsId:0,
     
    }
  },
  // 接受传递过来的参数
  onLoad(value){
   console.log(value)
   this.goodsId = value.goods_id
  },
  mounted () {
    this.getDate()
  },
  methods:{
    // 获取数据的函数
    getDate(){
      request.get(this.baseUrl1+"/api/public/v1/goods/detail",{goods_id:this.goodsId}).then((res)=>{
        // 解构
        const {data} = res.data
        this.detail = data
        console.log(this.detail)
        
      })
    },
    // 将详情页的商品添加到本地存储中
    handleAddCart(){
      // console.log("detail")
      // 1.0首先有可能本地中已经了商品数据 所以我们先获取一下 有可能还没有
      let goods = wx.getStorageSync("goods") || {}
      // 2.0商品数据中没有商品数量和商品被选择的值
      this.detail.num = 1,
      this.detail.selected = true,
        // 3.0 将数据添加到本地存储中 为了能分别是具体那个数据 我们用goodId来区别
      goods[this.goodsId] = this.detail
      // console.log(goods)
      // console.log(123)
      wx.setStorageSync("goods",goods)
      //弹出一个消息提示框
      wx.showToast({
        title:"加入购物车成功",
         icon: 'success',
        duration: 2000
      })
      // 跳转到购物车页面
    //  wx.navigateTo({
    //             url:`/pages/cart/main?keyworld=${name}`
    //         })
    }
  }
};
</script>

<style lang="scss" scoped>
@import 'style.scss';
</style>

