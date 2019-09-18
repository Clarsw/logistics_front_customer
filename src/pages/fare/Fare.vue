<template>
  <div class="container">
    <head-nav></head-nav>
    <div class="check-fare-container">
      <el-form>
        <el-form-item v-model="sendValue" label="寄件人所属区域"
        :rules="[
        { required: true, message: '所属区域不能为空'}
        ]">
        <el-cascader style="width: 100%"
                     placeholder="请选择省/市/区"
                     v-model="sendValue"
                     :options="sendOptions"
                     @change="handleSelectChange">
        </el-cascader>
        </el-form-item>
        <el-form-item v-model="receiveValue" label="寄件人所属区域"
                      :rules="[
        { required: true, message: '所属区域不能为空'}
        ]">
          <el-cascader style="width: 100%"
                       placeholder="请选择省/市/区"
                       v-model="receiveValue"
                       :options="receiveOptions"
                       @change="handleSelectChange1">
          </el-cascader>
        </el-form-item>
          <el-form-item label="预估重量"
                        prop="weight"
                        v-model="weight">
            <el-input-number v-model="weight" controls-position="left" @change="handleCountChange" :min="1" :max="100" ></el-input-number> KG
          </el-form-item>
        <el-form-item>共
          <el-input v-model="fare" :disabled="true" style="width: 50%"></el-input> 元
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import HeadNav from '@/components/banner/HeadNav'
import ChinaMap from '@/components/common/ChinaMap'
import options from '@/api/country'
export default {
  components: {
    HeadNav,
    ChinaMap
  },
  data () {
    return {
      sendValue: '',
      sendOptions: options, // 存放城市数据
      receiveValue: '',
      receiveOptions: options, // 存放城市数据
      weight: 1,
      selecting: false,
      radio: '',
      num: 1,
      fare: 0
    }
  },
  methods: {
    handleCheckFare () {
      if (this.sendValue && this.receiveValue && this.weight) {
        if (this.sendValue[0] === this.receiveValue[0]) {
          this.fare = Math.ceil(this.weight) * 8
        } else {
          this.fare = Math.ceil(this.weight) * 10
        }
      }
    },
    handleCountChange () {
      this.handleCheckFare()
    },
    handleSelectChange () {
      this.handleCheckFare()
    },
    handleSelectChange1 () {
      this.handleCheckFare()
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
.check-fare-container{
  margin: 120px auto;
  width: 50%;
}
</style>
