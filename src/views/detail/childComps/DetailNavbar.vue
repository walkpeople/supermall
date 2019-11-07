<template lang="html">
  <div class="navbar">
    <nav-bar>
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="title">
        <div
          v-for="(item, index) in titles"
          :class="{ active: index === currentIndex }"
          @click="titleClick(index)"
        >
          {{ item }}
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
export default {
  name: "DetailNavbar",
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0
    };
  },
  components: {
    NavBar
  },
  methods: {
    titleClick: function (index) {
      this.currentIndex = index;
      this.$emit('titleClick', index)
    },
    backClick: function () {
      this.$router.go(-1)
    }

  }
};
</script>

<style lang="css" scoped>
.title {
  display: flex;
  justify-content: space-around;
}

.active {
  color: var(--color-high-text)
}

.back {
  margin-top: 7px;
}
</style >
