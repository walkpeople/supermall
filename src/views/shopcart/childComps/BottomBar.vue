<template lang="html">
  <div id="bottom-bar">
    <check-button
      class="select-all"
      v-model="isSelectAll"
      @checkBtnClick="checkAllClick"
    ></check-button>
    <span>全选</span>
    <span id="select-price">合计: ￥{{ totalPrice }}</span>
    <span id="select-go" @click="checkOut">去计算 ({{ checkCount }})</span>
  </div>
</template>

<script>
import CheckButton from "./CheckButton";
export default {
  name: "BottomBar",
  components: {
    CheckButton
  },
  computed: {
    totalPrice: function() {
      const cartList = this.$store.getters.cartList;
      return cartList
        .filter(item => item.checked)
        .reduce((prevSum, item) => {
          return prevSum + item.count * item.newPrice;
        }, 0)
        .toFixed(2);
    },
    isSelectAll: function() {
      return (
        this.$store.getters.cartList.find(item => item.checked === false) ===
        undefined
      );
    },
    checkCount: function() {
      return this.$store.getters.cartList.filter(item => item.checked === true).length;
    }
  },
  methods: {
    checkAllClick: function () {
      let cartList = this.$store.getters.cartList;
      if  (this.isSelectAll) {
        cartList.forEach(item => item.checked = false)
      }else {
        cartList.forEach(item => item.checked = true)
      }
    },
    checkOut: function() {
      this.$toast.show('>_< 老板带着小姨子跑了 >_<')
    }
  }
};
</script>

<style lang="css" scoped>
#bottom-bar {
  box-sizing: border-box;
  width: 100%;
  height: 50px;
  /* 使元素居中  */
  line-height: 50px;
  position: fixed;
  bottom: 50px;
  background: #eee;
  font-size: 14px;
  display: flex;
  flex-wrap: nowrap;
}
.select-all {
  line-height: 0;
  /* 25-9 居中 */
  margin: 16px 16px 0;
}

#select-price {
  flex: 1;
  text-align: center;
  font-size: 14px;
}

#select-go {
  align-self: flex-end;
  text-align: center;
  width: 100px;
  background: #f1c40f;
}
</style>
