<template>
  <div class="menu">
    <span @click="back"><i class="el-icon-back"></i> 返回</span>
  </div>
</template>

<script>
export default {
  methods: {
    back () {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
  .menu {
    height: 2rem;
    line-height: 2rem;
    background: #409EFF;
    color: white;
  }
  .menu span{
    cursor: pointer;
    display: inline-block;
    width: 100%;
    height: 100%;
  }
</style>
