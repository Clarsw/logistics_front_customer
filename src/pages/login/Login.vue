<template>
  <div class="container">
    <!--<head-menu></head-menu>-->
    <head-nav></head-nav>
  <el-form :model="customer" :rules="rules" ref="loginForm" label-position="left" label-width="0px" class="demo-ruleForm login-container">
    <h3 class="title">登录</h3>
    <el-form-item prop="account" >
      <el-input type="text" v-model="customer.account" auto-complete="off" placeholder="账号" ></el-input>
    </el-form-item>
    <el-form-item prop="password" >
      <el-input type="password" v-model="customer.password" auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <el-form-item style="width:100%;">
      <el-button type="primary" style="width:100%;" :loading="logining" @click="submitForm('loginForm')">登录</el-button>
      <!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
    </el-form-item>
  </el-form>
  <div class="to-register">
    <span><router-link to="/register">还不是艾鲲物流会员？点此快速注册</router-link></span>
    <p>成为艾鲲会员随时随地掌握最新的物流动态，享受诸多会员权益</p>
  </div>
  </div>
</template>

<script>
import Customer from '@/api/customer'
import HeadNav from '@/components/banner/HeadNav'
export default {
  components: {HeadNav},
  data () {
    return {
      logining: false,
      customer: {
        account: '',
        password: ''
      },
      rules: {
        account: [
          { required: true, message: '请输入账号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.logining = true
          this.login()
        } else {
          this.logining = false
        }
      })
    },
    login () {
      Customer.login('/customer/login', this.customer)
    }

  }
}
</script>

<style scoped>
  .login-container {
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }
  .login-container  .title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
 .login-container .remember {
    margin: 0px 0px 35px 0px;
  }
  .to-register{
    margin-top: -20px;
  }
</style>
