<template lang="html">
  <div class="goods">
    <goods-list-item v-for="item in goods" :goodsItem="item" />
  </div>
</template>

<script>
import GoodsListItem from "components/content/goods/GoodsListItem";

export default {
  name: "GoodsList",
  components: {
    GoodsListItem
  },
  props: {
    goods: {
      type: Array,
      default() {
        return [];
      }
    }
  },
};
</script>

<style lang="css" scoped>
.goods {
  display: flex;
  flex-flow: wrap;
  justify-content: space-around;
  padding: 2px;
}
</style>
