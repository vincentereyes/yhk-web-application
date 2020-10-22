<template>
    <div class="users">
      <ul class="breadcrumbs">
        <div class="container">
          <li><router-link :to="{ name: 'Index'}">Home</router-link></li>
          <li>Users</li>
        </div>
      </ul>
      <div class="container">
        <router-link :to="{ name: 'Signup' }"><span class="links">Add User</span></router-link>
      </div>
    </div>
</template>

<script>
export default {
    name: 'Users',
    props: ['userData'],
    data() {
        return {
            
        }
    },
    created() {
      if (this.$store.user.jobGrade != 'L9' && this.$store.user.jobGrade != 'L8') {
        this.$router.push({ name: 'Index' })
      }
    }
}
</script>

<style>

.users span{
  text-decoration: underline;
  font-size: 2em;
  display: block; 
  float: left; 
  clear: left; 

}
</style>