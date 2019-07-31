<template>
      <div class="song-list">
        <ul>
          <li v-for="(item,index) in song" @click="selectitem(song,index)">
            <p>{{item.name}}</p>
            <span>{{item.singer}}</span>
          </li>
        </ul>
      </div>
</template>

<script>

    export default {
        name: "song-list",
        props:{
          song:{
            type:Array,
            default:[],
          }
        },
        methods:{
          selectitem:function(item,index){

            this.$emit('select',item,index);
          }
        }
    }
</script>

<style scoped>
.song-list{
  box-sizing: border-box;
  padding: 10px 15px;
  margin-top: 5px;
}
.song-list ul li{
  color: #fff;
  text-align: left;
  list-style-type: none;
  margin-bottom: 15px;
}
.song-list ul li p{
  font-size: 14px;
}
.song-list ul li span{
  color: hsla(0,0%,100%,.3);
  font-size: 13px;
}
</style>
