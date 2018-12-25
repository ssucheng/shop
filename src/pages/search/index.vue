<template>
  <div >
    <!-- 搜索框 -->
    <div class="search-wrapper">
        <!-- 输入框 -->
        <div class="search-input">
          <icon type="search" size="16" class="icon" @click="handSearch"/>
          <input type="text" placeholder="请输入内容" @input="handCancel" v-model="searchContent">
        </div>
        <!-- 取消按钮 -->
        <div class="delBtn" v-if="searchContent">
          <button size="mini" @click="handClear">取消</button>
        </div>
    </div>
    <!-- 历史搜索 -->
    <div class="history">
        <div class="history-item">
            <p>历史搜索</p>
            <icon type="clear" size="18" @click="handdel" />
        </div>
    </div>
    <!-- 历史记录 -->
    <div class="history-goods">
      <div class="good-item"  v-for="(item,index) in searchHistory" :key="index" @click="handler(item)">
        {{item}}
      </div>
    </div>
  </div>
</template>

<script>


export default {
 data(){
   return{
    //  搜索历史
      searchHistory:wx.getStorageSync("searchHistory") || [],
      // 搜索的内容
      searchContent:""
   }
 },
 methods: {
   handCancel(e){
    //  console.log(e)
    
   },
  //  点击搜索的方法
  handSearch(){
    // console.log(1)

      // 点击将输入的内容添加到数组中
      this.searchHistory.unshift(this.searchContent)
         // 去掉重复的搜索记录
       const arrFirst = new Set(this.searchHistory)
      // 点击搜索将数据存在本地存储中 因为去重复之后数据类型有点不对
      wx.setStorageSync("searchHistory",[...arrFirst])
       
      // 将存储到本地存储的数据拉取回来
       const arrSecond = wx.getStorageSync("searchHistory")
      // 将拉取回来的数据存在data中  
      this.searchHistory =arrSecond
      // 搜索之后清空搜索栏
      this.searchContent = ""
      

      // 跳转到搜索列表
      wx.navigateTo({
        url:`/pages/search_List/main?keyworld=${this.searchContent}`
      })
  },
  // 取消按钮的点击事件
  handClear(){
    this.searchContent =''
  },
  // 清空历史记录
  handdel(){
    wx.clearStorage("searchHistory")
    this.searchHistory = []
  },
  // 点击历史记录跳转搜索
  handler(name){
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
