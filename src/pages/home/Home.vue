<template>
  <div class="container">
      <div class="banner">
        <template>
          <banner></banner>
        </template>
      </div>
    <div class="block">
      <el-carousel trigger="click" height="430px">
        <el-carousel-item v-for="item in imgArr" :key="item.url">
          <img :src="item.url" style="max-width: 100%;height: auto;display: inline-block;">
        </el-carousel-item>
      </el-carousel>
      <el-input
        v-model="inputValue"
        placeholder="请输入订单号"
        @keyup.enter.native="handleIconClick"
      >
        <i
          class="el-icon-search el-input__icon"
          slot="suffix"
          @click="handleIconClick">
        </i>
        <template slot-scope="{ item }">
          <div class="name">{{ item.value }}</div>
        </template>
      </el-input>
    </div>
    <click-item></click-item>
    <footer class="footer">
      <img src="../../assets/logo.png" alt="footerlogo" class="footerlogo">
      <p>IKUN物流 © 版权所有 粤ICP备130448623号</p>
    </footer>
  </div>
</template>

<script>
import Banner from '../../components/banner/Banner'
import ClickItem from './ClickItem.vue'

export default {
  components: {
    ClickItem,
    Banner
  },
  data () {
    return {
      imgArr: [{url: require('../../assets/img1.jpg')}, {url: require('../../assets/img2.jpg')}],
      restaurants: [],
      inputValue: ''
    }
  },
  methods: {
    login: function () {
      this.$router.push({name: 'Login.vue'})
    },
    handleIconClick () {
      if (this.inputValue === '') {
        this.$message.error('请输入运单号')
      } else {
        this.$router.push('/Waybill?order=' + this.inputValue)
      }
    },
    handleSetBodyColor () {
      let body = document.getElementsByTagName('body')[0]
      body.style.backgroundColor = '#ffffff'
    }
  },
  mounted () {
    this.handleSetBodyColor()
  }
}
</script>

<style scoped>
  .banner{
    width: 100%;
    height: 50px;
    position: fixed;
    top: 0;
    background: #f0f0f2;
    z-index: 1000;
    left: 0;
  }
  header {
    background: #f0f0f2;
    position: fixed;
    width: 100%;
    height: 2rem;
    z-index: 100;
  }

  .block {
    position: relative;
    top: 50px;
  }

  .el-input {
    width: 90%;
    z-index: 10;
    position: absolute;
    bottom: 1rem;
    left: 5%;
  }

  .footer {
    position: relative;
    top: 6rem;
    text-align: center;
  }

  .footerlogo {
    width: 6rem;
  }

  .footer > p {
    color: #d5d5d5;
  }
</style>
