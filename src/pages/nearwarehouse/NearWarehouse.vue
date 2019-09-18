<template>
  <div id='MapBox'>
    <div class='baiduMap' id='mapShow'></div>
    <div id="notice">
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>
</template>
<script>
import {MP} from '@/api/map'
import getData from '@/api/getData'

export default {
  name: 'baiduMap',
  data () {
    return {
      adds: ['广东省湛江市坡头区旦黎南路1号', '广东省湛江市遂溪县中间岭村遂海路55号', '广东省湛江市雷州市水店中路27号', '广东省湛江市霞山区滨海居住区海宁小区居录苑3幢', '广东省湛江市雷州市水店中路27号']

    }
  },
  created () {

  },
  computed () {

  },
  mounted () {
    // this.handleSetHeight()
    this.baiduMap()
  },
  methods: {
    // handleSetHeight () {
    //   let height = window.innerHeight
    //   let MapBox = document.getElementById('mapShow')
    //   MapBox.style.height = height
    // },
    baiduMap: function () {
      // 第一种方式引入
      MP('W1qOyB41PtvBFEZKWy4puXIC9MeooHRh').then(BMap => { // 调用map.js中Map()方法，引入百度地图秘钥作为参数
        // let th = this
        var lab = ''
        var index = 0
        var map = new BMap.Map('mapShow') // 创建Map实例
        var point = new BMap.Point(114.065537, 22.553321) // 创建点坐标
        // var marker = new BMap.Marker(point)
        var geolocation = new BMap.Geolocation()
        var myGeo = new BMap.Geocoder()
        var adds = ['广东省湛江市坡头区旦黎南路1号', '广东省湛江市遂溪县中间岭村遂海路55号', '广东省湛江市雷州市水店中路27号', '广东省湛江市霞山区滨海居住区海宁小区居录苑3幢', '广东省湛江市雷州市水店中路27号']

        function bdGEO () {
          var add = adds[index]
          geocodeSearch(add)
          index++
        }

        geolocation.getCurrentPosition(function (r) { // 定位结果对象会传递给r变量
          // 通过Geolocation类的getStatus()可以判断是否成功定位。
          // 关于状态码
          // BMAP_STATUS_SUCCESS   检索成功。对应数值“0”。
          // BMAP_STATUS_CITY_LIST 城市列表。对应数值“1”。
          // BMAP_STATUS_UNKNOWN_LOCATION  位置结果未知。对应数值“2”
          // BMAP_STATUS_TIMEOUT   超时。对应数值“8”。(自 1.1 新增)
          if (this.getStatus() === 0) {
            // map.panTo(r.point);//地图中心移动
            var point = new BMap.Point(r.point.lng, r.point.lat)// 用所定位的经纬度查找所在地省市街道等信息
            myGeo.getLocation(point, function (rs) {
              // var addComp = rs.addressComponents
              lab = rs.address
              // alert(lab)
              markWarehouse(lab)
            })
            addMarker(r.point, new BMap.Label(lab, {offset: new BMap.Size(20, -10)}))
          } else {
            alert('failed' + this.getStatus())
          }
        }, function () {
          alert('无法获取当前位置,请刷新重试')
        }, 1000)

        function addMarker (point, label) {
          var marker = new BMap.Marker(point)
          map.addOverlay(marker)
          marker.setLabel(label)
          map.panTo(point)
        }

        function geocodeSearch (add) {
          if (index < adds.length) {
            setTimeout(bdGEO, 1000)
          }
          myGeo.getPoint(add, function (point) {
            if (point) {
              // document.getElementById('result').innerHTML +=
              //   index + '、' + add + ':' + point.lng + ',' + point.lat + '</br>'
              var address = new BMap.Point(point.lng, point.lat)
              addMarker(address, new BMap.Label(index + ':' + add, {offset: new BMap.Size(20, -10)}))
            }
          }, lab)
        }
        async function markWarehouse (lab) {
          var reg = /.+?(省|市|自治区|自治州|县|区)/g
          let local = ''
          var add = lab.match(reg)
          for (let i = 0; i < add.length; i++) {
            local += add[i]
          }
          let data = await getData.getData.get('/warehouse/getNear', {'address': local})
          adds = data.warehouse
          if (!data.warehouse) {
            let notice = document.getElementById('notice')
            notice.innerText = '您所在地区附近没有可寄件站点'
          } else {
            let notice = document.getElementById('notice')
            notice.innerText = '您所在的地区附近共有' + adds.length + '个可寄件站点'
            // console.log( notice.getElementsByTagName('span'))
            // [0].innerText = adds.length
            bdGEO()
          }
        }
        // map.addOverlay(marker)// 添加一个标注
        map.centerAndZoom(point, 13)// 添加初始化中心点及地图层级
        map.enableScrollWheelZoom()// 开启鼠标滚轮缩放功能。仅对PC上有效
        map.enableContinuousZoom()// 启用连续缩放效果，默认禁用
      })
    }
  }

}

</script>
<style scoped>
  #MapBox {
    width: 100%;
    height: 100%;
  }

  .baiduMap {
    height: 600px;
    width: 100%;
  }
</style>
