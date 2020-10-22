// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

//create data store
const store = Vue.observable({
  user: {
    fname: null,
    lname: null,
    jobGrade: null,
    department: null,
    set(fname, lname, jobGrade, department) {
      this.fname = fname
      this.lname = lname,
      this.jobGrade = jobGrade,
      this.department = department
    }
  }
})

//make data store global
Vue.prototype.$store = store

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
