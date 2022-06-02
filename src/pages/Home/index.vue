<template>
  <div>
    <!-- 三级联动的组件 已经注册为全局组件，可以直接使用，不用引入-->
    <TypeNav/>
    <ListContainer/>
    <Recommend/>
    <Rank/>
    <Like/>
    <Floor v-for="(floor,index) in floorList" :key="floor.id" :list="floor"/>

 
    <Brand/>
  </div>
</template>

<script>
// 引入其余的组件,不是全局组件，因此需要注册
import ListContainer from '@/pages/Home/ListContainer';
import Recommend from '@/pages/Home/Recommend';
import Rank from '@/pages/Home/Rank';
import Like from '@/pages/Home/Like';
import Floor from '@/pages/Home/Floor';
import Brand from '@/pages/Home/Brand';
import {mapState} from 'vuex';
export default {
  name:"",
  components:{
    ListContainer,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand
  },
  mounted() {
    this.$store.dispatch('getFloorList');
  },
  computed:{
    ...mapState({
      floorList:(state) => state.home.floorList
    })
  }

}
</script>

<style>

</style>