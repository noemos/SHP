<template>
<div>
<Header></Header>
<!-- 需要书写路由出口的地方 -->
<router-view></router-view>
<!-- 在Home、Search是显示的，在登录和注册的时候是隐藏的 这种方法有局限性，就是组件多的情况下，就会写的很多-->
<!-- <Footer v-show="$route.path=='/home'||$route.path=='/search'"></Footer> -->
<Footer v-show="$route.meta.show"></Footer>
</div>
</template>

<script>
// 引入
import Header from './components/Header'
import Footer from './components/Footer'
export default{
  name:"",
  components:{
    Header,
    Footer
  }
}
</script>

<style>
</style>
