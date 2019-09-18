<template>
  <div class="container">
    <head-nav></head-nav>
    <div class="left">
      <div class="info">
        <div class="portrait">
          <img src="../../assets/profile.png" width="80" height="80" style="border: none;vertical-align: middle;">
        </div>
        <div class="customer-info">
            <div class="nick">{{accountData.name}}</div>
            <div class="account">账号:{{accountData.account}}</div>
            <div class="customer-id">ID:{{accountData.customerId}}</div>
            <div class="account-fun"><span class="logout" @click="open">退出</span>&nbsp;&nbsp;&nbsp;&nbsp; <span class="withdraw" @click="open1">注销</span></div>
        </div>
      </div>
      <div class="menu">
        <el-menu  :default-active="this.$route.path" class="el-menu-vertical-demo">
          <el-menu-item index="1"> <router-link to="/self/center" tag="span">个人中心</router-link></el-menu-item>
<!--          <el-menu-item index="2"> <router-link to="/self/all_order?page=1" tag="span">全部订单</router-link></el-menu-item>-->
          <el-menu-item index="2"> <router-link to="/self/send_order?page=1" tag="span">我的寄件</router-link></el-menu-item>
          <el-menu-item index="3"> <router-link to="/self/receive_order?page=1" tag="span">我的收件</router-link></el-menu-item>
        </el-menu>
      </div>
    </div>
    <div class="content">
      <div class="content-main">
        <router-view v-bind:accountData="accountData" v-bind:flag="flag"></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import getData from '@/api/getData'
import HeadNav from '@/components/banner/HeadNav'
import Customer from '@/api/customer'
export default {
  name: 'Self',
  components: {HeadNav},
  data () {
    return {
      flag: false,
      accountData: ''
    }
  },
  mounted: function () {
    this.handleSetBodyColor()
    this.getAccount()
  },
  methods: {
    handleSetBodyColor () {
      let body = document.getElementsByTagName('body')[0]
      body.style.backgroundColor = '#f1f1f1'
    },
    getAccount: async function () {
      let data = await getData.getData.get('/customer/getAccount', '')
      this.accountData = data
      this.flag = true
      // console.log(JSON.stringify(this.accountData))
      // this.test = JSON.stringify(this.accountData)
    },
    open () {
      this.$confirm('此操作将退出登陆, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        Customer.logout('/customer/logout')
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        })
      })
    },
    open1 () {
      this.$confirm('此操作永久注销改用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        Customer.logoff('/customer/logoff')
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        })
      })
    }
  }
}
</script>
<style scoped>
  .container {
    padding-top: 90px;
    width: 1170px;
    margin: 0 auto;
    padding-bottom: 20px;
    overflow: hidden;
  }

  .left {
    display: inline-block;
  }

  .content {
    background: #fff;
    vertical-align: top;
    display: inline-block;
    width: 800px;
    /*height: 745px;*/
    height: 100%;
    margin-left: 20px;
    overflow-y: auto;
    overflow: hidden;
  }

  .left .info {
    background: #fff;
    width: 300px;
    height: 180px;
    text-align: left;
  }

  .left .menu {
    background: #fff;
    width: 300px;
    height: 100%;
    margin-top: 15px;
    color: #737373;
    text-align: left;
  }

  .content .content-main {
    margin: 20px;
    text-align: left;
  }

  .left .info .portrait {
    display: inline-block;
    width: 80px;
    height: 80px;
    overflow: hidden;
    border-radius: 40px;
    background-color: #ccc;
    margin: 40px 18px 0 15px;

  }

  .left .info .customer-info {
    display: inline-block;
    margin: 38px 0 0;
    vertical-align: top;
  }
  .nick{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 110px;
  }
  .account{
    font-size: 13px;
    margin-top: 14px;
  }
  .customer-id{
    font-size: 13px;
    margin-top: 14px;
  }
  .account-fun{
    font-size: 13px;
    margin-top: 14px;
  }
  .logout{
    color:#409EFF;
  }
  .withdraw{
    color:red;
  }
  .con{
    background-color:#ffffff !important;
  }
  .el-menu-item span{
    padding: 20px 230px 20px 20px;
    margin-left: -20px;
  }
  .menu{
    overflow: hidden;
  }
  .is-active{
    color:#409EFF;
  }
</style>
