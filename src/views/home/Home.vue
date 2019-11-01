<template>
  <div>
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <home-swiper :banners="banners" />
    <recommend-view :recommends="recommends" />
    <feature-view />
    <tab-control :titles="['流行', '新款', '精选']" @tabClick="tabClick" />
    <goods-list :goods="goodsList" />
  </div>
</template>

<script>
// public components
import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";

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
    GoodsList
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
      currentType: "pop"
    };
  },
  computed: {
    goodsList: function() {
      return this.goods[this.currentType].list;
    }
  },
  created: function() {
    this.getHomeMultidata();
    this.getRecommendView();
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

    //有关网络请求的方法
    getHomeMultidata() {
      getHomeMultidata().then(result => {
        this.banners = result.data.list.swiper;
      });
    },
    getRecommendView() {
      getRecommendData().then(result => {
        this.recommends = result.data.list.recommend;
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

<style>
.home-nav {
  background-color: var(--color-tint);
  color: #fff0f5;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 4;
}
#tab-bar {
  z-index: 3;
}

.tab-control {
  /* 只适配 移动端*/
  position: sticky;
  top: 44px;
  z-index: 3;
}
</style>
