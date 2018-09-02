<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/goods.html">购物商城</a> &gt;
                <a href="/goods/42/1.html">商品详情</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <div class="left-925">
                        <div class="goods-box clearfix">
                            <div class="pic-box">
                                <ProductZoomer v-if="this.imglist.length!=0" :baseImages="images" :base-zoomer-options="zoomerOptions">
                                    
                                </ProductZoomer>
                                <!-- <img-zoom src="https://www.baidu.com/link?url=-s1rX3hrkI196sz8-O--&w" width="450" height="250" bigsrc="img-big.jpg" :configs="configs"></img-zoom> -->
                            </div>
                            <div class="goods-spec">
                                <h1>{{goodsinfo.title}}</h1>
                                <p class="subtitle">{{goodsinfo.sub_title}}</p>
                                <div class="spec-box">
                                    <dl>
                                        <dt>货号</dt>
                                        <dd id="commodityGoodsNo">{{goodsinfo.goods_no}}</dd>
                                    </dl>
                                    <dl>
                                        <dt>市场价</dt>
                                        <dd>
                                            <s id="commodityMarketPrice">¥{{goodsinfo.market_price}}</s>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>销售价</dt>
                                        <dd>
                                            <em id="commoditySellPrice" class="price">¥{{goodsinfo.sell_price}}</em>
                                        </dd>
                                    </dl>
                                </div>
                                <div class="spec-box">
                                    <dl>
                                        <dt>购买数量</dt>
                                        <dd>
                                            <div class="stock-box">
                                                <div class="el-input-number el-input-number--small">
                                                    <span @click="buyNum==1?1:buyNum--" role="button" class="el-input-number__decrease" :class="{'is-disabled':buyNum==1}">
                                                        <i class="el-icon-minus"></i>
                                                    </span>
                                                    <span @click="addGoodsList" role="button" :class="{'is-disabled':buyNum==goodsinfo.stock_quantity}" class="el-input-number__increase">
                                                                                                                                                                        
                                                        <i class="el-icon-plus"></i>
                                                    </span>
                                                    <div class="el-input el-input--small">
                                                        <!---->
                                                        <input autocomplete="off" v-model="buyNum" size="small" type="text" rows="2" max="60" min="1" validateevent="true" class="el-input__inner" role="spinbutton" aria-valuemax="60" aria-valuemin="1" aria-valuenow="1" aria-disabled="false">
                                                        <!---->
                                                        <!---->
                                                        <!---->
                                                    </div>
                                                </div>
                                            </div>
                                            <span class="stock-txt">
                                                库存
                                                <em id="commodityStockNum">{{goodsinfo.stock_quantity}}</em>件
                                            </span>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dd>
                                            <div id="buyButton" class="btn-buy">
                                                <button onclick="cartAdd(this,'/',1,'/shopping.html');" class="buy">立即购买</button>
                                                <button @click="cartAdd" class="add">加入购物车</button>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div id="goodsTabs" class="goods-tab bg-wrap">
                            <Affix>
                            <div id="tabHead" class="tab-head" style="position: static; top: 517px; width: 925px;">
                                <ul>
                                    <li>
                                        <a href="javascript:;" @click="isShowdecs=true" :class="{selected:isShowdecs}">商品介绍</a>
                                    </li>
                                    <li>
                                        <a href="javascript:;" @click="isShowdecs=false" :class="{selected:!isShowdecs}">商品评论</a>
                                    </li>
                                </ul>
                            </div>
                            </Affix>
                            <div v-html="goodsinfo.content" class="tab-content entry" :style="{display: isShowdecs?'block':'none'}">
                                
                            </div>
                            <div class="tab-content" :style="{display:!isShowdecs?'block':'none'}">
                                <div class="comment-box">
                                    <div id="commentForm" name="commentForm" class="form-box">
                                        <div class="avatar-box">
                                            <i class="iconfont icon-user-full"></i>
                                        </div>
                                        <div class="conn-box">
                                            <div class="editor">
                                                <textarea v-model.trim="commentContent" id="txtContent" name="txtContent" sucmsg=" " datatype="*10-1000" nullmsg="请填写评论内容！"></textarea>
                                                <span class="Validform_checktip"></span>
                                            </div>
                                            <div class="subcon">
                                                <input @click='submitComment' id="btnSubmit" name="submit" type="submit" value="提交评论" class="submit">
                                                <span class="Validform_checktip"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <ul id="commentList" class="list-box">
                                        <p v-if="comentList.length==0" style="margin: 5px 0px 15px 69px; line-height: 42px; text-align: center; border: 1px solid rgb(247, 247, 247);">暂无评论，快来抢沙发吧！</p>
                                        <li v-for="(item, index) in comentList" :key="item.id">
                                            <div class="avatar-box">
                                                <i class="iconfont icon-user-full"></i>
                                            </div>
                                            <div class="inner-box">
                                                <div class="info">
                                                    <span>{{item.user_name}}</span>
                                                    <span>{{item.add_time | cutTimeHh}}</span>
                                                </div>
                                                <p>{{item.content}}</p>
                                            </div>
                                        </li>
                                      
                                    </ul>
                                    <div class="page-box" style="margin: 5px 0px 0px 62px;">
                                        <div id="pagination" class="digg">
                                             <Page
                                              :total="totalcount"
                                              :page-size="pageSize"
                                              placement='top'
                                              :page-size-opts="[5,10,15,20]"
                                              show-elevator 
                                              show-sizer
                                              @on-change="pageChange($event)"
                                              @on-page-size-change="pageSizeChange($event)"
                                               />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="left-220">
                        <div class="bg-wrap nobg">
                            <div class="sidebar-box">
                                <h4>推荐商品</h4>
                                <ul class="side-img-list">
                                    <li v-for="(item, index) in hotgoodslist" :key="item.id">
                                        <div class="img-box">
                                            <router-link :to="/goodsInfo/+item.id">
                                                <img :src="item.img_url">
                                            </router-link>
                                        </div>
                                        <div class="txt-box">
                                            <router-link :to="/goodsInfo/+item.id">{{item.title}}</router-link>
                                            <span>{{item.add_time | cutTime}}</span>
                                        </div>
                                    </li>

                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <BackTop></BackTop>
        <!-- 添加购物车动画效果 -->
        <img class='moveImg' :src="imglist[0].original_path" style="display:none" v-if="imglist!=0" alt="">
    </div>
</template>
<script>
    //引入放大镜
// import imgZoom from 'vue2.0-zoom'
import $ from 'jquery'

    export default {
        name: 'goodsInfo',
        data: function () {
            return {
                goodsinfo: {},
                hotgoodslist: [],
                imglist: [],
                buyNum:1,
                isShowdecs:false,
                images:{
                    normal_size:[]
                },
                zoomerOptions: {
                    zoomFactor: 2,
                    pane: "container-round",
                    hoverDelay: 300,
                    namespace: "inline-zoomer",
                    move_by_click: true,
                    scroll_items: 5,
                    choosed_thumb_border_color: "#bbdefb"
                },
                //页码
                pageIndex:1,
                //页容量
                pageSize:5,
                //评论列表
                comentList:[],
                //总条数
                totalcount:0,
                //输入的评论内容
                commentContent:''

            };
        },
        methods: {
            getRenderer() {
                // 强制初始化
                this.imglist = [];
                // 清空预览图片的数组
                this.images.normal_size = [];
                this.axios.get(`site/goods/getgoodsinfo/${this.$route.params.id}`)
                    .then(response => {
                        // //(response);
                        this.goodsinfo = response.data.message.goodsinfo
                        // //(this.goodsinfo);
                        this.hotgoodslist = response.data.message.hotgoodslist
                        // //(this.hotgoodslist);
                        this.imglist = response.data.message.imglist
                        // //(this.imglist);
                        this.imglist.forEach((v,i) => {
                            this.images.normal_size.push({
                                id:v.id,
                                url:v.original_path
                            })
                        });

                    })
                    .catch(error => {
                        //(error);
                    })
            },
            addGoodsList(){
                if (this.buyNum>this.goodsinfo.stock_quantity) {
                    alert('晏洁琼要多少买多少')
                }
              return  this.buyNum<this.goodsinfo.stock_quantity?this.buyNum++:this.stock_quantity
            },
            getComment(){
                this.axios.get(`site/comment/getbypage/goods/${this.$route.params.id}?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}`)
                .then(response=>{
                    // console.log(response);
                    this.comentList=response.data.message
                    this.totalcount=response.data.totalcount
                }).catch(error=>{
                    console.log(error);
                })
            },
            //切换每页条数时
            pageSizeChange(size){
                // console.log('页容量改变');
                this.pageSize=size
                this.getComment()
            },
            //页码改变时
            pageChange(page){
                // console.log('页码改变');
                // console.log(page);
                this.pageIndex=page
                this.getComment()
            },
            // 提交评论
            submitComment(){
                if (this.commentContent=='') {
                    this.$Message.error('对方不想和你说话,并且向你抛出一个刘梓晨');
                    return
                }
                this.axios.post(`site/validate/comment/post/goods/${this.$route.params.id}`,{
                    commenttxt:this.commentContent
                }).then(response=>{
                    // console.log(response);
                    if (response.statusText=='OK') {
                        this.$Message.success('发表成功');
                        this.pageIndex=1
                        this.getComment()
                    }
                }).catch(error=>{
                    console.log(error);
                })
                // 清空input输入的评论
                this.commentContent=''
            },
            cartAdd(){
                //加入购物车按钮的位置
                var offset = $('#buyButton .add').offset();
                // console.log(offset);
                //顶部购物车的位置
                let cartOffset =$('.icon-cart').offset();
                // console.log(cartOffset);
                $('.moveImg').show().addClass('move').css(offset).animate(cartOffset,1000,()=>{
                    $('.moveImg').removeClass('move').hide()
                })
<<<<<<< HEAD
                // console.log(this.$route.params.id);
                this.$store.commit('buyGood',{
                    goodId:this.$route.params.id,
                    goodNum:this.buyNum
                })
=======
                this.$store.commit('increment',this.buyNum)
>>>>>>> eca70421061582515b5ca747e096e2d03d32ed0f
                
            }
        },
        created() {
            this.getRenderer()
            this.getComment()
        },
        watch: {
            $route(to, from) {
                this.getRenderer()
                this.getComment()
            },
           
        }

    }
</script>
<style>
.inline-zoomer-zoomer-box {
  width: 368px;
}
.pic-box .control-box .thumb-list {
  display: flex;
}
.thumb-list img {
  height: 78px;
  width: 78px;
  margin: 5px;
}
.control-box{
    width: 30px;
}
.control{
    width: 20px;
  text-align: center;
}
.moveImg{
    width: 40px;
    position: absolute;
    top: 0;
    right: 50px;
}
.moveImg.move{
    transform: scale(.5,.5) rotateZ(7200deg);
    opacity: .6;
    transition: transform 1s,opacity 1s;
}
</style>