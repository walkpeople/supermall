<template>
  <div id="swiper">
    <swiper>
      <swiperItem v-for="item in banners">
        <a :href="item.link">
          <img :src="item.image" alt="">
        </a>
      </swiperItem>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper";
import { getHomeMultidata } from "network/home";
export default {
  name: "HomeSwiper",
  props: {
    banners: {
      type: Array,
      default: []
    }
  },
  components: {
    Swiper,
    SwiperItem
  }
};
</script>

<style scoped>
</style>
