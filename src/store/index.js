import Vue from "vue";
import Vuex from "vuex";

import mutation from "./mutation";
import action from "./action";
import getter from './getter';

// 安装插件
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cartList: []
  },
  mutations: mutation,
  actions: action,
  getters: getter,
  modules: {}
});
