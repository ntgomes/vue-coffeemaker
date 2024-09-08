// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import App from './App';
import router from './router';

Vue.use(BootstrapVue); // Allow Vue files to use BV tags and components
Vue.config.productionTip = false; // Disable production-related messages

// Instantiate Vue by linking it to the id of the div entrypoint in index.html
/* eslint-disable no-new */
new Vue({
  el: '#app', // Let Vue verify the div entrypoint by wait of id
  router, // Set up link paths and authentication service
  template: '<App/>',
  components: { App } // The primary component (webpage content) to generate is from App.vue
});
