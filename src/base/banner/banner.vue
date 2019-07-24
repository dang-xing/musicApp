<template>
  <div class="swiper-container swiper1">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(item,index) in bannerData">
        <img :src="item.imageUrl" width="100%"  style="display:block;">
      </div>
    </div>
    <div class="swiper-pagination"></div>
  </div>
</template>

<script>
  import Swiper from "swiper"  //引用swiper
  import 'swiper/dist/css/swiper.min.css';        //引用css
  export default{
    data(){
      return{
        bannerData:[],
      }
    },
    created(){
        this._getBanner();
    },
    mounted(){
      var mySwiper = new Swiper('.swiper1',{
        pagination: '.swiper-pagination',
        autoplay: 2000,
        paginationClickable: true,
        centeredSlides: true,
        autoplayDisableOnInteraction: false,
        preventClicks: false,
        speed: 600,
        observer:true,
        loop: true,
        observeParents:true
      })
    },
    methods:{
      _getBanner:function () {
        this.axios.get('http://music.cyxlove.cn/banner').then((res)=>{
          console.log(res);
          this.bannerData=res.data.banners;
        })
      }
    }
  }
</script>

<style scoped>
</style>
