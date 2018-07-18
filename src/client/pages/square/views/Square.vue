<template>
  <div class="home">
    <img src="../assets/scene.jpg">
    <Center guest="RetroAstro"/>
  </div>
</template>

<script>

import Center from '../components/Center.vue'

export default {
  name: 'square',
  components: {
    Center
  }
}
</script>

<style lang="stylus" scoped>
.home {
  img {
    width 200px
    height 200px
  }
}
</style>
