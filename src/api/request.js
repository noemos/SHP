// 这里需要对axios进行封装
import axios from "axios";
// 引入进度条
import nprogress from "nprogress";
// 引入进度条的样式
import "nprogress/nprogress.css";

// 1.利用axios对象的方法create，去创建一个axios实例
// 2.request就是axios，只不过稍微配置一下
const requests = axios.create({
    // 配置对象
    // 基础路径，发送请求时，路径中会出现API
    baseURL:"/api",
    // 代表请求超时时间5s
    timeout:5000,
});
// 请求拦截器：在发请求之前，请求拦截器可以检测到。可以在请求发出去之前做一些事情
requests.interceptors.request.use((config)=>{
    // config:配置对象，在对象里面有一个属性很重要，headers请求
    // 进度条开始动
    nprogress.start();
    return config;
});
//响应拦截器：
requests.interceptors.response.use((res)=>{
    // 成功的回调函数：服务器响应数据回来以后，响应拦截器可以检测到，可以做一些事情
    // 进度条结束
    nprogress.done();
    return res.data;
},(error)=>{
    return Promise.reject(error);

});

// 对外暴露
export default requests;