<template>
  <el-form-item label="所属区域"
                v-model="value"
                :rules="[
        { required: true, message: '所属区域不能为空'}
        ]">
    <el-cascader style="width: 100%"
                 placeholder="请选择省/市/区"
                 v-model="value"
                 :options="options"
                 @change="handleChange">
    </el-cascader>
  </el-form-item>
</template>

<script>
import options from '@/api/country'

export default {
  name: 'ChinaMap',
  data () {
    return {
      value: '',
      options: options // 存放城市数据
    }
  },
  mounted: function () {
  },
  methods: {
    handleChange (value) {
      console.log(value)
    }
  }
}
</script>

<style scoped>

</style>
