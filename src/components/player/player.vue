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
          <div class="player-img" style="display: none">
            <img :src="getcurrentSong.img" alt="" :class="adClass" >
          </div>
          <scroll class="lyice-top" :data="lyiceData.lines" ref="lyricList">
          <div class="player-img lyice">
              <p v-for="(item,index) in lyiceData.lines" v-bind:class="{activelyice: currentNum===index}" ref="lyiceline">{{item.txt}}</p>
          </div>
          </scroll>
          <div class="play-time" >
             <div class="start-time" ref="startbox">{{time(currentTime)}}</div>
              <div class="pro-wrap">
                <div class="pro-line" ref="progressbar" >
                  <div class="pro-drag" @click="playSongmove"></div>
                  <div @touchstart.prevent="prostart" @touchmove.prevent="promove" @touchend.prevent="proend">
                  <span class="pro-btn" ref="probtn"></span>
                  <div class="pro-bg" ref="probg" ></div>
                  </div>
                </div>
              </div>
              <div class="end-time" >{{time(endTime)}}</div>
          </div>
          <div class="player-menu">
            <i :class="playmodel" @click="playModel"></i>
            <i class="fa fa-fast-backward" @click="prevMusic"></i>
            <i class="play-btn" @click="playMusic" :class="playicon"></i>
            <i class="fa fa-fast-forward" @click="nexPlay"></i>
            <i class="fa fa-heart-o"></i>
          </div>
      </div>
      <div class="mini-player" v-show="!fullScreen"></div>
      <audio :src="getcurrentSong.url" ref="audio" @timeupdate="updatetime" @suspend="endtime" @ended="endPlay" ></audio>
    </div>
</template>

<script>
  import {mapGetters,mapMutations} from 'vuex'
  import Scroll from 'base/scroll/scroll'
  import Lyric from 'lyric-parser'
    export default {
        name: "player",
        data(){
          return{
            currentTime:'0',
            endTime:'0',
            lyiceData:[],
            currentNum:0,
          }
        },
        computed:{
          ...mapGetters([
            'fullScreen',
            'playList',
            'currentSong',
            'playing',
            'currentIndex',
            'loop',
            'order',
          ]),
          playmodel(){
            if(this.loop){
              return 'fa fa-refresh'
            }
            if(this.order){
              return 'fa fa-retweet'
            }
          },
          adClass(){
            return this.playing ? 'play':'play pause';
          },
          playicon(){
            return this.playing ? 'fa fa-pause-circle-o':'fa fa-play-circle-o'
          },
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
          },
          percent(){
            return this.currentTime / this.endTime
          }
        },
        mounted() {
          console.log(this.fullScreen);

        },
        created(){
          this.touch={}
        },
        methods:{
          ...mapMutations({
            setplaying:'SET_PLAYING',
            setIndex:'SET_CURRENTINDEX',
          }),
          playModel:function(){

          },
          prostart:function(e){
            this.touch.init=true;
            this.touch.moveX=e.touches[0].pageX
            this.touch.left=this.$refs.probg.clientWidth
          },
          //获取歌词
          getLyc:function(){
            if(this.currentSong !=undefined){
              var id=this.currentSong.id;
            }
            this.axios.get(`http://music.cyxlove.cn/lyric?id=${id}`).then((res)=>{
                if(res.data.lrc.lyric !=''){
                  this.lyiceData=new Lyric(res.data.lrc.lyric,this.handleLyric);
                  if(this.playing){
                    this.lyiceData.play();
                  }
                }

            })
          },
          handleLyric:function({lineNum,txt}){
              this.currentNum=lineNum;
            if (lineNum > 5) {
              let lineEl = this.$refs.lyiceline[lineNum - 7]
              this.$refs.lyricList.scrollToElement(lineEl, 1000)
            }
            if(lineNum<1){
              this.$refs.lyricList.scrollTo(0,0,1000);
            }
          },
          promove:function(e){
            if(!this.touch.init){
              return
            }
            const dataX=e.touches[0].pageX-this.touch.moveX;
            const offsetWidth=Math.min(this.$refs.progressbar.clientWidth-15,Math.max(0,this.touch.left+dataX))
            this.$refs.probg.style.width=`${offsetWidth}px`;
            this.$refs.probtn.style.left=`${offsetWidth}px`
            const barWidth=this.$refs.progressbar.clientWidth-15;
            const lace=this.$refs.probg.clientWidth / barWidth
            const currentTime=lace*this.endTime;
            this.$refs.audio.currentTime=lace*this.endTime;
            if(!this.playing){
              this.playMusic();
            }
            if(this.lyiceData){
              this.lyiceData.seek(currentTime*1000);
            }

          },
          proend:function(){
            this.touch.init=false;
          },
          playSongmove:function(e){
            const rect = this.$refs.startbox.clientWidth
            const offsetWidth = e.pageX - rect;
            this.$refs.probg.style.width=`${offsetWidth }px`;
            this.$refs.probtn.style.left=`${offsetWidth }px`
            const barWidth=this.$refs.progressbar.clientWidth-15;
            const lace=this.$refs.probg.clientWidth / barWidth
            const currentTime=lace*this.endTime;
            this.$refs.audio.currentTime=currentTime;
            if(this.lyiceData){
              this.lyiceData.seek(currentTime*1000);
            }
            if(!this.playing){
              this.playMusic();
            }
          },
          playMusic:function(){
              this.setplaying(!this.playing);
          },
          nexPlay:function () {
            let index=this.currentIndex+1;
            if(index==this.playList.length){
              index=0;
            }
            this.setIndex(index);
            if(!this.playing){
              this.playMusic();
            }
          },
          prevMusic:function(){
            let index=this.currentIndex-1;
            if(index==-1){
              index=this.playList.length-1;
            }
            this.setIndex(index);
            if(!this.playing){
              this.playMusic();
            }
          },
          updatetime:function (e) {
            this.currentTime=e.target.currentTime;
          },
          endtime:function(e){
            this.endTime=e.target.duration;

          },
          endPlay:function(){
            if(this.loop){
              this.$refs.audio.loop='loop';
              return
            }
            if(this.order){
              this.$refs.audio.loop=false;
              this.nexPlay();
            }

          },
          time:function (value) {
            let m=parseInt(value/60)
            let s=parseInt(value%60)
            if(m<10){
              m='0'+m
            }
            if(s<10){
              s='0'+s
            }
            return `${m}:${s}`
          }
        },
        watch:{
          currentSong(){
            clearTimeout(timer)
            const  timer=setTimeout(()=>{
              this.$refs.audio.play()
              this.getLyc();
            },200)

          },
          playing(newPlaying){
            let audio=this.$refs.audio;
            this.$nextTick(()=>{
              newPlaying ? audio.play() : audio.pause();
              setTimeout(()=>{
                if(newPlaying){
                  if(this.lyiceData){
                    this.lyiceData.seek(this.currentTime*1000);
                  }
                }else{
                  this.lyiceData.stop();
                }
              },1000)

            })

          },
          percent(){
            if(this.percent>=0){
              const barWidth=this.$refs.progressbar.clientWidth-15;
              const offsetWidth=this.percent*barWidth;
              this.$refs.probg.style.width=`${offsetWidth}px`;
              this.$refs.probtn.style.left=`${offsetWidth}px`
            }
            //console.log(this.percent);
          }
        },
        components:{
          Scroll,
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
  left: 7.5%;
  z-index: 9;
}
.play{
  animation: rotate 20s linear infinite
}
.pause{
  animation-play-state: paused
}
@keyframes rotate{
0%{
  transform: rotate(0)
}
100%{
  transform: rotate(360deg)
}
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
  display: flex;
  align-items: center;
  justify-content: center;
}
.player-menu i{
  color: #ffcd32;
  font-size: 28px;
  font-weight: normal;
  display: inline-block;
  margin: 0 15px;
}
.play-btn{
  font-size: 45px !important;
}
.play-time{
  height: 30px;
  width: 100%;
  position: absolute;
  left: 0;
  bottom: 110px;
  z-index: 9;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: #fff;
}
.start-time{
  width: 15%;
  text-align: center;
}
.pro-wrap{
  width: 70%;
}
.end-time{
  width:15%;
  text-align: center;
}
.pro-line{
  width: 100%;
  height: 5px;
  background-color: #ccc;
  position: relative;
}
.pro-btn{
  width: 15px;
  height: 15px;
  display: block;
  background-color: #ffcd32;
  border-radius: 50%;
  position: absolute;
  left: 0;
  top: -3.5px;
  z-index: 10;
}
.pro-bg{
  width: 0%;
  height: 5px;
  background-color: #ffcd32;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 7;
}
.pro-drag{
  width: 100%;
  height: 5%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 8;
}
.lyice-top{
  width: 100%;
  height: 420px;
  overflow: hidden;
  position: absolute;
  left: 0;
  top: 80px !important;
  text-align: center !important;
}
.lyice{
  overflow: hidden;
  border-radius: unset;
}
.lyice p{
  color: #ccc;
  font-size: 14px;
  height: 30px;
  line-height: 30px;
}
.activelyice{
  color: #fff !important;
}
</style>
