import Vue from 'vue'
import App from './App.vue'

// 三级联动的组件--全局组件
import TypeNav from '@/components/TypeNav'
// 第一个参数：全局组件的名字 第二个参数：哪一个组件

// 引入路由
import router from '@/router';
import store from '@/store';
import corousel from '@/components/corousel';
import Pagination from '@/components/Pagination';

Vue.component(TypeNav.name,TypeNav);
Vue.component(corousel.name,corousel);
Vue.component(Pagination.name,Pagination);
// 样式是一样的所以可以在入口文件中引入
import "swiper/css/swiper.css"
// 引入MockServer.js数据
import '@/mock/mockServe' ;
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  // 注册路由：底下的写法kv是一致的，就省略v，[router是小写的]
  // 注册路由信息，当这里书写router的时候，组件身上都拥有$route,$router属性
  beforeCreate(){
    Vue.prototype.$bus =this
  },
  router,
  store
}).$mount('#app')
