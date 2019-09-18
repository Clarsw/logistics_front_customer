<template>
  <div class="container">
    <head-menu></head-menu>
    <el-main v-loading="loading"  element-loading-text="Loading..." >
      <div class="waybill" v-if="bill.billId && !loading">
        <div class="topdiv">
          <i class="el-icon-document"></i>
          <span>运单号：{{ bill.billId }}</span><br>
          <i class="el-icon-edit-outline"></i>
          <span>运单状态：{{ bill.status }}</span>
          <img src="../../assets/express4.gif" alt="expressgif" class="expressgif">
        </div>
        <el-steps :active="active" align-center direction="vertical">
          <el-step v-for="item in bill.logisticsRecord" :key="item.title" :title="item.title"
                   :description="item.description"></el-step>
        </el-steps>
      </div>
      <div v-else-if="!bill && !loading">
        <Not-found></Not-found>
      </div>
    </el-main>
  </div>
</template>

<script>
import HeadMenu from '@/components/common/HeadMenu'
import NotFound from './NotFound'
import getData from '@/api/getData'

export default {
  components: {
    NotFound,
    HeadMenu
  },
  data () {
    return {
      loading: true,
      bill: ''
      // billId: '111111111111',
      // status: '已签收',
      // logisticsRecord: [{
      //   'title': '2018-05-18 14:33:10',
      //   'description': '【温州市】  【平阳瑞鸟】（0577-63096668、0577-58117167） 的 钱玉树 （15857701521） 已揽收'
      // },
      // {
      //   'title': '2018-05-18 20:16:46',
      //   'description': '【温州市】  快件离开 【平阳瑞鸟】 发往 【上海】'
      // },
      // {
      //   'title': '2018-05-18 21:50:10',
      //   'description': '【温州市】  快件到达 【温州中转部】'
      // },
      // {
      //   'title': '2018-05-18 21:50:11',
      //   'description': '【温州市】  快件离开 【温州中转部】 发往 【上海】'
      // },
      // {
      //   'title': '2018-05-19 09:39:58',
      //   'description': '【上海市】  快件到达 【上海】'
      // },
      // {
      //   'title': '2018-05-19 12:04:38',
      //   'description': '【上海市】  快件离开 【上海】 发往 【九亭二部】'
      // },
      // {
      //   'title': '2018-05-19 14:35:30',
      //   'description': '【上海市】  快件到达 【九亭二部】'
      // },
      // {
      //   'title': '2018-05-19 14:38:29',
      //   'description': '【上海市】  快件到达 【九亭贝尚湾】'
      // },
      // {
      //   'title': '2018-05-19 15:30:35',
      //   'description': '【上海市】  【九亭贝尚湾】 的鹿増（18930891161） 正在第1次派件, 请保持电话畅通,并耐心等待'
      // },
      // {
      //   'title': '2018-05-19 19:52:35',
      //   'description': '【上海市】  快件已在 【九亭贝尚湾】 签收,签收人: 王越, 感谢使用中通快递,期待再次为您服务!'
      // }]
    }
  },
  mounted () {
    this.getDetails()
  },
  methods: {
    getDetails: async function () {
      this.loading = true
      let data = await getData.getData.get('/order/getDetails', {'billId': this.$route.query.order})
      this.bill = data.billData
      this.loading = false
    }
  }
}
</script>

<style scoped>
  .el-main {
    padding: 0;
  }

  .waybill {
    position: relative;
  }
  .el-steps {
    color:#000000;
    font-size: 22px;
  }
  .topdiv {
    line-height: 1.5rem;
  }

  .expressgif {
    width: 100%;
  }
</style>
