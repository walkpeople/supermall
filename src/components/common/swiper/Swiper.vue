<template>
  <div id="swiper-container">
    <div
      id="swiper-item"
      @touchstart="touchStart"
      @touchmove="touchMove"
      @touchend="touchEnd"
    >
      <slot> </slot>
    </div>
    <nav class="navigation">
      <slot name="navigation" v-if="slidesCount > 1 && showNavigation">
        <label
          v-for="(item, index) in slidesCount"
          class="bar"
          for=""
          :class="{ swiperActive: index === currentIndex - 1 }"
          v-bind:key="index"
        ></label>
      </slot>
    </nav>
  </div>
</template>

<script>
export default {
  name: "Swiper",
  props: {
    interval: {
      type: Number,
      default: 3000
    },
    showNavigation: {
      type: Boolean,
      default: true
    },
    moveRatio: {
      type: Number,
      default: 0.25
    },
    animDuration: {
      type: Number,
      default: 300
    }
  },
  data() {
    return {
      totalWidth: 0, //swiper-item 的宽度
      currentIndex: 0, //当前index
      swiperStyle: {}, //swiper的样式
      scrolling: false, //是否正在滚动动画
      slidesCount: 0 // 元素个数
    };
  },
  methods: {
    //开始计时器
    startTimer: function() {
      this.playTimer = window.setInterval(() => {
        this.currentIndex++;
        this.scrollContent(-this.totalWidth * this.currentIndex);
      }, this.interval);
    },

    //停止定时器
    stopTimer: function() {
      window.clearInterval(this.playTimer);
    },

    // 完成初始化的一些操作，
    handleDom: function() {
      let swiper_item = document.querySelector("#swiper-item");
      let swiper_item_slides = document.getElementsByClassName("swiper-img");
      this.slidesCount = swiper_item_slides.length;

      // 动态前后添加过渡元素
      if (this.slidesCount > 1) {
        let cloneFirst = swiper_item_slides[0].cloneNode(true);
        let cloneLast = swiper_item_slides[this.slidesCount - 1].cloneNode(
          true
        );
        swiper_item.insertBefore(cloneLast, swiper_item_slides[0]);
        swiper_item.appendChild(cloneFirst);
        this.totalWidth = swiper_item.offsetWidth;
        this.swiperStyle = swiper_item.style;
      }
    },

    //抽象出来的滚动方法
    scrollContent: function(position) {
      //scroll 开始
      this.scrolling = true;
      //滚动动画
      this.swiperStyle.transition = "transform " + this.animDuration + "ms";
      //校正位置
      this.checkPosition();
      //设置滚动
      this.setTransform(position);
      // sroll 结束
      this.scrolling = false;
    },
    checkPosition: function() {
      window.setTimeout(() => {
        this.swiperStyle.transition = "0ms";
        if (this.currentIndex >= this.slidesCount + 1) {
          this.currentIndex = 1;
          this.setTransform(-this.currentIndex * this.totalWidth);
        } else if (this.currentIndex <= 0) {
          this.currentIndex = this.slidesCount;
          this.setTransform(-this.currentIndex * this.totalWidth);
        }
      }, this.animDuration);
    },

    //移动的底层函数,做实际操作
    setTransform: function(position) {
      this.swiperStyle.transform = `translate3d(${position}px, 0, 0)`;
      this.swiperStyle[
        "-webkit-transform"
      ] = `translate3d(${position}px), 0, 0`;
      this.swiperStyle["-ms-transform"] = `translate3d(${position}px), 0, 0`;
    },

    //touchstart
    touchStart: function(event) {
      if (this.scrolling) return;
      this.stopTimer();
      this.startX = event.touches[0].pageX;
    },

    //touchmove
    touchMove: function(event) {
      this.currentX = event.touches[0].pageX;
      this.distance = this.currentX - this.startX;
      let currentPosition = -this.currentIndex * this.totalWidth;
      let moveDistance = currentPosition + this.distance;

      this.setTransform(moveDistance);
    },

    //touchend
    touchEnd: function(event) {
      let currentMove = Math.abs(this.distance);
      if (this.distance === 0) {
        return;
      }
      //
      else if (
        this.distance > 0 &&
        currentMove > this.totalWidth * this.moveRatio
      ) {
        this.currentIndex--;
      }
      //
      else if (
        this.distance < 0 &&
        currentMove > this.totalWidth * this.moveRatio
      ) {
        this.currentIndex++;
      }

      this.scrollContent(-this.currentIndex * this.totalWidth);
      this.startTimer();
    },

    // 预备左右箭头切换， 晢时不做实现
    // previous
    previousSlide: function() {},

    //next
    nextSlide: function() {},

    changeSlide: function(flag) {}
  },

  mounted() {
    window.setTimeout(() => {
      this.handleDom();
      this.startTimer();
    }, 500);
  }
};
</script>

<style scoped>
#swiper-container {
  overflow: hidden;
  position: relative;
}

#swiper-item {
  display: flex;
}

.navigation {
  position: absolute;
  bottom: 30px;
  display: flex;
  left: 50%;
  transform: translateX(-50%);
}

.bar {
  width: 50px;
  height: 10px;
  border: 2px solid #a4b0be;
  margin-right: 8px;
  cursor: pointer;
}
.swiperActive {
  background: #95a5a6;
}
</style>
