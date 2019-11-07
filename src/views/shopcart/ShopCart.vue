<template>
  <div>
    <cart-nav-bar class="nav-bar"></cart-nav-bar>
    <cart-list></cart-list>
    <bottom-bar></bottom-bar>
  </div>
</template>

<script>
// child components
import CartNavBar from "./childComps/CartNavBar";
import CartList from './childComps/CartList';
import BottomBar from './childComps/BottomBar'

export default {
  name: "ShopCart",
  components: {
    CartNavBar,
    CartList,
    BottomBar,
  },
};
</script>

<style scoped>
</style>
