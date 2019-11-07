<template lang="html">
  <div id="detail">
    <detail-navbar
      ref="nav"
      class="detail-navbar"
      :current-index="currentIndex"
      @titleClick="titleClick"
    />
    <scroll
      class="detail-scroll"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
    >
      <detail-swipper :topImages="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info
        :detail-info="detailInfo"
        @imageLoad="goodsImageLoad"
      />
      <detail-param-info ref="params" :param-info="paramInfo" />
      <detail-comment-info ref="comments" :commentInfo="commentInfo" />
      <!-- recommends -->
      <goods-list ref="recommends" :goods="recommendInfo" />
    </scroll>
    <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
    <backTop v-show="showBackTop" @click.native="backTop"></backTop>
  </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll";
import GoodsList from "components/content/goods/GoodsList";
import { itemImgListenerMixin, BackTopMixin } from "common/mixin.js";

import DetailNavbar from "./childComps/DetailNavbar";
import DetailSwipper from "./childComps/DetailSwipper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import DetailBottomBar from "./childComps/DetailBottomBar";

import {
  getDetailData,
  getRecommend,
  Goods,
  Shop,
  GoodsParam
} from "network/detail";

export default {
  name: "Detail",
  components: {
    DetailNavbar,
    DetailSwipper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,

    Scroll,
    GoodsList
  },

  //define data
  data() {
    return {
      iid: "",
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommendInfo: [],
      titleTopYs: [],
      currentIndex: 0,
    };
  },
  created: function() {
    this.iid = this.$route.params.iid;
    this.getDetailData(this.iid);
    this.getRecommend();
  },
  mounted: function() {},
  destroyed: function() {
    this.$bus.$off("loadImage", this.itemImgListener);
  },
  mixins: [itemImgListenerMixin, BackTopMixin],
  methods: {
    getDetailData: function(iid) {
      getDetailData(iid).then(result => {
        const data = result.data.result;
        //顶部轮播图
        this.topImages = data.itemInfo.topImages;
        //商品信息
        this.goods = new Goods(
          data.itemInfo,
          data.columns,
          data.shopInfo.services
        );
        //店铺信息
        this.shop = new Shop(data.shopInfo);
        //商品详情
        this.detailInfo = data.detailInfo;
        //商品参数
        this.paramInfo = new GoodsParam(
          data.itemParams.info,
          data.itemParams.rule
        );
        //商品评论
        if (data.rate.list) this.commentInfo = data.rate.list[0];
      });
    },
    //推荐数据
    getRecommend: function() {
      getRecommend().then(result => {
        this.recommendInfo = result.data.data.list;
      });
    },
    // 图片加载完成 进行重新计算scroll
    goodsImageLoad: function() {
      this.$refs.scroll.refresh();
      this.titleTopYs.push(0);
      this.titleTopYs.push(this.$refs.params.$el.offsetTop);
      this.titleTopYs.push(this.$refs.comments.$el.offsetTop);
      this.titleTopYs.push(this.$refs.recommends.$el.offsetTop);
    },

    // navbar 的index 点击
    titleClick: function(index) {
      this.$refs.scroll.scrollTo(0, -this.titleTopYs[index], 200);
    },

    contentScroll: function(position) {
      let length = this.titleTopYs.length;
      for (let i = 0; i < length; i++) {
        let iPos = this.titleTopYs[i];
        let nextPos =
          i != length - 1 ? this.titleTopYs[i + 1] : Number.MAX_VALUE;
        let posY = -position.y;
        if (posY >= iPos && posY < nextPos) {
          if (this.$refs.nav.currentIndex !== i) {
            this.$refs.nav.currentIndex = i;
          }
        }
      }
      this.showBackTopListener(position);
    },
    //加入购物车
    addToCart: function() {
      // 一.组装购物车所需数据
      // 创建对象
      const obj = {};
      // 2.对象信息
      obj.iid = this.iid;
      obj.imgURL = this.topImages[0];
      obj.title = this.goods.title;
      obj.desc = this.goods.desc;
      obj.newPrice = this.goods.realPrice;
      obj.checked = false;

      // 添加到购物车， 同时添加成功后进行回调
      this.$store.dispatch('addCart', obj).then( message => {
        this.$toast.show(message)
      } )

    }
    // methods over
  }
};
</script>

<style lang="css" scoped>
#detail {
  position: relative;
  z-index: 5;
  height: 100vh;
  background: #ecf0f1;
}

.detail-navbar {
  position: relative;
  background: #ecf0f1;
  z-index: 4;
}

.detail-scroll {
  height: calc(100% - 102px);
}
</style>
