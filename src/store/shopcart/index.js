import { reqCategoryList } from "@/api"

const state ={}
const mutations={}
const actions={
    // 获取购物车的列表数据
    async getCartList({commit}){
        let result = await reqCategoryList();
    }
}
const getters ={}

export default{
    state,
    mutations,
    actions,
    getters
}