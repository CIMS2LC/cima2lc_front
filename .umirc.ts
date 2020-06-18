import { defineConfig } from 'umi';
export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
    exclude: [],
  },
  //layout: {},
  dva: {},
  routes: [
    {
      name: '登录页',
      path: 'user/userlogin',
      component: './User/UserLogin',
    },
    {
      name: '查询表格',
      path: 'list/fuv_list',
      component: './List/FUVList',
    },
    {
      path: '/',
      component: '@/pages/index',
    },
  ],
});
