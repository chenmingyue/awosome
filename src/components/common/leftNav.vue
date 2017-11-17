<template>
    <div class='left-nav'>
      <ul>
        <li class="active">

          <router-link to="/">
            <i class="iconfont">&#xe601;</i>
            <div>收银</div>
          </router-link>
        </li>

        <li>
          <router-link to="/store">
          <i class="iconfont">&#xe603;</i>
          <div>店铺</div>
          </router-link>
        </li>

        <li>
          <router-link to="/goods">
          <i class="iconfont">&#xe600;</i>
          <div>商品</div>
          </router-link>
        </li>

        <li>
          <router-link to="/member">
          <i class="iconfont">&#xe604;</i>
          <div>会员</div>
          </router-link>
        </li>
      </ul>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
      name: 'leftNav',
      data () {
        return {

        }
      }

    }
</script>

<style>
  .left-nav{
    color:#fff;
    font-size:10px;
    height:100%;
    background-color: #1D8ce0;
    float:left;
    width:5%;
  }
  .iconfont{
    font-size:24px;
  }
  .left-nav ul{
    padding:0px;
    margin: 0px;
  }
  .left-nav li{
    list-style: none;
    text-align: center;
    border-bottom:1px solid #20a0ff;
    padding:10px;
    cursor: pointer;
  }
.left-nav a{
  color: #fff;
  text-decoration: none;
}
</style>
