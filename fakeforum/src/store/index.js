import Vue from "vue";
import Vuex from "vuex";
import home from "@/views/home/store";
import pergunta from "@/views/pergunta/store";
import user from "@/views/user/store";
import admin from "@/views/admin/store";
import { storageName } from "@/global.js";
Vue.use(Vuex);

export default new Vuex.Store({
  state: { loggedUser: null },

  mutations: {
    carregarUser(state, payload) {
      state.loggedUser = payload;
    },
  },
  actions: {
    async login({ commit }, body) {
      const data = await this._vm.$http.post("signin", body);
      commit("carregarUser", data.data);
      localStorage.setItem(storageName, JSON.stringify(data.data));
    },
    async create({ commit }, body) {
      await this._vm.$http.post("signup", body);
      commit("carregarUser", null);
    },
  },
  modules: { home, pergunta, user, admin },
});
