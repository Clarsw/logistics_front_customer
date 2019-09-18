<template>
  <div class="clickitems">
    <div class="clickitem" v-for="item in itemArr" :key="item.url">
      <router-link :to="item.to">
        <img :src="item.url" class="menu-img">
        <span class="text">{{ item.text }}</span>
        <span class="detail">{{ item.detail }}</span>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      itemArr: [
        {url: require('../../assets/nav_1.png'), to: 'order_create', text: '在线寄件', detail: '当天件&隔天件'},
        {url: require('../../assets/nav_4.png'), to: 'fare', text: '运费时效', detail: '提前知晓运费'},
        {url: require('../../assets/nav_3.png'), to: 'near_warehouse', text: '附近网点', detail: '查看附近的网点'},
        {url: require('../../assets/nav_2.png'), to: '/', text: '订单管理', detail: '查看用户订单'}
      ]
    }
  }
}
</script>

<style scoped>
  .clickitems {
    position: relative;
    top: 3rem;
    margin-left: 2rem;
    height: 8rem;
  }

  .clickitem {
    margin-left: 22rem;
    float: left;
    margin-bottom: 1rem;
  }

  .menu-img {
    margin-left: -80px;
    width: 3rem;
    position: absolute;
  }

  .text {
    display: block;
    margin-left: 4rem;
  }

  .detail {
    display: block;
    margin-left: 4rem;
  }
</style>
