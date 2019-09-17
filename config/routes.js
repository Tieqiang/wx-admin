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
            name: 'subject',
            path: './subject',
            authority: ['ztflgl'],
            component: './system/subject',
          },
          {
            name: 'keyword',
            path: './keyword',
            authority: ['gjcgl'],
            component: './system/keyword',
          },
          {
            name: 'organization',
            path: './organization',
            authority: ['gjcgl'],
            component: './system/organization',
          },
          {
            name: 'module',
            path: './module',
            authority: ['gjcgl'],
            component: './system/module',
          },
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
