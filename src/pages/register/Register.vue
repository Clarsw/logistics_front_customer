<template>
  <div class="container">
    <head-nav></head-nav>
    <el-form :model="customer" :rules="rules" ref="registerForm" label-position="left" label-width="0px"
             class="demo-ruleForm register-container">
      <h3 class="title">注册</h3>
      <el-form-item prop="account">
        <el-input type="text" v-model="customer.account" auto-complete="off" placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="customer.password" auto-complete="off" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item prop="ensurePassword">
        <el-input type="password" v-model="customer.ensurePassword" auto-complete="off" placeholder="确认密码"></el-input>
      </el-form-item>
      <el-form-item prop="name">
        <el-input type="text" v-model="customer.name" auto-complete="off" placeholder="昵称"></el-input>
      </el-form-item>
      <el-form-item prop="phone">
        <el-input type="text" v-model="customer.phone" auto-complete="off" placeholder="手机号码"></el-input>
      </el-form-item>
      <el-form-item style="width:100%;">
        <el-button type="primary" style="width:100%;" :loading="logining" @click="submitForm('registerForm')">注册
        </el-button>
        <!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
      </el-form-item>
    </el-form>
    <div class="to-login">
      <span><router-link to="/login">已有艾鲲物流会员？点此快速登陆</router-link></span>
      <p>登陆艾鲲会员随时随地掌握最新的物流动态，享受诸多会员权益</p>
    </div>
  </div>
</template>
<script>

import Customer from '@/api/customer'
import HeadNav from '@/components/banner/HeadNav'
export default {
  components: {HeadNav},
  data () {
    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.customer.ensurePassword !== '') {
          this.$refs.registerForm.validateField('ensurePassword')
          callback()
        }
        callback()
      }
    }
    let validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.customer.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      logining: false,
      customer: {
        account: '',
        password: '',
        ensurePassword: '',
        name: '',
        phone: ''
      },
      rules: {
        account: [
          {required: true, message: '请输入账号', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {validator: validatePass, trigger: 'blur'}
        ],
        ensurePassword: [
          {required: true, message: '请输入确认密码', trigger: 'blur'},
          {validator: validatePass2, trigger: 'blur'}
        ],
        name: [
          {required: true, message: '请输入姓名', trigger: 'blur'}
        ],
        phone: [
          {required: true, message: '请输入手机号码', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.logining = true
          this.register()
        } else {
          this.logining = false
        }
      })
    },
    register () {
      Customer.register('/customer/register', {
        account: this.customer.account,
        name: this.customer.name,
        password: this.customer.password,
        phone: this.customer.phone
      })
    }
  }
}
</script>

<style scoped>
  .register-container {
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 80px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }
  .register-container  .title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
  .register-container .remember {
    margin: 0px 0px 35px 0px;
  }
  .to-login{
    margin-top: -20px;
  }
</style>
