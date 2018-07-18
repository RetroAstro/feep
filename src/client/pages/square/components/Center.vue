<template>
  <div class="hello">
    <h1>
      Hello {{ guest }} , this a square center.
    </h1>
  </div>
</template>

<script>
export default {
  name: 'Center',
  props: {
    guest: String
  }
}
</script>

<style scoped lang="stylus">
.hello {
  h1 {
    color black
    font-size 15px
  }
}
</style>
