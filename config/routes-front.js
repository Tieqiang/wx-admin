const frontRoutes = [
  // user
  {
    path: '/',
    component: '../layouts/BlankLayout',
    Routes: ['src/pages/front/FrontAuthorized'],
    // redirect: '/index',
    routes: [
      {
        path: '/',
        name: '首页',
        needLogin: false,
        component: './front/index',
      },
      {
        path: '/searchDoumentIndex',
        name: '文献资讯',
        needLogin: false,
        component: './front/searchMain/document/searchIndex',
      },
      {
        path: '/searchPersonIndex',
        name: '人员信息',
        needLogin: true,
        component: './front/searchMain/personal/searchIndex',
      },
      {
        path: '/searchOrgIndex',
        name: '机构信息',
        needLogin: true,
        component: './front/searchMain/org/searchIndex',
      },
      {
        path: '/searchEnterpriseIndex',
        name: '企业信息',
        needLogin: true,
        component: './front/searchMain/enterprise/searchIndex',
      },
      {
        path: '/searchInnerIndex',
        name: '内部信息',
        needLogin: true,
        component: './front/searchMain/inner/searchIndex',
      },
      {
        path: '/document',
        name: '文献资讯',
        needLogin: false,
        component: './front/searchMain/document',
      },
      {
        path: '/documentDetail',
        name: '文献资讯',
        needLogin: false,
        component: './front/searchMain/document/detailPage',
      },
      {
        path: '/personal',
        name: '人员信息',
        needLogin: true,
        component: './front/searchMain/personal',
      },
      {
        path: '/personalDetail',
        name: '人员信息',
        needLogin: true,
        component: './front/searchMain/personal/detailPage',
      },
      {
        path: '/org',
        name: '机构信息',
        needLogin: true,
        component: './front/searchMain/org',
      },
      {
        path: '/orgDetail',
        name: '机构信息',
        needLogin: true,
        component: './front/searchMain/org/detailPage',
      },
      {
        path: '/enterprise',
        name: '企业信息',
        needLogin: true,
        component: './front/searchMain/enterprise',
      },
      {
        path: '/enterpriseDetail',
        name: '企业信息',
        needLogin: true,
        component: './front/searchMain/enterprise/detailPage',
      },
      {
        path: '/inner',
        name: '内部信息',
        needLogin: true,
        component: './front/searchMain/inner',
      },
      {
        path: '/innerDetail',
        name: '内部信息',
        needLogin: true,
        component: './front/searchMain/inner/detailPage',
      },
      {
        path: 'usercenter',
        name: '个人中心',
        needLogin: true,
        component: './front/userCenter',
      },
      {
        path: '/contract',
        name: '接洽列表',
        needLogin: true,
        component: './front/searchMain/contract',
      },
    ],
  },
  {
    component: './404',
  },
];
export default frontRoutes;
