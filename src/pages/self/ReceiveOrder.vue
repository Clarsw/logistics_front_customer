<template>
  <div class="content-main cash">
    <div class="con">
      <div class="record">
        <div class="record-title">
          <el-divider content-position="left">我的收件</el-divider>
          <div class="select">
            <el-select v-model="statusValue" clearable placeholder="全部" @change="handleStateChange">
              <el-option
                v-for="item in statusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="record-content">
          <template>
            <el-table
              v-loading="loading"
              element-loading-text="Loading..."
              :data="orderData"
              style="width: 100%">
              <el-table-column type="expand">
                <template slot-scope="props">
                  <el-form label-position="left"  class="demo-table-expand">
                    <el-form-item label="寄件人手机号码 :">
                      <span>{{ props.row.customerPhone }}</span>
                    </el-form-item>
                    <el-form-item label="寄件人地址 :">
                      <span>{{ props.row.customerAddress }}</span>
                    </el-form-item>
                    <el-form-item label="收件人手机号码 :">
                      <span>{{ props.row.receiverPhone }}</span>
                    </el-form-item>
                    <el-form-item label="收件人地址 :">
                      <span>{{ props.row.receiverAddress }}</span>
                    </el-form-item>
                    <el-form-item label="物品重量 :">
                      <span>{{ props.row.wareWeight }}</span>
                    </el-form-item>
                    <el-form-item label="运费 :">
                      <span>{{ props.row.freight }}</span>
                    </el-form-item>
                    <el-form-item label="寄件时间 :">
                      <span>{{ props.row.createDate }}</span>
                    </el-form-item>
                    <el-form-item label="收件时间 :">
                      <span>{{ props.row.confirmDate }}</span>
                    </el-form-item>
                  </el-form>
                </template>
              </el-table-column>
              <el-table-column
                label="订单 ID"
                prop="orderId">
              </el-table-column>
              <el-table-column
                label="寄件人"
                prop="customerName">
              </el-table-column>
              <el-table-column
                label="收件人"
                prop="receiverName">
              </el-table-column>
              <el-table-column
                label="状态"
                prop="status">
              </el-table-column>
              <el-table-column
                fixed="right"
                label="操作"
                width="100">
                <template slot-scope="scope">
                  <el-button @click="handleClick(scope.row.orderId)" type="primary" size="small" >查看物流</el-button>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </div>
        <div class="pagination">
          <pagination ref="pagination"></pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import OrderSelect from '@/components/common/OrderSelect'
import getData from '@/api/getData'
import Pagination from '@/components/common/Pagination'
export default {
  name: 'AllOrder',
  components: {OrderSelect, Pagination},
  data () {
    return {
      statusOptions: [{
        value: '0',
        label: '已完成'
      }, {
        value: '1',
        label: '配送中'
      }],
      loading: true,
      statusValue: '',
      orderData: [{
        orderId: 1,
        customerName: '22132aa',
        customerPhone: '13456789765',
        customerAddress: '广东省深圳市罗湖区罗湖大道六巷9号',
        receiverName: '22132aa',
        receiverPhone: '13456789765',
        receiverAddress: '广东省深圳市罗湖区罗湖大道六巷9号',
        wareWeight: 10,
        freight: 500,
        createDate: '2019-01-01',
        confirmDate: '2019-01-01',
        status: 1
      }]
    }
  },
  mounted () {
    this.getAll()
  },
  methods: {
    handleStateChange (value) {
      this.$router.push(this.$route.path + '?page=1')
      this.$refs.pagination.parentSelectChange()
      this.statusValue = value
      this.getAll()
    },
    handleClick (billId) {
      console.log(billId)
      this.$router.push('/Waybill?order=' + billId)
    },
    getAll: async function () {
      let page = this.$route.query.page
      this.loading = true
      let data = await getData.getData.get('/customer/getReceiveOrder', {'page': page, 'status': this.statusValue})
      this.loading = false
      this.orderData = data['orderData']
      console.log(data.totalPage)
      this.$refs.pagination.totalPage = data['totalPage'] * 10
    }
  }

}
</script>

<style scoped>
  .cash {
    margin: 20px 0;
  }
  .cash .con{
    background: #f1f1f1;
    margin: 20px 0;
  }
  .record{
    background-color: #fff;
    margin-top: 15px;
  }
  .record-title .el-divider__text {
    font-weight: 500;
    color: #3c3c3c;
  }
  .record-content {
    width: 100%;
  }
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
  .select{
    float: right;
    margin-top: -42px;
  }
  .demo-table-expand .el-form-item{
    width: 100%;
  }
  .pagination {
    float: right;
    margin: 20px;
  }
</style>
