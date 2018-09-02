import Vue from 'vue'
import App from './App.vue'

//引入index组件
import index from './components/index.vue'
//引入商品详情组件 goodsInfo
import goodsInfo from './components/goodsInfo.vue'
<<<<<<< HEAD
//引入购物车页面
import buyCar from './components/buyCar.vue'
=======
>>>>>>> eca70421061582515b5ca747e096e2d03d32ed0f
// 引入路由模块
import VueRouter from 'vue-router'
//使用路由中间件
Vue.use(VueRouter);

//引入elementui组件
import ElementUI from 'element-ui';
//引入element样式
import 'element-ui/lib/theme-chalk/index.css';
// 使用element中间件
Vue.use(ElementUI);
//引入ivewi组件
import iView from 'iview';
import 'iview/dist/styles/iview.css';
//引入vuex
import Vuex from 'vuex'
// 使用vuex中间件
Vue.use(Vuex)


// 引入懒加载
import VueLazyload from 'vue-lazyload'
//懒加载中间件
Vue.use(VueLazyload, {
  loading:require('./assets/statics/img/20180829173111.jpg')
})
//使用iVewi中间件
Vue.use(iView);

// 导入axios模块 使其变成公共的
import axios from 'axios'
Vue.prototype.axios=axios
// 使用baseurl
axios.defaults.baseURL = 'http://47.106.148.205:8899';

// 引入moment模块
import moment from 'moment'
//全局过滤器
Vue.filter('cutTime',function (value) { 
  return moment(value).format("YYYY年MM月DD日")
 })
Vue.filter('cutTimeHh',function (value) { 
  return moment(value).format("YYYY年MM月DD日 h:mm:ss")
 })

 import ProductZoomer from 'vue-product-zoomer'
 Vue.use(ProductZoomer,{
       
 })



//注册路由规则
const router =new VueRouter({
  routes: [
    {
      path:"/",
      redirect:'/index'
    },
    {
      path:'/index',
      component:index
    },
    {
      path:'/goodsInfo/:id',
      component:goodsInfo
<<<<<<< HEAD
    },
    {
      path:'/buyCar',
      component:buyCar
=======
>>>>>>> eca70421061582515b5ca747e096e2d03d32ed0f
    }
  ]


})
<<<<<<< HEAD
// 判断数据是否存在
let buyList = JSON.parse(window.localStorage.getItem('buyList'))||{};
//实例化远程仓库
const store = new Vuex.Store({
  state: {
    buyList
  },
  //取值
  getters:{
    buyTotal(state){
        let num =0
        for (const key in state.buyList) {
          //累加总数
          num+=parseInt(state.buyList[key]);
        }
        return num
    }
  },
  mutations: {
    //info=>goodId:xxx , goodNum:xxx
    buyGood(state,info){
      if(state.buyList[info.goodId]){
        let oldnum=parseInt(state.buyList[info.goodId])
        oldnum+=parseInt(info.goodNum)
        // 重新赋值
        state.buyList[info.goodId]=oldnum
      }else{
        Vue.set(state.buyList,info.goodId,parseInt(info.goodNum))
      }
=======
const store = new Vuex.Store({
  state: {
    count: 1
  },
  mutations: {
    increment (state,n) {
      // 变更状态
      state.count++
>>>>>>> eca70421061582515b5ca747e096e2d03d32ed0f
    }
  }
})

Vue.config.productionTip = false

//引入css样式首页头部和底部的
import "./assets/statics/site/css/style.css"

new Vue({
  el:"#app",
  // 挂载到实例
  router,
  //挂载vuex到实例
  store,
  // ProductZoomer,
  render: h => h(App)
})

window.onbeforeunload=function () { 
  window.localStorage.setItem('buyList',JSON.stringify(store.state.buyList))
 }
 