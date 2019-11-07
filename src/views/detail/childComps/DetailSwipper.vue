<template lang="html">
  <swiper class="detail-swiper">
    <swiper-item v-for="item in topImages">
      <img :src="item" alt="" />
    </swiper-item>
  </swiper>
</template>

<script>

import { Swiper, SwiperItem } from "components/common/swiper";

export default {
  name: "DetailSwipper",
  props: {
    topImages: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },

  components: {
    Swiper,
    SwiperItem
  }
};
</script>

<style lang="css" scoped>
.detail-swiper{
  height: 400px;
  overflow: hidden;
}
</style>
