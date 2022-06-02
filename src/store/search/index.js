// search模块
import { reqGetSearchInfo } from "@/api";
const state = {
    searchInfo:{}
};
const mutations ={
    GETSEARCHINFO(state,searchlist){
        state.searchInfo = searchlist
    }
};
const actions = {
    // 获取search的数据
    async getsearchInfo({commit},params={}){
        let result = await reqGetSearchInfo(params);
       
        if(result.code ===200){
           commit("GETSEARCHINFO",result.data)
           }
       },
};
const getters = {
    // 当前形参state，是当前仓库中的state，并非是大仓库中的state
    goodsList(state){
        return state.searchInfo.goodsList||[];
    },
    trademarkList(state){
        return state.searchInfo.trademarkList||[];
    },
    attrsList(state){
        return state.searchInfo.attrsList||[];
    }
};

export default{
    state,
    mutations,
    actions,
    getters
}