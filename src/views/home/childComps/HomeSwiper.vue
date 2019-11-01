<template>
  <div id="swiper">
    <swiper>
      <swiperItem v-for="link in banners">
        <img :src="link" alt="" />
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

<style>
#swiper{
	padding-top: 44px;
}
</style>
