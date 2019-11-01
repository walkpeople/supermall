<template>
  <div class="swiper-img">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "SwiperItem"
};
</script>

<style scoped>
.swiper-img {
  width: 100%;
  flex-shrink: 0;
}
.swiper-img img {
  width: 100%;
}
</style>
