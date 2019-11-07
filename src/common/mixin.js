import { debounce } from "common/until.js";
import BackTop from "components/content/backTop/BackTop"
import { BACKTOP_DISTANCE } from "common/const"

export const itemImgListenerMixin = {
  data: function() {
    return {
      itemImgListener: null,
    };
  },
  mounted: function() {
    const refresh = debounce(this.$refs.scroll.refresh, 500);
    let comp_name = this.$options.name;
    this.itemImgListener = function() {
      refresh();
    };
    this.$bus.$on("loadImage", this.itemImgListener);
    //this.$refs.scroll.refresh();
  }
};

export const BackTopMixin = {
  data: function() {
    return {
      showBackTop: false
    }
  },
  components: {
    BackTop,
  },
  methods:{
    // 是否显示 backtop 按钮
    showBackTopListener(position) {
      this.showBackTop = -position.y > BACKTOP_DISTANCE
    },
    backTop() {
      this.$refs.scroll.scrollTo(0,0,200)
    }
  },
}
