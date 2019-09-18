<template>
  <div class="menu">
    <head-nav></head-nav>
    <div class="paddingdiv">
      <div class="send">
        <div class="send-container">
          <el-form :model="senderData" status-icon :rules="rules" ref="senderForm">
            <el-form-item label="姓名"
                          prop="name"
                  >
              <el-input
                prefix-icon="el-icon-edit"
                placeholder="请输入寄件人姓名"
                v-model="senderData.name"
                clearable>
              </el-input>
            </el-form-item>
            <el-form-item label="手机号码"
                          prop="phone"
                          :rules="[
      { required: true, message: '手机号码不能为空'},
       { type: 'number', message: '手机号码必须为数字值'},
      { pattern: /^1[34578]\d{9}$/,message:'手机号码格式无效'}
    ]">
              <el-input
                prefix-icon="el-icon-mobile-phone"
                placeholder="请输入寄件人手机号码"
                maxlength="11"
                v-model.number="senderData.phone"
                clearable>
              </el-input>
            </el-form-item>
            <el-form-item v-model="senderData.senderBA" label="寄件人所属区域"
                          prop="senderBA"
            >
              <el-cascader style="width: 100%"
                           placeholder="请选择省/市/区"
                           v-model="senderData.senderBA"
                           :options="sendOptions"
                           @change="handleSenderAreaChange">
              </el-cascader>
            </el-form-item>
            <el-form-item label="详细地址"
                          prop="senderDA"
                          :rules="[
      { required: true, message: '详细地址不能为空'}
    ]">
              <el-input
                prefix-icon="el-icon-location"
                placeholder="请输入寄件人详细地址"
                maxlength="30"
                v-model="senderData.senderDA"
                clearable>
              </el-input>
            </el-form-item>
            <el-form-item  label="寄件仓库"
                          prop="warehouseName"
                          >
              <el-input
                prefix-icon="el-icon-house"
                placeholder="请输入寄件仓库"
                maxlength="11"
                v-model="senderData.warehouseName"
                @change="handleCheckWarehouse"
                clearable>
              </el-input>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="receiver">
        <div class="receiver-container">
          <el-form :model="receiverData" status-icon :rules="rules" ref="receiverForm">
            <el-form-item label="姓名"
                          prop="name"
                        >
              <el-input
                prefix-icon="el-icon-edit"
                placeholder="请输入寄件人姓名"
                v-model="receiverData.name"
                clearable>
              </el-input>
            </el-form-item>
            <el-form-item label="手机号码"
                          prop="phone"
                          :rules="[
      { required: true, message: '手机号码不能为空'},
      { type: 'number', message: '手机号码必须为数字值'},
      { pattern: /^1[34578]\d{9}$/,message:'手机号码格式无效'}
    ]">
              <el-input
                prefix-icon="el-icon-mobile-phone"
                placeholder="请输入收件人手机号码"
                maxlength="11"
                v-model.number="receiverData.phone"
                clearable>
              </el-input>
            </el-form-item>
            <el-form-item v-model="receiverData.senderBA" label="收件人所属区域"
                          prop="receiverBA"
                        >
              <el-cascader style="width: 100%"
                           placeholder="请选择省/市/区"
                           v-model="receiverData.receiverBA"
                           :options="receiveOptions"
                           @change="handleReceiverAreaChange">
              </el-cascader>
            </el-form-item>
            <el-form-item label="详细地址"
                          prop="receiverDA"
                          :rules="[
      { required: true, message: '详细地址不能为空'}
    ]">
              <el-input
                prefix-icon="el-icon-location"
                placeholder="请输入收件人详细地址"
                maxlength="30"
                v-model="receiverData.receiverDA"
                clearable>
              </el-input>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="footdiv">
        <el-checkbox v-model="checked" style="color:rgb(200,200,200)">我已同意并接受</el-checkbox>
        <router-link to="" style="color:#409eff;">《寄件承诺》</router-link>
        <p>发件时间：8:00—17:00，逾时次日服务</p>
        <el-button type="primary" class="floatbtn" @click="submitForm">提交</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import HeadNav from '@/components/banner/HeadNav'
import options from '@/api/country'
import getData from '@/api/getData'
export default {
  components: {
    HeadNav
  },
  data () {
    let checkSenderArea = async (rule, value, callback) => {
      if (!value) {
        return callback(new Error('所属区域不能为空'))
      } else {
        let checkResult = await getData.getData.get('/order/checkArea', {'area': value[0] + value[1] + value[2]})
        if (!checkResult) {
          return callback(new Error('区域暂不支持配送'))
        } else {
          return callback()
        }
      }
    }
    let checkReceiverArea = async (rule, value, callback) => {
      if (!value) {
        return callback(new Error('所属区域不能为空'))
      } else {
        let checkResult = await getData.getData.get('/order/checkArea', {'area': value[0] + value[1] + value[2]})
        if (!checkResult) {
          return callback(new Error('区域暂不支持配送'))
        } else {
          return callback()
        }
      }
    }
    let checkWarehouse = async (rule, value, callback) => {
      let flag = false
      if (!value) {
        return callback(new Error('寄件仓库不能为空'))
      } else {
        for (let i = 0; i < this.warehouseOption.length; i++) {
          if (this.warehouseOption[i].name === value) {
            this.senderData.warehouseId = this.warehouseOption[i].warehouseId
            flag = true
            break
          } else {
            flag = false
          }
        }
        if (!flag) {
          return callback(new Error('输入仓库有误，请找工作人员核实仓库名'))
        } else {
          return callback()
        }
      }
    }
    let checkName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('姓名为空'))
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
        let regName = /^[\u4e00-\u9fa5]{2,4}$/
        if (!regName.test(value)) {
          callback(new Error('请输入有效姓名'))
        } else {
          callback()
        }
      }, 1000)
    }
    return {
      sendOptions: options,
      receiveOptions: options,
      warehouseOption: '',
      senderData: {
        name: '',
        phone: '',
        address: '',
        senderDA: '',
        senderBA: '',
        // this.senderBA[0] + this.senderBA[1] + this.senderDA[2] + this.senderDA,
        warehouseId: ''
      },
      receiverData: {
        name: '',
        phone: '',
        address: '',
        receiverBA: '',
        receiverDA: ''
        // this.receiverBA[0] + this.receiverBA[1] + this.receiverBA[2] + this.receiverDA
      },
      rules: {
        senderBA: [
          {required: true, message: '所属区域不能为空', trigger: 'blur'},
          {validator: checkSenderArea, trigger: 'blur'}
        ],
        warehouseName: [
          {required: true, message: '寄件不能为空', trigger: 'blur'},
          {validator: checkWarehouse, trigger: 'blur'}
        ],
        receiverBA: [
          {required: true, message: '所属区域不能为空', trigger: 'blur'},
          {validator: checkReceiverArea, trigger: 'blur'}
        ],
        name: [
          {validator: checkName, trigger: 'blur'}
        ]
      },
      checked: false
    }
  },
  methods: {

    handleCheckWarehouse (value) {
      this.$refs.senderForm.validateField('warehouseId')
    },
    handleSenderAreaChange (value) {
      this.$refs.senderForm.validateField('senderBA')
    },
    handleReceiverAreaChange (value) {
      this.$refs.receiverForm.validateField('receiverBA')
    },
    submitOrder () {
      if (!this.checked) {
        this.$message.error('请先同意寄件承诺条款')
      } else {
        this.senderData.address = this.senderData.senderBA[0] + this.senderData.senderBA[1] + this.senderData.senderBA[2] +
          this.senderData.senderDA
        this.receiverData.address = this.receiverData.receiverBA[0] + this.receiverData.receiverBA[1] + this.receiverData.receiverBA[2] +
          this.receiverData.receiverDA
        this.createOrder()
      }
    },
    handleSetBodyColor () {
      let body = document.getElementsByTagName('body')[0]
      body.style.backgroundColor = '#ffffff'
    },
    submitForm () {
      this.$refs['senderForm'].validate((valid) => {
        if (valid) {
          this.$refs['receiverForm'].validate((valid1) => {
            if (valid1) {
              this.submitOrder()
            } else {
              this.$message({
                type: 'error',
                message: '填写数据有误，请检查修改'
              })
            }
          })
        } else {
          this.$message({
            type: 'error',
            message: '填写数据有误，请检查修改'
          })
        }
      })
    },
    // 生成所属仓库ID和仓库名
    getWarehouse: async function () {
      let data = await getData.getData.get('/warehouse/getAllBrief', '')
      this.warehouseOption = data
    },
    createOrder: async function () {
      let data = await getData.getData.post('/order/create', {
        'customerName': this.senderData.name,
        'customerPhone': this.senderData.phone,
        'customerAddress': this.senderData.address,
        'receiverName': this.receiverData.name,
        'receiverPhone': this.receiverData.phone,
        'receiverAddress': this.receiverData.address,
        'warehouseId': this.senderData.warehouseId
      })
      if (data.result === true) {
        this.$router.push('/')
        this.$message({
          type: 'success',
          message: '申请成功，等待寄送'
        })
      } else {
        this.$message({
          type: 'error',
          message: '申请失败' + data.result
        })
      }
    }
  },
  mounted () {
    this.handleSetBodyColor()
    this.getWarehouse()
  }
}
</script>

<style scoped>
  .send {
    position: absolute;
    top: 18%;
    left: 0;
    width: 50%;
    border-right: 1px solid rgb(200, 200, 200);
  }

  .send .send-container {
    width: 70%;
    margin: 0 auto;
  }

  .receiver {
    position: absolute;
    top: 18%;
    right: 0;
    width: 50%;
  }

  .receiver .receiver-container {
    width: 70%;
    margin: 0 auto;
  }

  .inlinediv {
    display: inline-block;
    width: 48%;
  }

  .notice {
    display: none;
  }

  .footdiv {
    position: fixed;
    bottom: 0;
    padding: 1rem;
    width: 100%;
    background: #555;
    color: #fff;
    left: 0;
  }

  .floatbtn {
    position: absolute;
    top: 1rem;
    left: 20rem;
  }

  .widthselect {
    width: 77%
  }

  .paddingdiv {
    padding: 1rem;
  }
</style>
