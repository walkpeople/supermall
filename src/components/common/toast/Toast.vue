<template lang="html">
  <div class="toast" v-show="isShow">
    <p>{{ message }}</p>
  </div>
</template>

<script>
export default {
  name: 'Toast',
  data () {
    return {
      message: '',
      isShow: false,
    }
  },
  methods: {
    show: function (message, duration) {
      this.message = message || '默认操作';
      duration = duration || 2000;
      this.isShow = true;
      setTimeout( () => {
        this.isShow = false
      }, duration )
    }
  }
}
</script>

<style lang="css" scoped>
.toast {
  position: fixed;
  z-index: 5;
  background-color: rgba(52,73,94, 0.5);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.toast p {
  font-size: 20px;
  color: white;
}
</style>
