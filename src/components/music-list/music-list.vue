<template>
  <div style="color: #fff;" v-html="title"></div>
</template>

<script>
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
        }
    }
</script>

<style scoped>

</style>
