<template>
  <div class="cart">
    <div class="cart-top" v-if="address.name" @click="getAddress">
      <div class="receive">
        <div class="name">
          收货人:  {{address.name}}
        </div>
        <div class="phone-number">
          {{address.telNumber}}
        </div>
      </div>
      <div class="address">
        收货地址:  {{address.addr}}
      </div>
      <img src="../../../static/images/cart_border@2x.png" alt="">
    </div>
    <!-- 点击获取地址按钮 -->
    <div class="get-address">
      <button size="mini" v-if="!address.name" @click="getAddress">获取地址</button>
    </div>
    <!-- 店铺标题信息 -->
   <div class="list-title">
        <span class='iconfont icon-dianpu'></span>
          优购生活馆
    </div>
    购物车列表
     <div class="ware-list">
        <div class="ware-item" >

            <!-- 左侧的按钮,选中状态 -->
            <div class="choice-button" >
                <icon type="success" 
                color="" 
                size="18"
                @click="handleSelected(key)"/> 
            </div>

            <!-- 内容区域 -->
            <div class="ware-content">
                <!-- 左侧的图片 -->
                <navigator class="ware-image" :url="'/pages/goods_detail/main?goods_id='+key">
                  <img src="" mode="aspectFill"/>
                </navigator>

                <!-- 右边的商品信息 -->
                  <div class="ware-info">
                    <navigator :url="'/pages/goods_detail/main?goods_id='+key" class="ware-title">
                        {{item.goods_name}}
                    </navigator>
                    <div class="ware-info-btm">
                        <div class="ware-price">
                          <span>￥</span> {{item.goods_price}}
                        </div>

                        <!-- 修改商品的数量 -->
                        <div class="calculate">
                          <div class="calculate">
                              <div class="rect" @click="handleDecrease(item)">-</div>
                              <div class="number">{{item.num}}</div>
                              <div class="rect" @click="handleIncrease(item)">+</div>
                          </div>
                        </div>
                    </div>
                  </div>
            </div>
        </div>
      </div>
       <!-- 结算 -->
        <div class="cart-total">
            <div class="total-button">
                <icon type="success" color="#999" size="18" bindtap="handleAllSelect"/>全选
            </div>
            <div class="total-center">
                <div class="total-price">
                合计： 
                <text class="colorRed">
                    <text>￥</text>0
                </text>
                </div>
                <div class="price-tips">
                包含运费
                </div>
            </div>
            <div class="accounts" bindtap="handleBuy">
                结算
            </div>
        </div>
  </div>
</template>

<script>
export default {
 data(){
   return{
    //  收货人信息
    address:{}
   }
 },
  onShow(){
    // 初始化地址信息
    const initAddr = {
        name: "",
        telNumber: "",
        addr: ""
    }
    this.address = wx.getStorageSync("address") || initAddr
  },
 methods: {
  //  点击获取地址
   getAddress(){
     wx.chooseAddress({
       success:(res) =>{
        //  拼接地址对象
          this.address = {
            name:res.userName,
            telNumber: res.telNumber,
            addr: `${res.provinceName}${res.cityName}${res.countyName}${res.detailInfo}`
          }
          // 将地址信息保存到本地中
          wx.setStorageSync("address",this.address)
       }
     })
   }
 }
}
</script>

<style lang="scss" scoped>
@import 'style.scss';
</style>

