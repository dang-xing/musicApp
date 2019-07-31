<template>
    <transition name="slide">
    <div class="singer-detail">
      <music-list :song="song" :title="title" :bgImg="bgImg"></music-list>
    </div>
    </transition>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {creatSong} from "common/js/song";
  import MusicList from '@/components/music-list/music-list'

  export default {
        name: "singer-detail",
        data(){
          return{
              song:[]
          }
        },
        computed:{
          ...mapGetters([
            'singer'
          ]),
          title(){
            return this.singer.name;
          },
          bgImg(){
            return this.singer.picUrl;
          }
        },
        created() {
          this._getSingerDetail();
        },
        methods:{
          _getSingerDetail:function(){
            if(!this.singer.id){
              this.$router.push('/singer');
              return
            }
            this.axios.get(`http://music.cyxlove.cn/artists?id=${this.singer.id}`).then((res)=>{
              this.song=this._normallist(res.data.hotSongs);
            })
          },
          _normallist:function (list) {
            let ret=[];
            list.forEach((item)=>{
              let hotSongs=item;

                ret.push(creatSong(hotSongs))
            })
            return ret

          }
        },
        components:{
          MusicList,
        }
    }
</script>

<style scoped>
  .slide-enter-active, .slide-leave-active{
    transition: all 0.3s
  }
  .slide-enter, .slide-leave-to{
    transform: translate3d(100%, 0, 0)
  }

</style>
