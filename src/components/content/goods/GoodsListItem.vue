<template lang="html">
  <div class="goods-item" @click="itemClick">
    <img :src="showImage" alt="" @load="loadImage" />
    <div class="goods-info">
      <p>{{ goodsItem.title }}</p>
      <span class="price"> {{ goodsItem.price }}</span>
      <span class="collect">{{ goodsItem.cfav }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsListItem",
  props: {
    goodsItem: {
      type: Object,
      default: {}
    }
  },
  methods: {
    loadImage() {
      //发送给总线
      this.$bus.$emit("loadImage");
    },
    itemClick() {
      this.$router.push("/detail/"+this.goodsItem.iid);
    }
  },
  computed: {
    showImage: function () {
      return this.goodsItem.image || this.goodsItem.show.img
    }
  }
};
</script>

<style lang="css" scoped>
.goods-item {
  width: 48%;
  position: relative;
  padding-bottom: 40px;
}
.goods-item img{
  width: 100%;
  border-radius: 5px;
}

.goods-info {
  font-size: 12px;
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  overflow: hidden;
  text-align: center;
}

.goods-info p {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  margin-bottom: 3px;
}

.goods-info .price {
  color: var(--color-high-text);
  margin-right: 20px;
}

.goods-info .collect {
  position: relative;
}

.goods-info .collect::before {
  content: '';
  position: absolute;
  left: -15px;
  top: -1px;
  width: 14px;
  height: 14px;
  background: url("~assets/img/common/collect.svg") 0 0/14px 14px ;
}
</style>
