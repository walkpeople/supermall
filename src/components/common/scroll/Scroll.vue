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
      probeType: this.probeType
    });
    this.scroll.on('scroll', position => {
      this.$emit('scroll', position)
    });
  },
  methods: {
    scrollTo: function (x, y, time) {
      let t = time;
      if (typeof(time) === 'undefined') {
        t = 300;
      }
      this.scroll.scrollTo(x, y, t)
    }
  }
};
</script>

<style lang="css" scoped>
</style>
