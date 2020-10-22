<template>
    <div class="finance">
      <ul class="breadcrumbs">
        <div class="container">
          <li><router-link :to="{ name: 'Index'}">Home</router-link></li>
          <li>Finance</li>
        </div>
      </ul>
      <div class="container">
        <router-link :to="{ name: 'SearchCollections', params: {userData: $store.user}}"><span class="links">Collections</span></router-link>
      </div>
    </div>
</template>

<script>
export default {
    name: 'Finance',
    data() {
        return {

        }
    },
    created() {
      
    }
}
</script>

<style>

.finance span{
  text-decoration: underline;
  font-size: 2em;

}
#router-link {
  display: inline-block;
}
</style>