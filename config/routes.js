const routes = [
  // user
  {
    path: '/user/login',
    component: '../layouts/webLayout',
    routes: [
      {
        path: '/user/login',
        name: 'login',
        component: './user/login',
      },
    ],
  },
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    routes: [
      {
        name:"patAdmit",
        path:"/pat-admit",
        icon:"edit",
        component:'./pat/AdmitIndex'
      },
      {
        name:"followEvent",
        path:"/followEvent",
        icon:"plus",
        component:"./follow/event"
      },
      {
        path: '/system',
        name: 'system',
        icon: 'setting',
        authority: ['xtgl'],
        // component: './system/user',
        routes: [
          {
            name: 'user',
            path: './user',
            authority: ['yhgl'],
            component: './system/user',
          },
          {
            name: 'role',
            path: './role',
            authority: ['jsgl'],
            component: './system/role',
          },
          {
            name: 'organization',
            path: './organization',
            authority: ['gjcgl'],
            component: './system/organization',
          },
          {
            name:"dictManage",
            path:"./dict-manage",
            // authority:['dictManage'],
            component:"./system/dictManage"
          }
        ],
      },
      {
        name: '500',
        path: '/500',
        hideInMenu: true,
        component: './500',
      },
      {
        component: './404',
      },
    ],
  },
  {
    component: './404',
  },
];
export default routes;
