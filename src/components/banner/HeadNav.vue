<template>
  <div class="head-nav-container">
    <div class="banner">  <Banner></Banner></div>
    <div class="head-nav">
      <template>
        <el-menu
          :default-active="this.$route.path"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
          background-color="#f0f0f2"
          text-color="#000000"
          active-text-color="#409EFF">
          <el-menu-item index="1"><router-link to="/home" tag="span">首页</router-link></el-menu-item>
          <el-menu-item index="2"><router-link to="/order_create" tag="span">在线寄件</router-link></el-menu-item>
          <el-menu-item index="3"><router-link to="/fare" tag="span">运费时效</router-link></el-menu-item>
          <el-menu-item index="4"><router-link to="/qq" tag="span">附近网点</router-link></el-menu-item>
          <el-menu-item index="5"><router-link to="/self" tag="span">个人中心</router-link></el-menu-item>
        </el-menu>
      </template>
    </div>
  </div>
</template>

<script>
import Banner from '@/components/banner/Banner'
export default {
  name: 'HeadNav',
  components: {Banner},
  data () {
    return {
      activeIndex: '1',
      activeIndex2: '1'
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style scoped>
.head-nav{
  position: fixed;
  top: 0px;
  width: 600px;
  left: 200px;
  z-index: 1000;
}
  .banner{
    position: fixed;
    top:0px;
    left: 0px;
    width: 100%;
    height: 60px;
    background-color: rgb(240, 240, 242);
    border-bottom: 1px solid #e6e6e6;
    z-index: 1000;
  }
  .banner .offline{
    top:20px !important;
  }
  .container-header .logo{
  top:15px !important;
  }
  .el-menu-item{
    padding: 0;
    margin:0 10px;
  }
  .el-menu-item span{
    padding: 20px 20px;
  }
.is-active{
    color: #409EFF;
   border-bottom:  2px solid #409EFF;
  }
</style>
