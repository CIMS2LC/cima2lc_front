import { defineConfig } from 'umi';
export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
    exclude: [],
  },
  layout: {},
  dva: {},
  routes: [
    {
      name: '登录页',
      path: 'user/userlogin',
      component: './User/UserLogin',
    },
    {
      path: '/',
      component: '@/pages/index',
    },
  ],
});
