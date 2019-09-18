<template>
  <div class="container-header">
      <img class="logo" src="../../assets/logo.png">
    <template v-if="isShow1===1">
    <div class="my-modal banner-right" @mouseleave="isShow=0">
      <div class="my-modal-container online" v-if="username">
        <p @click="showMyList"><i class=" fa fa-user-o fa-2x"></i> {{username}}</p>
        <ul class="my-modal-list" v-if="isShow===1">
          <li>
            <router-link to="/self/center" tag="span">个人中心</router-link>
          </li>
          <li><p @click="logout">退出</p></li>
        </ul>
      </div>
      <div class="offline" v-else>
        <router-link to="/login" tag="span"><i class="fa fa-user-circle-o"></i>登陆</router-link>
        <router-link to="/register" tag="span"><i class="fa fa-edit"></i>注册</router-link>
      </div>
    </div>
    </template>
  </div>
</template>

<script>
import Customer from '@/api/customer'
import store from '@/store/store'

export default {
  name: 'Banner',
  data () {
    return {
      isShow: 0,
      isShow1: 1,
      username: store.getName()
    }
  },
  mounted: function () {
    this.checkPath()
  },
  methods: {
    logout () {
      Customer.logout('/customer/logout')
    },
    showMyList () {
      if (this.isShow === 0) {
        this.isShow = 1
      } else {
        this.isShow = 0
      }
    },
    checkPath () {
      let path = this.$route.path
      let flag = 0
      let briefPath = ''
      for (let i = 0; i < path.length; i++) {
        if (path[i] !== '/') {
          briefPath = briefPath + path[i]
        } else {
          flag++
          if (flag > 1) {
            break
          }
        }
      }
      if (briefPath === 'login' || briefPath === 'register' || briefPath === 'self') {
        this.isShow1 = 0
      }
    }
  }
}
</script>

<style scoped>
  /*.container-header .logo img{*/
  /*display: block;*/
  /*width: 40px;*/
  /*height: 40px;*/
  /*margin: auto 20px;*/
  /*}*/
  .container-header .my-modal {
    position: fixed;
    width: 200px;
    top: 10px;
    right: 30px;
    color: #000000;
    background: #f0f0f2;
    text-align: center;
    cursor: pointer;
  }
  .container-header .offline{
    color: #5e5e5e;
  }
  .container-header .offline span:nth-child(1){
    border-right: 1px solid #5e5e5e5e;
    padding-right: 10px;
  }
  .container-header .offline span:nth-child(2){
    padding-left: 10px;
  }
  .offline{
    position: fixed;
    width: 200px;
    top: 13px;
    right: 30px;
    color: #000000;
    background: #f0f0f2;
    text-align: center;
    cursor: pointer;
  }

  .container-header .my-modal .my-modal-container p {
    margin-bottom: 8px;
  }

  .container-header .my-modal .my-modal-container .my-modal-list li {
    display: block;
    padding: 10px 10px;
  }

  .container-header .my-modal .my-modal-container .my-modal-list li:hover {
    background-color: #4E80C4;
  }
  .logo{
    position: absolute;
    top:10px;
    left: 10px;
    width: 130px;
    height: 30px;
  }
</style>
