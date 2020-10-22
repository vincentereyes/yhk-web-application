<template>
  <div class="index">
    <ul class="breadcrumbs">
      <div class="container">
        <li>Home</li>
      </div>
    </ul>
    <div class="container">
      <div class="links">
        <router-link :to="{ name: 'Finance', params: { userData: $store.user }}" v-if="$store.user.department == 'Finance' || $store.user.jobGrade == 'L9' || $store.user.jobGrade == 'L8' || $store.user.jobGrade == 'L7'"><span class="links">Finance</span></router-link>
        <router-link :to="{ name: 'Users', params: { userData: $store.user }}" v-if="$store.user.department == 'Admin' || $store.user.jobGrade == 'L9' || $store.user.jobGrade == 'L8' || $store.user.jobGrade == 'L7'"><span class="links">Users</span></router-link>
        <!-- <a href="" v-if="$store.user.department == 'Operations' || $store.user.jobGrade == 'L8' || $store.user.jobGrade == 'L7'"><span class="links">Operations</span></a>
        <a href="" v-if="$store.user.department == 'Admin' || $store.user.jobGrade == 'L8' || $store.user.jobGrade == 'L7'"><span class="links">Admin</span></a>
        <a href="" v-if="$store.user.department == 'Admin' || $store.user.jobGrade == 'L8' || $store.user.jobGrade == 'L7'"><span class="links">Tracking</span></a> -->
      </div>
    </div>
  </div>
</template>

<script>
// import firebase from 'firebase'
// import db from '@/firebase/init'
export default {
  name: 'Index',
  data () {
    return {
      // user: null,
      // userData: {
      //   fname: null,
      //   lname: null,
      //   jobGrade: null,
      //   department: null
      // },
      // render: null
    }
  },
  created() {

    // this.user = firebase.auth().currentUser

    // db.collection('users').doc(this.user.uid).get()
    // .then(doc => {
    //   let data = doc.data()
    //   this.userData.fname = data.fname
    //   this.userData.lname = data.lname
    //   this.userData.jobGrade = data.jobGrade
    //   this.userData.department = data.department
    //   this.render = true
    // })
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.index span{
  text-decoration: underline;
  font-size: 2em;
  display: block; 
  float: left; 
  clear: left; 

}
</style>
