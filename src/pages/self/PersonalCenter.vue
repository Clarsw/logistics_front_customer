<template>
    <div class="content-main cash">
      <div class="con">
        <div class="header">
          <!--<div class="record-title"><span style="color:red;">* </span>修改基本资料</div>-->
          <div class="record-title"> <el-divider content-position="left">修改基本资料</el-divider></div>
          <div class="form essential">
            <el-form :model="accountExtendedData" status-icon :rules="rules1" ref="accountForm" label-width="100px"
                     class="demo-accountForm" style="width: 50%; background-color: #f8f8f8;padding:20px">
              <el-form-item label="昵称:" prop="name">
                <el-input v-model="accountExtendedData.name"  :placeholder='initName'></el-input>
              </el-form-item>
              <el-form-item label="手机号码:" prop="phone">
                <el-input v-model="accountExtendedData.phone" :placeholder='initPhone'></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('accountForm')">提交</el-button>
                <el-button  @click="resetForm('accountForm')">重置</el-button>
              </el-form-item>
            </el-form>
          </div>
          <!--<div class="record-title title1"><span style="color:red;">* </span>修改账号密码</div>-->
          <div class="record-title title1"><el-divider content-position="left">修改账号密码</el-divider></div>
          <div class="form password">
            <el-form :model="accountExtendedData" status-icon :rules="rules" ref="passwordForm" label-width="100px"
                     class="demo-passwordForm" style="width: 50%; background-color:#f8f8f8;padding:20px">
              <el-form-item label="当前密码:" prop="currentPassword">
                <el-input type="currentPassword" v-model="accountExtendedData.currentPassword" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="新的密码:" prop="password">
                <el-input type="password" v-model="accountExtendedData.password" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="确认密码:" prop="checkPassword">
                <el-input type="checkPassword" v-model="accountExtendedData.checkPassword" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('passwordForm')">提交</el-button>
                <el-button @click="resetForm1('passwordForm')">重置</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <!--<div class="record cash">-->
          <!--<div class="record-title">所有订单记录</div>-->
          <!--<div class="record-chart"></div>-->
        <!--</div>-->
      </div>
      <div class="message">
        <template>
          <Message ref="message"></Message>
        </template>
      </div>
    </div>
</template>

<script>
import getData from '@/api/getData'
import Message from '@/components/common/Message'
import Customer from '@/api/customer'
export default {
  components: {Message},
  name: 'PersonalCenter',
  props: ['accountData', 'flag'],
  data () {
    let checkName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('姓名不能为空'))
      }
      setTimeout(() => {
        callback()
      }, 1000)
    }
    let checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('手机号码不能为空'))
      }
      setTimeout(() => {
        // if (!Number.isInteger(value)) {
        //   callback(new Error('请输入数字值'))
        // } else {
        //   if (value < 18) {
        //     callback(new Error('必须年满18岁'))
        //   } else {
        //     callback()
        //   }
        // }
        let regPhone = /^1[34578]\d{9}$/
        if (!regPhone.test(value)) {
          callback(new Error('请输入有效手机号码'))
        } else {
          callback()
        }
      }, 1000)
    }
    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.accountExtendedData.checkPassword !== '') {
          this.$refs.passwordForm.validateField('checkPassword')
          callback()
        }
        callback()
      }
    }
    let validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.accountExtendedData.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    let validatePass3 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入当前密码'))
      } else {
        callback()
      }
    }
    return {
      accountExtendedData: {
        customerId: '',
        account: '',
        name: '',
        phone: '',
        currentPassword: '',
        password: '',
        checkPassword: ''

      },
      initName: '',
      initPhone: '',
      rules: {
        password: [
          {validator: validatePass, trigger: 'blur'}
        ],
        checkPassword: [
          {validator: validatePass2, trigger: 'blur'}
        ],
        currentPassword: [
          {validator: validatePass3, trigger: 'blur'}
        ]
      },
      rules1: {
        name: [
          {validator: checkName, trigger: 'blur'}
        ],
        phone: [
          {validator: checkPhone, trigger: 'blur'}
        ]
      }
    }
  },
  // watch: {// 获取父组件传递引用类型
  //   accountData (newData, prevData) {
  //     console.log(newData, 'new')
  //     this.accountExtendedData = newData
  //     console.log(this.accountExtendedData)
  //   }
  // },
  mounted: function () {
    // this.customerData. = this.$parent.customerData\
    // console.log(this.$props)
    // console.log(this.$props.test)
    let timer = setInterval(() => {
      if (this.$props.flag === true) {
        this.accountExtendedData.name = this.$props.accountData.name
        this.accountExtendedData.account = this.$props.accountData.account
        this.accountExtendedData.customerId = this.$props.accountData.customerId
        this.accountExtendedData.phone = this.$props.accountData.phone
        this.initName = this.accountExtendedData.name
        this.initPhone = this.accountExtendedData.phone
        clearInterval(timer)
      }
    }, 100)
    // setTimeout(() => {
    //   this.accountExtendedData.name = this.$props.accountData.name
    //   this.accountExtendedData.account = this.$props.accountData.account
    //   this.accountExtendedData.customerId = this.$props.accountData.customerId
    //   this.accountExtendedData.phone = this.$props.accountData.phone
    //   this.initName = this.accountExtendedData.name
    //   this.initPhone = this.accountExtendedData.phone
    //   console.log(this.accountExtendedData, this.initName, this.initPhone)
    // }, 1000)
  },
  methods: {
    // 更新密码
    // updatePassword: async function () {
    //   let data = await getData.getData.post('/user/updatePassword', {
    //     'userId': this.accountData.userId, 'currentPassword': this.accountData.currentPassword, 'password': this.accountData.password})
    //   return data.result
    // },
    updateAccount: async function () {
      let data = await getData.getData.post('/customer/update',
        {'customerId': this.accountExtendedData.customerId, 'name': this.accountExtendedData.name, 'phone': this.accountExtendedData.phone})
      this.$refs.message.handleShow(data.result)
      if (data.result === true) {
        location.reload()
      }
    },
    // 更新密码
    updatePassword: async function () {
      let data = await getData.getData.post('/customer/updatePassword', {
        'customerId': this.accountExtendedData.customerId, 'currentPassword': this.accountExtendedData.currentPassword, 'password': this.accountExtendedData.password})
      if (data.result === true) {
        Customer.logout('/customer/logout')
        this.$message({
          type: 'success',
          message: '密码修改成功,请重新登陆'
        })
      } else {
        this.$message({
          type: 'error',
          message: '修改失败' + data.result
        })
      }
    },
    submitForm (formName) {
      console.log(formName)
      this.$refs[formName].validate((valid) => {
        if (valid && formName === 'accountForm') {
          this.open()
        } else if (valid && formName === 'passwordForm') {
          this.open1()
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
      this.accountExtendedData.name = this.initName
      this.accountExtendedData.phone = this.initPhone
    },
    resetForm1 (formName) {
      this.$refs[formName].resetFields()
    },
    open () {
      this.$confirm('此操作将更新用户数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.updateAccount()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        })
      })
    },
    open1 () {
      this.$confirm('此操作将更新用户密码, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.updatePassword()
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
.content-main{
  margin: 20px 0;
  text-align: left;
}
.record-title{
  margin: 20px 0;
}
.title1{
   margin: 60px 0 20px;
 }
.record-title .el-divider__text {
  font-weight: 500;
  color: #3c3c3c;
}
  /*.cash .con{*/
    /*background: #f1f1f1;*/
    /*margin: 20px 0;*/
  /*}*/
  /*.cash .con .header{*/
    /*background-color: #fff;*/
    /*padding: 0 20px 25px;*/
  /*}*/
  /*.cash .con .record{*/
    /*background-color: #fff;*/
    /*margin-top: 15px;*/
    /*padding: 30px 20px 0px;*/
  /*}*/
  /*.cash .con .record .record-title{*/
    /*margin-left: 10px;*/
    /*font-weight: 700;*/
    /*color: #3c3c3c;*/
  /*}*/
/*.cash .con .record .record-chart{*/
  /*width: 100%;*/
/*}*/
  .header .form{
    background-color: #f8f8f8;
  }
</style>
