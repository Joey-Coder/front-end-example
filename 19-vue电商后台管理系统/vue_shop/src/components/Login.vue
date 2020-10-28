<template>
  <div class="login_container">
    <div class="login_box"></div>
  </div>
</template>

<script>
export default {
  name: 'Login'
}
</script>

<style lang="less" scoped>
.login_container {
  background-color: skyblue;
  height: 100%;
}

.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  }
</style>
