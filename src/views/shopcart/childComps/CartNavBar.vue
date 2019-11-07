<template lang="html">
  <div class="navbar">
    <nav-bar>
      <div slot="center" class="center">购物车({{ cartLength }})</div>
    </nav-bar>
  </div>
</template>

<script>
// public components
import NavBar from "components/common/navbar/NavBar";

//about vuex
import { mapGetters } from "vuex";
export default {
  name: "CartNavBar",
  components: {
    NavBar
  },
  computed: {
    ...mapGetters(["cartLength"])
  }
};
</script>

<style lang="css" scoped>
.navbar {
  background-color: var(--color-tint);
  font-weight: 700;
  color: #fff;
}
</style>
