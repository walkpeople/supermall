<template lang="html">
  <!-- ref  -->
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  name: "Scroll",
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      scroll: null
    };
  },
  mounted: function() {
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad,
    });
    if (this.probeType === 2 || this.probeType === 3) {
      this.scroll.on("scroll", position => {
        this.$emit("scroll", position);
      });
    }

    if (this.pullUpLoad) {
      this.scroll.on("pullingUp", () => {
        this.$emit("loadMoreImages");
      });
    }
    // scroll 将实时的位置发送出去
    this.scroll.on('scroll', position => {
      // {x: 0, y: 0} 格式
      this.$emit('scroll', position)
    } )
  },
  methods: {
    scrollTo: function(x, y, time=300) {
      this.scroll && this.scroll.scrollTo(x, y, time);
    },
    finishPullUp: function() {
      this.scroll && this.scroll.finishPullUp();
    },
    refresh: function() {
      this.scroll && this.scroll.refresh();
    },
    getScrollY: function() {
      return this.scroll? this.scroll.y: 0;
    }
  }
};
</script>

<style lang="css" scoped></style>
