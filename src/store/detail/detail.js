import { reqGoodsInfo,reqAddOrUpdateShopCart } from "@/api"
const state ={
    goodInfo:{}
}
const mutations={
    GETGoodInfo(state,goodInfo){
        state.goodInfo = goodInfo;
    },
};
const actions={
    // 获取产品信息的action
    async getGoodInfo({commit},skuId){
        let result = await reqGoodsInfo(skuId);
        if(result.code==200){
            commit('GETGOODINFO',result.data);
        }
    },
    async addOrUpdateShopCart({commit},{skuId,skuNum}){
         let result = await reqAddOrUpdateShopCart(skuId,skuNum);
         if(result.code ===200){
            return "ok"
         }else{
             return Promise.reject(new Error("fail"))
         }
    }


}

const getters={
    categoryView(state){
        return state.goodInfo.categoryView||{ };
    },
    skuInfo(state){
        return state.goodInfo.skuInfo||{};
    },
    spuSaleAttrList(state){
        return state.goodInfo.spuSaleAttrList||[]

    }
}
export default{
    state,
    mutations,
    actions,
    getters
}