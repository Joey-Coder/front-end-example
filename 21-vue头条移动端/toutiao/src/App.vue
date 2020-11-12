<template>
  <div id="app">
    <h3>Vue 头条</h3>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      value: 50
    }
  }
}
</script>

<style lang="less"></style>
