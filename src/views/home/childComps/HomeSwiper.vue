<template>
  <div id="swiper">
    <swiper>
      <swiperItem v-for="item in banners">
        <a :href="item.link">
          <img :src="item.image" alt="" @load="loadSwiperImages" />
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
  data() {
    return {
      isLoadImages: false
    };
  },
  props: {
    banners: {
      type: Array,
      default: []
    }
  },
  components: {
    Swiper,
    SwiperItem
  },
  methods: {
    loadSwiperImages: function() {
      if (!this.isLoadImages) {
        this.$emit("loadSwiperImages");
        this.isLoadImages = true;
      }
    }
  }
};
</script>

<style scoped></style>
