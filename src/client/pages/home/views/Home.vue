<template>
  <div class="home">
    <img src="../../../assets/logo.jpg">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>

import HelloWorld from '../components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  }
}
</script>

<style lang="stylus" scoped>
.home img 
          width 200px
          height 200px
</style>
