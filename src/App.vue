<template>
  <div id="app">
    <m-header></m-header>
    <tab></tab>
    <router-view></router-view>
  </div>
</template>

<script>
  import MHeader from './components/m-header/m-header';
  import Tab from './components/tab/tab';
export default {
  name: 'App',
  components:{
    Tab,
    MHeader,
  }
}
</script>

<style>
*{
  margin: 0px;
  padding: 0px;
}
body{
  background-color: #222;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
