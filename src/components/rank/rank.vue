<template>
    <div class="rank">
      <div class="rank-list" v-for="(item,index) in rankData" >
        <div class="rank-list-left">
          <img v-lazy="item.coverImgUrl" alt="">
        </div>
        <div class="rank-list-right">
          <ul>
            <li v-for="(item,index) in item.tracks">{{index+1}}.&nbsp&nbsp{{item.first}}--{{item.second}}</li>
          </ul>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "rank",
        data(){
          return{
            rankData:[],
          }
        },
        created(){
          this._rankData();
        },
        methods:{
          _rankData:function(){
            this.axios.get('http://music.cyxlove.cn/toplist/detail').then((res)=>{
              if(res.data.list){
                this.rankData=res.data.list;
                this.rankData.splice(4,this.rankData.length-1);
              }

            })
          }
        }

    }
</script>

<style scoped>
.rank{
  margin-top: 20px;
}
.rank-list{
  width: 95%;
  margin: 15px auto;
  height: 100px;
  background-color: #333;
}
.rank-list-left{
  width: 30%;
  height: 100px;
  background-color: #f00;
  float: left;
}
.rank-list-left img{
  width: 100%;
  height: 100%;
}
.rank-list-right{
  width: 70%;
  height: 100px;
  float: left;
  box-sizing: border-box;
  padding-top: 12px;
}

.rank-list-right ul li{
  list-style-type: none;
  color: #fff;
  font-size: 14px;
  text-align: left;
  height: 25px;
  line-height: 25px;
  box-sizing: border-box;
  padding-left: 10px;
  overflow: hidden;
}
</style>
