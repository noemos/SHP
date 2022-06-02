<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread 面包屑,带有x的结构-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 分类的面包屑 -->
            <li class="with-x" v-if="searchParams.categoryName">{{searchParams.categoryName}}<i @click="removeCategoryName">×</i></li>
            <!-- 关键字的面包屑 -->
            <li class="with-x" v-if="searchParams.keyword">{{searchParams.keyword}}<i @click="removeKeyWord">×</i></li>
            <!-- 品牌的面包屑展示,判断品牌的字段有没有东西-->
            <li class="with-x" v-if="searchParams.trademark">{{searchParams.trademark.split(":")[1]}}<i @click="removeTradeMark">×</i></li>
            <!-- 平台的售卖的属性值展示 -->
            <li class="with-x" v-for="(attrValue,index) in searchParams.props" :key="index">{{searchParams.trademark.split(":")[1]}}<i @click="removeAttr(index)">×</i></li>

          </ul>
        </div>

        <!--selector-->
        <SearchSelector @trademarkInfo="trademarkInfo" @attrInfo ="attrInfo" />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{active:isOne}" @click="changeOrder(1)">
                  <a>综合<span v-show="isOne" class="iconfont" :class="{'icon-up':isAsc,'icon-todown':isDsc}"></span></a>
                </li>
                <li :class="{active:isTwo}" @click="changeOrder(2)">
                  <a>价格<span v-show="isTwo" class="iconfont" :class="{'icon-up':isAsc,'icon-todown':isDsc}"></span></a>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="(good,index) in goodList" :key="good.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <!-- 在路由跳转的时候不能忘记带参数 -->
                    <router-link :to="`/detail/${good.id}`">
                      <img src="good.defaultImg"/>
                    </router-link>
                    
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{good.price}}.00</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a
                      target="_blank"
                      :title="good.title">
                      {{good.title}}
                      </a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页器 -->
          
        <Pagination :pageNo="searchParams.pageNo" :pageSize="searchParams.pageSize" :total ="total" :continues="5" @getPageNo="getPageNo"/>
        
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import SearchSelector from './SearchSelector/SearchSelector'
  import {mapGetters,mapState} from 'vuex'
  export default {
    name: 'Search',

    components: {
      SearchSelector
    },
    data() {
      return {
        // 带服务器参数
        searchParams:{
          "category1Id": "",
          "category2Id": "",
          "category3Id": "",
          // 分类的名字
          "categoryName": "",
        // 关键字
          "keyword": "",
          // 排序
          "order": "1:desc",
          "pageNo": 1,
          "pageSize": 10,
          "props": [""],
          "trademark": ""

        }
      }
    },
    beforeMount() {
      // this.searchParams.category1Id = this.$route.query.category1Id;
      // this.searchParams.category2Id = this.$route.query.category2Id;
      // this.searchParams.category3Id = this.$route.query.category3Id;
      // this.searchParams.categoryName = this.$route.query.categoryName;
      // this.searchParams.keyword = this.$route.params.keyword
      Object.assign(this.searchParams,this.$route.query,this.$route.params);
    },
    mounted() {
      // 先测试接口返回的数据格式
      this.getDate();
      
    },
    computed:{
      ...mapGetters(['goodsList']),
      isOne(){
        return this.searchParams.order.indexOf('1') != -1;
      },
      isTwo(){
        return this.searchParams.order.indexOf('2') != -1;
      },
      isAsc(){
        return this.searchParams.order.indexOf('asc') != -1;
      },
      isDsc(){
        return this.searchParams.order.indexOf('dsc')!= -1;
      },
      ...mapState({
        total:state =>state.search.searchList.total
      })
    },
    methods: {
      getDate(){
        // 把search请求封装成为一个函数，当你需要调用的时候调用即可
        this.$store.dispatch('getsearchInfo',)
      },
      removeCategoryName(){
        // 把带给服务器的参数置空了.还需要向服务器发送请求,带给服务器的参数是可有可无的,如果属性值为空的字符串还是会把相应的
        // 字段带给服务器,但是如果把相应的空改为undefined,那么当前这个字段不会带给服务器
        this.searchParams.categoryName = undefined;
        this.searchParams.category1Id=undefined;
        this.searchParams.category2Id=undefined;
        this.searchParams.category3Id=undefined;
        this.getDate();
        // 地址栏也需要改修改,进行路由跳转
        // 本意是删除query参数,但是如果在搜索的时候出现params参数,那么则会不小心把params参数删除,目的是不需要删除params参数
        if(this.$route.params){
          this.$router.push({name:"search",params:this.$route.params})
        }
      },
      
      // 删除关键字
      removeKeyWord(){
        // 给服务器带的参数searchParams的keyword置空
         this.searchParams.keyword = undefined;
        //  再次发请求,获取数据 
         this.getDate();
        //  通知兄弟组件header清除关键字
        this.$bus.$emit("clear");
        if(this.$router.query){
          this.$router.push({name:"search",query:this.$route.query})
        }

      },
      // 自定义事件的回调
      trademarkInfo(trademark){
        // 整理品牌的名称id
        this.searchParams.trademark=`${trademark.tmId}:${trademark.tmName}`;
        // 再次发请求获取search数据进行展示
        this.getDate()
      },
      // 删除品牌的信息
      removeTradeMark(){
        this.searchParams.trademark=undefined;
        this.getDate()
      },
      attrInfo(attr,attrValue){
        let props =`${attr.attrId}:${attrValue}:${attr.attrName}`;
        // 数组去重
        if(this.searchParams.props.indexOf(props)==-1){
          this.searchParams.props.push(props);
        }
        
        this.getDate();
      },
      removeAttr(index){
        this.searchParams.props.splice(index,1);
        this.getDate()

      },
      changeOrder(flag){
        // flag代表用户点击的是几
        let originOrder =this.searchParams.order;
        let originFlag = this.searchParams.order.split(":")[0];
        let originSort = this.searchParams.order.split(":")[1];
        if(flag == originFlag){
          newOrder = `${originFlag}:${originSort=="dsc"?"asc":"dsc"}`;
        }else{
          newOrder=`${flag}:${`dsc`}`;
        }
        this.searchParams.order = newOrder;

        this.getDate()

         
      },
      getPageNo(pageNo){
        this.searchParams.pageNo = pageNo;
        this.getDate();

      }

    },
    watch:{
      // 监听组件实例身上的属性
      $route(newValue,oldValue){
        // 再次发送请求之前整理带给服务器参数
        Object.assign(this.searchParams,this.$route.query,this.$route.params);
        // 在次发起ajax请求
        this.getDate();
        // 每次请求完毕,应该把相应的1,2,3三级分类的id置空,让她接受下一次相应的id
        this.searchParams.category1Id ="";
        this.searchParams.category2Id ="";
        this.searchParams.category3Id ="";

      }
    },
    // 面包屑中的关键字清除以后,需要让兄弟组件Header组件中的关键字清除
    // 涉及到组件通信
    // props:父子
    // 自定义事件:子父
    // vuex:仓库数据(万能)
    // 插槽:父子
    // pubsub-js:完成
    // $bus 全局事件总线
    
  }
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>