import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);


//
import Home from '@/page/Home/Home'
import Login from '@/page/login/login'
import index from '@/page/indexManager/index'



export default new Router({
  base: '/officialmanage/',
  routes: [{
      path: '/',
      redirect: '/index'
    },
    {
      path: '/',
      component: Home,
      meta: {
        title: '首页'
      },
      children: [{
        path: '/index',
        component: index,
        name: "index",
        meta: {
          title: '商品管理'
        }
      }, ]
    },
    {
      path: '/login',
      component: Login,
      meta: {
        title: '登录'
      }
    }
  ]
});