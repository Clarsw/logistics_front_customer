<template>
  <el-select v-model="value" clearable placeholder="全部">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
</template>

<script>
export default {
  data () {
    return {
      options: [{
        value: '0',
        label: '已完成'
      }, {
        value: '1',
        label: '配送中'
      }],
      value: ''
    }
  }
}
</script>
