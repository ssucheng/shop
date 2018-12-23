<template>
  <div>
    <!-- 搜索框 -->
     <Search/>
    <!-- 轮播图 -->
    <div>
      <swiper
        :indicator-dots="indicatorDots"
        :autoplay="autoplay"
        :interval="interval"
        :duration="duration"
        :circular="circular"
      >
        <block v-for="(item, index) in imgUrls" :key="index">
          <swiper-item>
            <image
              :src="item.image_src"
              class="slide-image"
            />
          </swiper-item>
        </block>
      </swiper>
    </div>
    <!-- 分类 -->
    <div class="classify">
      <div class="classify-item"  v-for="(item,index) in classifyImg" :key="index">
        <img :src="item.image_src" alt="">
      </div>
    </div>
    <!-- 楼层数据 -->
    <div class="floor">
        <!-- 每个楼层 -->
      <div class="floor-item" v-for="(item,index) in floorList" :key="index">
          <!-- 标题 -->
        <div class="floor-title" >
          <img :src="item.floor_title.image_src" alt="">
        </div>
          <!-- 产品 -->
        <div class="product">
            <!-- 左侧大图 -->
          <div class="left">
            <img :src="item.product_list[0].image_src" alt="">
          </div>
          <!-- 右侧小图 -->
          <div class="right">
            <div class="right-item" v-if="index1" v-for="(item1,index1) in item.product_list" :key="index1">
              <img :src="item1.image_src" alt="">
            </div>
          </div>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
import {request} from '../../utils/request.js'
import Search from '../../components/Search.vue'
export default {
  data() {
    return{
      // 无缝轮播 可以左划又划
      circular:true,
      // 有没有点
      indicatorDots:true,
      // 自动轮播
      autoplay:true,
      interval:5000,
      duration:1000,
      // 轮播图的数据
      imgUrls:[],
      // 服务器地址 第一个服务器地址 容易出错 视情况而定
      baseUrl:"https://itjustfun.cn",
      baseUrl1:"https://www.zhengzhicheng.cn",
      // 分类数据
      classifyImg:[],
      // 楼层数据
      floorList:[]
    }
  },
  // 复用组件搜索
  components: {
    Search
  },
  mounted() {
    request(this.baseUrl1+"/api/public/v1/home/swiperdata","POST").then((res)=>{
      console.log(res)
    })
    // 测试async
    this.getData()
    // 测试封装的函数
    // request(this.baseUrl1+"/api/public/v1/home/swiperdata").then((res)=>{
    //   console.log(res)
    // })
    // // 请求轮播图数据
    // wx.request({
    //   url: this.baseUrl+"/api/public/v1/home/swiperdata",
    //   success:(res) =>{
    //     // console.log(res);
    //     const {data} = res.data
    //     this.imgUrls = data
    //     // console.log(this.imgUrls)
    //   }
    // });
    // 分类数据
    // wx.request({
    //   url:this.baseUrl1+"/api/public/v1/home/catitems",
    //   success:(res) =>{
    //     // console.log(res)
    //     const {message} = res.data
    //     this.classifyImg = message
    //     // console.log(message)
    //   }
    // });
    // 楼层数据
    // wx.request({
    //   url:this.baseUrl1+"/api/public/v1/home/floordata",
    //   success:(res) =>{
    //     // console.log(res)
    //     const {message} = res.data
    //     this.floorList = message;
    //     // console.log(this.floorList)
    //   }
    // })
  },
  methods:{
    //自定义async
    //用同步的方法处理异步请求
    async getData(){
      //await 后面跟着promise对象 返回的是then（）函数中 res的值
      // 轮播图数据
    try{
       let res = await request(this.baseUrl1+"/api/public/v1/home/swiperdata");
       const {message} = res.data
       this.imgUrls = message
    }catch(err){console.log(err)}
    //  请求分类数据
    try{
       let res = await request(this.baseUrl1+"/api/public/v1/home/catitems");
       const {message} = res.data
       this.classifyImg = message
    }catch(err){console.log(err)}
     // 楼层数据
     try{
       let res = await request(this.baseUrl1+"/api/public/v1/home/floordata");
       const {message} = res.data
       this.floorList = message
    }catch(err){console.log(err)}
    }
   
  }
};
</script>

<style lang="scss" scoped>
 @import "style.scss";
</style>
