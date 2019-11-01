<template>
  <div @click="pathClick" class="tab-bar-item">
    <div v-if="!isActive">
      <slot name="item-img"></slot>
    </div>
    <div v-else>
      <slot name="item-img-active"></slot>
    </div>
    <div :style="isActiveCoclor">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  props: {
    path: String,
    activeColor: {
      type: String,
      default: "red"
    }
  },
  computed: {
    isActive() {
      return this.$route.path.indexOf(this.path) != -1;
    },
    isActiveCoclor() {
      return this.isActive ? { color: this.activeColor } : {};
    }
  },
  data() {
    return {};
  },
  methods: {
    pathClick() {
      if (this.$route.path != this.path) {
        this.$router.replace(this.path);
      }
    }
  }
};
</script>

<style scoped>
.tab-bar-item {
  flex: 1;
  text-align: center;
  height: 49px;
  font-size: 14px;
}

.tab-bar-item img {
  margin-top: 3px;
  margin-bottom: 2px;
  vertical-align: middle;
  width: 24px;
  height: 24px;
}
.active {
  color: red;
}
</style>
