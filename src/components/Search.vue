<template>
    <div>
         <!-- 搜索框 -->
    <div class="search-wrapper">
      <div class="search-input">
        <icon
          type="search"
          size="16"
        />
        搜索
      </div>
    </div>
    </div>
</template>
<script>
export default{
    data(){

    }
}

</script>
<style lang="scss" scoped>
.search-wrapper {
  background-color: #dd434f;
  padding: 5px;
  .search-input {
    background-color: white;
    height: 60rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 15px;
    color: #ccc;
  }
}
.slide-image{
  width: 790rpx;
  height: 390rpx;
}
</style>

