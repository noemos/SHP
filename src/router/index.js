// 配置路由的地方
import Vue from "vue";
import VueRouter from "vue-router";
import routes from './routes'

// 使用插件
Vue.use(VueRouter);

// 配置路由
// 首先要暴露一个vuerouter实例
export default new VueRouter({
    // 配置路由
    routes,
    scrollBehavior(to, from, savedPosition) {
        //设置Y轴的起点【y属性值没有负数】
        //当然滚动行为也可以设置x轴的
        return { y: 0 }
   }
})