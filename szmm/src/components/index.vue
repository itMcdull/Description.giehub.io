<template>
    <div class="index">
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="#/" class="router-link-active">首页</a> &gt;
                <a href="#/site/goodslist" class="router-link-exact-active router-link-active">购物商城</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper">
                <div class="wrap-box">
                    <div class="left-220" style="margin: 0px;">
                        <div class="banner-nav">
                            <ul>
                                <li v-for="(item, index) in catelist" :key="item.id">
                                    <h3>
                                        <i class="iconfont icon-arrow-right"></i>
                                        <span>{{item.title}}</span>
                                        <p>
                                            <span v-for="(i, index) in item.subcates" :key="i.id">
                                                {{i.title}}&nbsp;
                                            </span>

                                        </p>
                                    </h3>
                                    <div class="item-box">
                                        <dl>
                                            <dt>
                                                <a href="/goods/40.html">{{item.title}}</a>
                                            </dt>
                                            <dd>
                                                <a v-for="(i, index) in item.subcates" :key="i.id" href="/goods/43.html">{{i.title}}</a>

                                            </dd>
                                        </dl>
                                    </div>
                                </li>

                            </ul>
                        </div>
                    </div>
                    <!--幻灯片-->
                    <div class="left-705">
                        <!-- <div class="box"> -->
                            <el-carousel :interval="4000" type="card" height="341px">
                                <el-carousel-item v-for="(item, index) in sliderlist" :key="item.id">
                                    <img :src="item.img_url" :alt="item.title">
                                </el-carousel-item>
                            </el-carousel>
                        <!-- </div> -->
                    </div>
                    <!--/幻灯片-->
                    <div class="left-220">
                        <ul class="side-img-list">
                            <li v-for="(item, index) in toplist" :key="item.id">
                                <div class="img-box">
                                    <label>{{index+1}}</label>
                                    <img :src="item.img_url">
                                </div>
                                <div class="txt-box">
<<<<<<< HEAD
                                    <router-link :to="'/goodsInfo/'+item.id">{{item.title}}</router-link>
=======
                                    <a href="/goods/show-98.html">{{item.title}}</a>
>>>>>>> eca70421061582515b5ca747e096e2d03d32ed0f
                                    <span>{{item.add_time | cutTime }}</span>
                                </div>
                            </li>

                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="section" v-for="(item, index) in goodlist" :key="item.level1cateid">
            <div class="main-tit">
                <h2>{{item.catetitle}}</h2>
                <p>
                    <a href="/goods/43.html" v-for="(itemson, i) in item.level2catelist" :key="itemson.subcateid">{{itemson.subcatetitle}}</a>
                    <!-- <a href="/goods/43.html">摄影摄像</a> -->
                    <a href="/goods/40.html">更多
                        <i>+</i>
                    </a>
                </p>
            </div>
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <ul class="img-list">
                        <li v-for="(itemson, i) in item.datas" :key="itemson.artID">
                            <router-link :to="'/goodsInfo/'+itemson.artID">
                                <div class="img-box">
                                    <img v-lazy="itemson.img_url ">
                                </div>
                                <div class="info">
                                    <h3>{{itemson.artTitle}}</h3>
                                    <p class="price">
                                        <b>{{itemson.sell_price}}</b>元</p>
                                    <p>
                                        <strong>库存 {{itemson.stock_quantity}}</strong>
                                        <span>市场价：
                                            <s>{{itemson.market_price}}</s>
                                        </span>
                                    </p>
                                </div>
                            </router-link>
                        </li>                        
                    </ul>
                </div>
            </div>
        </div>
       
    </div>
</template>
<script>

// 引入moment模块
import moment from 'moment'
    export default {
        data:function () { 
            return {
                catelist:[],
                sliderlist:[],
                toplist:[],
                goodlist:[]
            }
         },
        
        beforeMount() {
            //顶部的数据
            this.axios.get('/site/goods/gettopdata/goods')
            .then((response)=>{
                // //(response);
                this.catelist=response.data.message.catelist;
                this.sliderlist=response.data.message.sliderlist;
                this.toplist=response.data.message.toplist;
            })
            .catch((error)=>{
                //(error);
            })


            // 底部商品详情数据
            this.axios.get('/site/goods/getgoodsgroup')
            .then(response=>{
                // //(response);
                this.goodlist=response.data.message
                // //(this.goodlist);
            })
            .catch(error=>{
                //(error);
            })
        },
        
    }
</script>
<style scoped>
  .el-carousel img{
      display: block;
      width: 100%;
      height: 100%;
  }
</style>
