import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home/Home'
import Login from '@/pages/login/Login'
import Waybill from '@/pages/waybill/WayBill'
import Register from '@/pages/register/Register'
import OrderCreate from '@/pages/order/OrderCreate'
import Fare from '@/pages/fare/Fare'
import Self from '@/pages/self/Self'
import PersonalCenter from '@/pages/self/PersonalCenter'
import AllOrder from '@/pages/self/AllOrder'
import SendOrder from '@/pages/self/SendOrder'
import ReceiveOrder from '@/pages/self/ReceiveOrder'
import NearWarehouse from '@/pages/nearwarehouse/NearWarehouse'
Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/self',
      redirect: '/self/center',
      component: Self,
      meta: {
        requireAuth: true
      },
      children: [
        {path: '/self/center',
          name: 'PersonalCenter',
          component: PersonalCenter,
          meta: {
            requireAuth: true
          }},
        {path: '/self/all_order',
          name: 'AllOrder',
          component: AllOrder,
          meta: {
            requireAuth: true
          }},
        {path: '/self/send_order',
          name: 'SendOrder',
          component: SendOrder,
          meta: {
            requireAuth: true
          }},
        {path: '/self/receive_order',
          name: 'ReceiveOrder',
          component: ReceiveOrder,
          meta: {
            requireAuth: true
          }}

      ]
    },
    /// ////////////
    {
      path: '/',
      redirect: '/home',
      meta: {
        requireAuth: false
      }
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      meta: {
        requireAuth: false
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        requireAuth: false
      }
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      meta: {
        requireAuth: false
      }
    },
    {
      path: '/Waybill',
      name: 'Waybill',
      component: Waybill,
      meta: {
        requireAuth: false
      }
    },
    {
      path: '/fare',
      name: 'Fare',
      component: Fare,
      meta: {
        requireAuth: false
      }
    },
    {
      path: '/order_create',
      name: 'OrderCreate',
      component: OrderCreate,
      meta: {
        requireAuth: true
      }
    },
    {path: '/near_warehouse',
      name: 'NearWarehouse',
      component: NearWarehouse,
      meta: {
        requireAuth: false
      }},
    {
      path: '*',
      redirect: '/'
    }
  ],
  linkActiveClass: 'is-active'
})
