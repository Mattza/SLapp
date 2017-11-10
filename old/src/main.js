// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import SearchForm from './components/SearchForm'
import SearchResult from './components/SearchResult'
import Deviations from './components/Deviations'
import MyTrips from './components/MyTrips'
import About from './components/About'
import AllPages from './components/AllPages'

const router = new VueRouter({
  routes: [
    { path: '/resultat', component: SearchResult },
    { path: '/storningar', component: Deviations },
    { path: '/mina-resor', component: MyTrips },
    { path: '/om', component: About },
    { path: '/all', component: AllPages },
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
