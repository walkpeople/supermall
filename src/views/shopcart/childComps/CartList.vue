<template lang="html">
  <div class="cart-list">
    <scroll class="cart-scroll" ref="scroll">
      <cart-list-item v-for="(item, index) in cartList" :key="index" :itemInfo="item">{{ item }}</cart-list-item>
    </scroll>
  </div>
</template>

<script>
// public components
import Scroll from "components/common/scroll/Scroll";
// child components
import CartListItem from "./CartListItem";
// vuex
import { mapGetters } from "vuex";

export default {
  name: "CartList",
  computed: {
    ...mapGetters(["cartList"])
  },
  components: {
    Scroll,
    CartListItem
  },
  activated() {
    this.$refs.scroll.refresh()
  }
};
</script>

<style lang="css" scoped>

.cart-list {
  height: 100vh;
  overflow: hidden;
}
.cart-scroll {
  /* 43 + 49  */
  height: calc(100% - 93px);
}
</style>
