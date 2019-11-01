<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <scroll class="content" ref='scroll' :probe-type="3" @scroll="contentScroll">
      <home-swiper :banners="banners" />
      <recommend-view :recommends="recommends" />
      <feature-view />
      <tab-control :titles="['流行', '新款', '精选']" @tabClick="tabClick" />
      <goods-list :goods="goodsList" />
    </scroll>
    <back-top @click.native="backTop"  v-show="isShowBackTop"/>
</div>
</template>

<script>
// public components
import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/content/backTop/BackTop"

import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";

import {
  getHomeMultidata,
  getRecommendData,
  getHomeGoods
} from "network/home.js";

export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  data() {
    return {
      result: null,
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      currentType: "pop",
      isShowBackTop: false
    };
  },
  computed: {
    goodsList: function() {
      return this.goods[this.currentType].list;
    }
},
  created: function() {
    this.getHomeMultidata();
    //  this.getRecommendView();
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  methods: {
    //有关事件监听的方法
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
    },
    backTop() {
      this.$refs.scroll.scrollTo(0,0)
    },
    contentScroll(position) {
        this.isShowBackTop = -(position.y) > 1000;
    },

    //有关网络请求的方法
    getHomeMultidata() {
      getHomeMultidata().then(result => {
        this.banners = result.data.data.banner.list;
        this.recommends = result.data.data.recommend.list;
        //console.log(this.banners)
      });
    },

    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(result => {
        this.goods[type].list.push(...result.data.data.list);
        this.goods[type].page += 1;
      });
    }
  }
};
</script>

<style scoped>
#home{
  height: 100vh;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff0f5;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 4;
}

.tab-control {
  /* 只适配 移动端*/
  position: sticky;
  top: 44px;
  z-index: 3;
}

.content {
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;

}
/* .content {
  height: calc(100% - 93px);
  margin-top: 44px;
} */
</style>
