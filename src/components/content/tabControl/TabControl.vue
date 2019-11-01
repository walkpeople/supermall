<template>
  <div class="tab-control">
    <div
      class="tab-control-item"
      v-for="(item, index) in titles"
      :class="{ active: index === currentIndex }"
			@click="itemClick(index)"
    >
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  props: {
    titles: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      currentIndex: 0
    };
  },
	methods: {
		itemClick(index) {
			this.currentIndex =  index;
      this.$emit("tabClick", index)
      // v-on 监听 @tabClick  { switch(index)}
      // methods 进行
      // currentType: 'type'
      // 计算属性
		}
	}
};
</script>

<style>
.tab-control {
  height: 40px;
  display: flex;
	background: #ecf0f1;
  text-align: center;
  font-size: 15px;
  line-height: 40px;
}

.tab-control-item {
  flex: 1;
}

.active {
  color: var(--color-high-text);
}

.active span {
	padding: 5px;
	border-bottom: 3px solid var(--color-tint);

}
</style>
