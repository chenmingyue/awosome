<template>
  <div id="app">
    <!--左侧导航-->

    <leftNav></leftNav>

    <!--操作区域-->
    <div class="main">

      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import LeftNav from '@/components/common/leftNav'
export default {
    name: 'app',
    components: {
      LeftNav
    }
}
</script>

<style>
  body,html{
    height: 100%;
  }
  #app {
    font-family: 'Microsoft YaHei','Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    height:100%;
  }

  .main{
    float:left;
    width:95%;
    background-color: #EFF2F7;
    height:100%;
    overflow: auto;

  }

</style>
