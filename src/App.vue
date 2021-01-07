<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <YakShop />
  </div>
</template>

<script>
import YakShop from './components/YakShop.vue'

export default {
  name: 'App',
  components: {
    YakShop
  }
}
</script>

<style>
body {
  background-image: url('./assets/yaks.png');
  background-position: center;
  background-repeat: no-repeat;
  background-size: auto;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 60px;
}
</style>
