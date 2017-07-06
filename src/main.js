// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

/* global localStorage */

import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import SearchForm from './components/SearchForm'
import SearchResult from './components/SearchResult'

let currentlocalStorageVersion = '0.1';
let storedVersion = localStorage.getItem('localStorageVersion');
if (currentlocalStorageVersion !== storedVersion) {
  localStorage.clear();
  localStorage.setItem('localStorageVersion', currentlocalStorageVersion);
}

const router = new VueRouter({
  routes: [
    { path: '/search', component: SearchForm },
    { path: '/search-result', component: SearchResult },
    { path: '/', component: SearchForm }
  ]
})
Vue.use(VueRouter)
Vue.prototype.$routz = router;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

