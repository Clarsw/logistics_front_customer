<template>
  <div class="menu">
    <img src="../../assets/noInfo.png" alt="noInfo">
    <p>暂无运单信息，请稍后再试~</p>
    <el-button type="primary" @click="gotoIndex">换个单号试试</el-button>
  </div>
</template>

<script>
export default {
  name: 'NotFound',
  methods: {
    gotoIndex () {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
.menu {
  position: relative;
  top: 4rem;
  text-align: center;
}
</style>
