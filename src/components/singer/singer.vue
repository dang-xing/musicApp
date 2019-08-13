<template>
    <div class="singer">
      <scroll ref="scroll" class="recommend-content" :data="singerData">
      <div class="hot-singer">
        <div class="title">热门歌手</div>
        <div class="singer-list">
          <ul>
            <li v-for="(item,index) in singerData" @click="selectSinger(index)">
              <img v-lazy="item.picUrl" alt="">
              <span>{{item.name}}</span>
            </li>
          </ul>
        </div>
      </div>
      </scroll>
      <router-view></router-view>
    </div>
</template>

<script>
  import Scroll from 'base/scroll/scroll'
  import {mapMutations} from 'vuex'
    export default {
        name: "singer",
        data(){
          return{
            singerData:[],

          }
        },
        created() {
          this._singerData();
        },
        methods:{
          _singerData:function(){
            this.axios.get('http://music.cyxlove.cn/top/artists?offset=0&limit=30').then((res)=>{
              console.log(res);
              if(res.data.artists){
                this.singerData=res.data.artists;
              }
            })
          },
          selectSinger:function(index){
              this.$router.push(`/singer/${this.singerData[index].id}`)
              var singer=this.singerData[index];
              this.setSinger(singer);
          },
          ...mapMutations({
            setSinger:'SET_SINGER'
          })
        },
      components:{
        Scroll,
      }
    }
</script>

<style scoped>
.title{
  height: 30px;
  width: 100%;
  background-color: #333;
  color: #fff;
  font-size: 14px;
  line-height: 30px;
  text-align: left;
  margin-top: 10px;
  text-indent: 10px;
}
.singer-list ul li{
  display: flex;
  align-items: center;
  padding: 20px 0 0 10px;
}
.singer-list ul li img{
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-right: 15px;
}
.singer-list ul li span{
  font-size: 14px;
  color: #fff;
}
.recommend-content{
  height: 100%;
  overflow: hidden;
}
.singer{
  position: fixed;
  width: 100%;
  top: 95px;
  bottom: 0;
}
</style>
