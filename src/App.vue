<template>
  <div id="app">
    <Navbar />
    <router-view/>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'

export default {
  name: 'App',
  components: {
    Navbar
  }
}
</script>

<style>
ul.breadcrumbs {
  padding: 10px 16px;
  list-style: none;
  background-color: #eee;
  margin-top: 0px;
}
ul.breadcrumbs li {
  display: inline;
  font-size: 18px;
}
ul.breadcrumbs li+li:before {
  padding: 8px;
  color: black;
  content: "/\00a0";
}
ul.breadcrumbs li a {
  color: #0275d8;
  text-decoration: none;
}
ul.breadcrumbs li a:hover {
  color: #01447e;
  text-decoration: underline;
}
</style>
