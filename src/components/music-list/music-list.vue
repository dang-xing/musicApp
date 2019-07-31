<template>
  <div class="music-list" ref="musiclist">
    <div class="music-top" :style="bgStyle" ref="musictop">
      <i class="fa fa-angle-left" @click="goBack()"></i>
      <h2>{{title}}</h2>
      <div class="filter"></div>
      <button class="play-btn" ref="btn">随机播放</button>
    </div>
    <scroll :data="song" class="list" ref="list">
      <div><song-list :song="song" @select="selectitem"></song-list></div>
    </scroll>

  </div>

</template>

<script>
    import Scroll from 'base/scroll/scroll'
    import SongList from '@/components/song-list/song-list'
    import {mapActions} from 'vuex'
    export default {
        name: "music-list",
        props:{
          bgImg:{
            type:String,
            default:'',
          },
          title:{
            type:String,
            default: ''
          },
          song:{
            type:Array,
            default:[],
          }
        },
        computed:{
          bgStyle:function () {
            return `background-image:url(${this.bgImg})`;
          }
        },
        mounted(){
          this.$refs.list.$el.style.top=`${this.$refs.musictop.clientHeight}px`
          this.getCenter();
        },
        methods:{
          getCenter:function(){
            this.$refs.btn.style.left=`${(this.$refs.musiclist.clientWidth-this.$refs.btn.clientWidth)/2}px`
          },
          goBack:function () {
            this.$router.push('/singer');
          },
          selectitem:function (item,index) {
            this.setPlayer({
              list:item,
              index:index,
            })
          },
            ...mapActions({
              setPlayer:'selectPlay'
            })
        },
        components:{
          Scroll,
          SongList
        }
    }
</script>

<style scoped>
  .music-list{
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 100;
    background-color: #333;
  }

  .music-top i{
    color:#ffcd32;
    display: block;
    position: absolute;
    top: 12px;
    left: 20px;
    font-size: 30px;
    z-index: 99;
  }
  .music-top h2{
    color: #fff;
    font-size: 16px;
    height: 55px;
    line-height: 55px;
    font-weight: normal;
    position: absolute;
    left: 10%;
    width: 80%;
    top: 0;
    z-index: 99;
  }
.music-top{
  background-size: cover;
  position: relative;
  width: 100%;
  height: 0;
  padding-top: 70%;
  transform-origin: top;
  background-size: cover;
  z-index: 99;
}
.filter{
  width: 100%;
  padding-top: 70%;
  background-color: rgba(7,17,27,.4);
  position: absolute;
  left: 0;
  top: 0;

}
  .list{
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    background-color: #333;
    z-index: 9;
  }
  .play-btn{
    width: 120px;
    height: 30px;
    background: none;
    border:1px solid #ffcd32;
    color: #ffcd32;
    border-radius: 5px;
    position: absolute;
    bottom: 20px;
  }

</style>
