import Vue from "vue";
import Vuex from "vuex";
 Vue.use(Vuex);
import home from "./home";
import search from "./search";
import detail from "./detail/detail";
 const state = {};
 const mutations ={};
 const actions = {};
 const getters = {};

 export default new Vuex.Store({
     modules:{
         home,
         search,
         detail
     }
 })
