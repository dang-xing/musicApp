<template>
    <div class="m-header">
          <img src="./logo@2x.png" alt="">
          <h2>Chicken Music</h2>
          <router-link tag="div" class="mine" to="/user">
            <i class="fa fa-user-o"></i>
          </router-link>
    </div>
</template>

<script>
    export default {
        name: "m-header"
    }
</script>

<style scoped>
  .m-header{
    width: 100%;
    height: 45px;
  }
  .m-header img{
    width: 30px;
    position: absolute;
    left: 23%;
    top: 7px;
  }
  .m-header h2{
    color: #ffcd32;
    font-size: 18px;
    font-weight: normal;
    line-height: 45px;
  }
  .m-header i{
    color:#ffcd32;
    display: block;
    position: absolute;
    top: 12px;
    right: 20px;
    font-size: 18px;
  }
</style>
