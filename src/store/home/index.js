// home模块的小仓库
import {reqCategoryList,reqGetBannerList,reqGetFloorList} from '@/api';
const state = {
    categoryList:[],
    bannerList:[],
    floorList:[]
};
const mutations ={
    CATEGORYLIST(state,categoryList){
        state.categoryList = categoryList.slice(0,15);
        
    },
    GETBANNERLIST(state,bannerList){
        state.bannerList = bannerList;
    },
    GETFLOORLIST(state,floorList){
        state.floorList = floorList
    }
};
const actions = {
    // 通过API里面的接口函数调用，向服务器发请求，获取里面的数据
    async categoryList({commit}){
     let result = await reqCategoryList();
    
     if(result.code ===200){
        commit("CATEGORYLIST",result.data)
        }
    },
    async getBannerList({commit}){
        let result = await reqGetBannerList();
        console.log(result);
        if(result.code===200){
            commit('GETBANNERLIST',result.data);

        }
    },
    async getFloorList({commit}){
        let result = await reqGetFloorList();
        console.log(result);
        if(result.code===200){
            commit('GETFLOORLIST',result.data);

        }
    },
    
};
const getters = {};

export default{
    state,
    mutations,
    actions,
    getters
}