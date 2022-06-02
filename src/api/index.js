// 当前这个模块，API进行统一管理
import requests from './request';
import mockRequest from './mockAjax';

// 三级联动接口
// /api/product/getBaseCategoryList

export const reqCategoryList = () =>{
  return requests({url:'/product/getBaseCategoryList',method:'get'})
}
export const reqGetBannerList = ()=>{
   return mockRequest({url:'/banner',method:'get'})
}
export const reqGetFloorList = () =>{
  return mockRequest({url:'/floor',method:'get'})
}

// 获取搜索模块的数据，首先得知道接口是什么 /api/list 方式是post  这个请求是要带参数的
// 获取搜索模块的数据，得给服务器传递默认的参数，至少是一个空对象
export const reqGetSearchInfo = (params) => {
  requests({
    url:"/list",method:"post",data:params
    })
}
// 获取产品详情信息的接口
export const reqGoodsInfo = (skuId) => {
  requests({
    url:`/item/${skuId}`,method:'get'

  })
}
// 将产品添加到购物车中，获取更新某一个产品的个数
export const reqAddOrUpdateShopCart = (skuId,skuNum) => requests({
  url:`/cart/addToCart/${skuId}/${skuNum}`,method:'post'
})


    // 发请求.axio发请求返回的结果是promise对象
    // requests({url:'/product/getBaseCategoryList',method:'get'});

