<template>
  <div class="recommends">
    <div class="recommend-item" v-for="item in recommends">
      <a href="">
        <img :src="item.image" alt="" />
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "RecommendView",
  props: {
    recommends: {
      type: Array,
      default: []
    }
  }
};
</script>

<style scoped>
.recommends {
  width: 100%;
  display: flex;
  justify-content: space-between;
  border-bottom: solid 8px #eee;
}

.recommend-item {
  text-align: center;
  font-size: 12px;
  margin: 2px 12px;
  padding: 5px 0 10px;
}
.recommends img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
}
</style>
