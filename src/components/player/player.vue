<template>
    <div class="player" v-show="playList.length>0">
      <div class="normol-player" v-show="fullScreen" >
          <div class="background" :style="bgImg">

          </div>
          <div class="player-top">
            <i class="fa fa-angle-left"></i>
            <h2>{{getcurrentSong.name}}</h2>
            <p>{{getcurrentSong.singer}}</p>
          </div>
          <div class="player-img">
            <img :src="getcurrentSong.img" alt="">
          </div>
          <div class="player-menu">
            <i class="fa fa-random"></i>
            <i class="fa fa-random"></i>
            <i class="fa fa-random play"></i>
            <i class="fa fa-random"></i>
            <i class="fa fa-random"></i>
          </div>
      </div>
      <div class="mini-player" v-show="!fullScreen"></div>
      <audio :src="getcurrentSong.url" autoplay="autoplay"></audio>
    </div>
</template>

<script>
  import {mapGetters} from 'vuex'
    export default {
        name: "player",
        computed:{
          ...mapGetters([
            'fullScreen',
            'playList',
            'currentSong'
          ]),
          getcurrentSong(){
            if(this.currentSong !=undefined){
              return this.currentSong
              this.bgImg=this.currentSong.img
            }else{
              return ''
            }
          },
          bgImg(){
            return `background-image:url(${this.getcurrentSong.img})`;
          }
        },
        mounted() {

          console.log(this.fullScreen);
        }
    }
</script>

<style scoped>
.normol-player{
  width: 100%;
  height: 100%;
  background-color: #333;
  position: fixed;
  top: 0;
  left: 0;
}
.background{
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
  background-size: cover;
  filter: blur(20px);
  width: 100%;
  height: 100%;
  opacity: 0.6;
}
.mini-player{
  width: 100%;
  height: 60px;
  background-color: #333;
  position: fixed;
  left: 0;
  bottom: 0;
}
.player-top{
  width: 100%;
  height: 60px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 9;
}
.player-top i{
  color: #ffcd32;
  position: absolute;
  font-size: 32px;
  left: 15px;
  top: 10px;
}
.player-top h2{
  font-size: 18px;
  color: #fff;
  font-weight: normal;
  margin-top: 8px;
}
.player-top p{
  font-size: 14px;
  color: #fff;
  margin-top: 7px;
}
.player-img{
  margin-top: 30px;
  width: 80%;
  height: auto;
  margin: 30px auto;
  border-radius: 50%;
  position: absolute;
  top: 100px;
  left: 10%;
  z-index: 9;
}
.player-img img{
  width: 100%;
  height: auto;
  border-radius: 50%;
  border: 10px solid rgba(255, 255, 255, 0.1);
}
.player-menu{
  position: absolute;
  left: 0;
  bottom: 50px;
  text-align: center;
  width: 100%;
  z-index: 9;
}
.player-menu i{
  color: #ffcd32;
  font-size: 28px;
}
.play{
  font-size: 32px;
}
</style>
