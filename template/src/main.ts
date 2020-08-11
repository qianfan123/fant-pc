import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Fant from 'fant-ui';
import 'fant-ui/packages/theme-chalk/src/index.scss';
import VueKindEditor from 'vue-kindeditor';
import 'kindeditor/kindeditor-all-min.js';
import 'kindeditor/themes/default/default.css';
process.env.NODE_ENV === 'development' && require('./mock/mock');
Vue.use(Fant);
Vue.use(VueKindEditor);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
