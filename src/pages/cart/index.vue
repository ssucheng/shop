<template>
  <div class="cart">
    <div
      class="cart-top"
      v-if="address.name"
      @click="getAddress"
    >
      <div class="receive">
        <div class="name">
          收货人: {{address.name}}
        </div>
        <div class="phone-number">
          {{address.telNumber}}
        </div>
      </div>
      <div class="address">
        收货地址: {{address.addr}}
      </div>
      <img
        src="../../../static/images/cart_border@2x.png"
        alt=""
      >
    </div>
    <!-- 点击获取地址按钮 -->
    <div class="get-address">
      <button
        size="mini"
        v-if="!address.name"
        @click="getAddress"
      >获取地址</button>
    </div>
    <!-- 店铺标题信息 -->
    <div class="list-title">
      <span class='iconfont icon-dianpu'></span>
      优购生活馆
    </div>
    <!-- 购物车列表 -->
    <div class="ware-list">
      <div
        class="ware-item"
        v-for="(item,key) in goods"
        :key="key"
      >

        <!-- 左侧的按钮,选中状态 -->
        <div class="choice-button">
          <icon
            type="success"
            :color="item.selected?'red':'#999'"
            size="18"
            @click="handleSelected(key)"
          />
        </div>

        <!-- 内容区域 -->
        <div class="ware-content">
          <!-- 左侧的图片 -->
          <navigator
            class="ware-image"
            :url="'/pages/goods_detail/main?goods_id='+key"
          >
            <img
              :src="item.goods_small_logo"
              mode="aspectFill"
            />
          </navigator>

          <!-- 右边的商品信息 -->
          <div class="ware-info">
            <navigator
              :url="'/pages/goods_detail/main?goods_id='+key"
              class="ware-title"
            >
              {{item.goods_name}}
            </navigator>
            <div class="ware-info-btm">
              <div class="ware-price">
                <span>￥</span> {{item.goods_price}}
              </div>

              <!-- 修改商品的数量 -->
              <div class="calculate">
                <div class="calculate">
                  <div
                    class="rect"
                    @click="handleDecrease(item)"
                  >-</div>
                  <div class="number">{{item.num}}</div>
                  <div
                    class="rect"
                    @click="handleIncrease(item)"
                  >+</div>
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
        <icon
          type="success"
          :color=" allSelected?'red':'#999'"
          size="18"
          @click="handleAllSelect"
        />全选
      </div>
      <div class="total-center">
        <div class="total-price">
          合计：
          <text class="colorRed">
            <text>￥</text>{{allPrice}}
          </text>
        </div>
        <div class="price-tips">
          包含运费
        </div>
      </div>
      <div
        class="accounts"
        bindtap="handleBuy"
      >
        结算
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //  收货人信息
      address: {},
      // 商品详情信息
      goods: {}
    };
  },
  onShow() {
    // 初始化地址信息
    const initAddr = {
      name: "",
      telNumber: "",
      addr: ""
    };
    // 接受地址信息
    this.address = wx.getStorageSync("address") || initAddr;
    // 接受商品详情信息
    this.goods = wx.getStorageSync("goods") || {};
    // console.log(this.goods)
  },
  // 监听商品的变化 就是价格的变化
  // computed: {
  //   // 订单的总价值
  //   allPrice(){
  //     let price = 0;
  //     // Object.keys()括号中可以返回数组
  //     Object.keys(this.goods).forEach(v=>{
  //       // console.log(v) v是索引
  //       const item = this.goods[v]
  //       console.log(item.selected)
  //       if(item.selected){
  //         price+=item.goods_price * item.num
  //       }
  //     })
  //     return price
  //    },
  //   // 订单的选择的状态
  //   allSelected(){
  //     // 定义一个总状态
  //    let allselected = false
  //     // Object.keys()括号中可以返回数组
  //     Object.keys(this.goods).forEach(v=>{
  //       // 将数据存储到items中
  //         const items = this.goods[v]
  //         // 判断下所有的状态都是true就让总状态变成true
  //         if(items.selected == false){
  //             allselected = false
  //         }else{
  //           allselected = true
  //         }
  //     })
  //     return allselected
  //   }
  // },
  // 实现数据的监听
  computed: {
    // 监听总价值
    allPrice() {
      // Object.keys()这个可以返回一个数组
      // 定义一个总的价值的变量
      let price = 0;
      Object.keys(this.goods).forEach(v => {
        // 根据索引找到数据计算总价值
        price += this.goods[v].num * this.goods[v].goods_price;
      });
      return price;
    },
    // 监听状态的变化
    allSelected() {
      // 定义一个选中的状态
      let allselect = true;
      Object.keys(this.goods).forEach(v => {
        // 判断下选中状态 思路只要有一个不选中就是false
        if (this.goods[v].selected == false) {
          allselect = false;
        }
      });
      return allselect;
    }
  },
  methods: {
    //  点击获取地址
    getAddress() {
      wx.chooseAddress({
        success: res => {
          //  拼接地址对象
          this.address = {
            name: res.userName,
            telNumber: res.telNumber,
            addr: `${res.provinceName}${res.cityName}${res.countyName}${
              res.detailInfo
            }`
          };
          // 将地址信息保存到本地中
          wx.setStorageSync("address", this.address);
        }
      });
    },
    //  点击更改状态
    handleSelected(id) {
      this.goods[id].selected = !this.goods[id].selected;
      // 将data中的数据存储到本地中
      wx.setStorageSync("goods", this.goods);
    },
    //  点击全选状态集体改变
    handleAllSelect() {
      // 点击将所有的selected的值取相反
      // console.log(11)
      const allSelected = !this.allSelected;

      // 循环遍历将所有数据的状态改变
      Object.keys(this.goods).forEach(v => {
        this.goods[v].selected = allSelected;
      });
      // 将数据存储到本地
      wx.setStorageSync("goods", this.goods);
    },
    // 点击添加数量(增加)
    handleIncrease(item) {
      // 找到data内存中的具体数据
      this.goods[item.goods_id].num++;
      // const goods_id = item.goods_id
      // this.goods[goods_id].num++
      // 将内存的数据存在本地
      wx.setStorageSync("goods", this.goods);
    },
    // 点击减少数据量(减少)
    handleDecrease(item) {
      // 当数量是1的时候判断一下
      if (item.num === 1) {
        // 用户交互
        wx.showModal({
          title: "提示",
          content: "这是一个模态弹窗",
          // 这里有个坑  我们要用箭头函数
          success:(res)=> {
            if (res.confirm) {
              // 删除这一条数据
              delete this.goods[item.goods_id]
              // 使用delete删除data数据 不会驱动视图更新（重点）
              // 解决方案 1 解构
              // this.goods = {...this.goods}
              // 方案2 用Object.assgin
              this.goods = Object.assign({},this.goods)
            //  将data存储到本地中
              // console.log(this.goods)
              wx.setStorageSync("goods",this.goods)

            } else if (res.cancel) {
              console.log("用户点击取消");
            }
          }
        })
        // 如果商品的数量是1 我们就不让执行下面的数量再次减一的操作
        return;
      }
      this.goods[item.goods_id].num--;
      // 存储到本地
      wx.setStorageSync("goods",this.goods)
    }
  }
};
</script>

<style lang="scss" scoped>
@import "style.scss";
</style>

