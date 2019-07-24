<template>
    <div class="home">
      <scroll ref="scroll" class="recommend-content" :data="musciData">
      <div class="musci-wrap">
        <banner></banner>

        <div class="hot-music">
          <h1>热门歌单推荐</h1>
          <div class="music-list" v-for="(item,index) in musciData">
              <img v-lazy="item.picUrl" alt="" width="60px">
              <p>{{item.name}}</p>
              <span>{{item.copywriter}}</span>
          </div>
        </div>
      </div>
      </scroll>
    </div>
</template>

<script>
    import Banner from 'base/banner/banner'
    import Scroll from 'base/scroll/scroll'
    export default {
        name: "recommend",
        components:{
          Banner,
          Scroll,
        },
        data(){
          return{
            musciData:[],
          }
        },
        created() {
         this._getHotMusic();
        },
        methods:{
          _getHotMusic:function(){
            this.axios.get('http://music.cyxlove.cn/personalized').then((res)=>{
                this.musciData=res.data.result;
            })
          }
        }
    }
</script>

<style scoped>
.hot-music h1{
  font-size: 14px;
  color: #ffcd32;
  text-align: center;
  height: 30px;
  line-height: 30px;
  font-weight: normal;
  margin: 15px 0;
}
.music-list{
  box-sizing: border-box;
  padding: 5px 20px;
  text-align: left;
  margin-bottom: 15px;
}
.music-list img{
  float: left;
  margin-right: 15px;
}
.music-list p{
  font-size: 14px;
  color: #fff;
  margin-bottom: 5px;
}
.music-list span{
  color: hsla(0,0%,100%,.3);
  font-size: 12px;
}
.home{
  position: fixed;
  width: 100%;
  top: 95px;
  bottom: 0;
}
.recommend-content{
  height: 100%;
  overflow: hidden;
}
</style>
