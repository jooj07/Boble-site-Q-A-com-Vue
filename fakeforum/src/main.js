import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import loading from "./components/loading.vue"
import aviso from "./components/aviso.vue"
import "roboto-fontface/css/roboto/roboto-fontface.css";
import "@mdi/font/css/materialdesignicons.css";

import './plugins/axios'

Vue.config.productionTip = false;
Vue.component('loading', loading)
Vue.component('aviso', aviso)
new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
