<template>
  <div class="tab">
    <router-link tag="div" class="tab-item" to="/recommend">
      <span class="tab-link">推荐</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/singer">
      <span class="tab-link">歌手</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/rank">
      <span class="tab-link">排行
      </span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/search">
      <span class="tab-link">搜索</span>
    </router-link>
  </div>
</template>

<script>
    export default {
        name: "tab"
    }
</script>

<style scoped>
  .tab{
    height: 45px;
    width: 100%;
    display: flex;
    align-items: center;
  }
  .tab-item{
    width: 25%;
    color: #fff;
    font-size: 14px;
    height: 45px;
    line-height: 45px;
  }
  .router-link-active{
    color: #ffcd32;
    border-bottom: 2px solid #ffcd32 ;
  }
</style>
