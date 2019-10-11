import React from 'react';
import { Router as DefaultRouter, Route, Switch } from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/lib/renderRoutes';
import history from '@tmp/history';
import RendererWrapper0 from '/home/zhaotq/WebstormProjects/wx-admin/src/pages/.umi/LocaleWrapper.jsx';
import _dvaDynamic from 'dva/dynamic';

const Router = require('dva/router').routerRedux.ConnectedRouter;

const routes = [
  {
    path: '/user/login',
    component: __IS_BROWSER
      ? _dvaDynamic({
          component: () =>
            import(/* webpackChunkName: "layouts__webLayout" */ '../../layouts/webLayout'),
          LoadingComponent: require('/home/zhaotq/WebstormProjects/wx-admin/src/components/PageLoading/index')
            .default,
        })
      : require('../../layouts/webLayout').default,
    routes: [
      {
        path: '/user/login',
        name: 'login',
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__user__login" */ '../user/login'),
              LoadingComponent: require('/home/zhaotq/WebstormProjects/wx-admin/src/components/PageLoading/index')
                .default,
            })
          : require('../user/login').default,
        exact: true,
      },
      {
        component: () =>
          React.createElement(
            require('/home/zhaotq/WebstormProjects/wx-admin/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
              .default,
            { pagesPath: 'src/pages', hasRoutesInConfig: true },
          ),
      },
    ],
  },
  {
    path: '/',
    component: __IS_BROWSER
      ? _dvaDynamic({
          component: () =>
            import(/* webpackChunkName: "layouts__BasicLayout" */ '../../layouts/BasicLayout'),
          LoadingComponent: require('/home/zhaotq/WebstormProjects/wx-admin/src/components/PageLoading/index')
            .default,
        })
      : require('../../layouts/BasicLayout').default,
    Routes: [require('../Authorized').default],
    routes: [
      {
        name: 'patAdmit',
        path: '/pat-admit',
        icon: 'edit',
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__pat__AdmitIndex" */ '../pat/AdmitIndex'),
              LoadingComponent: require('/home/zhaotq/WebstormProjects/wx-admin/src/components/PageLoading/index')
                .default,
            })
          : require('../pat/AdmitIndex').default,
        exact: true,
      },
      {
        name: 'followEvent',
        path: '/followEvent',
        icon: 'plus',
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__follow__event" */ '../follow/event'),
              LoadingComponent: require('/home/zhaotq/WebstormProjects/wx-admin/src/components/PageLoading/index')
                .default,
            })
          : require('../follow/event').default,
        exact: true,
      },
      {
        path: '/system',
        name: 'system',
        icon: 'setting',
        authority: ['xtgl'],
        routes: [
          {
            name: 'user',
            path: '/system/user',
            authority: ['yhgl'],
            component: __IS_BROWSER
              ? _dvaDynamic({
                  component: () =>
                    import(/* webpackChunkName: "p__system__user" */ '../system/user'),
                  LoadingComponent: require('/home/zhaotq/WebstormProjects/wx-admin/src/components/PageLoading/index')
                    .default,
                })
              : require('../system/user').default,
            exact: true,
          },
          {
            name: 'role',
            path: '/system/role',
            authority: ['jsgl'],
            component: __IS_BROWSER
              ? _dvaDynamic({
                  component: () =>
                    import(/* webpackChunkName: "p__system__role" */ '../system/role'),
                  LoadingComponent: require('/home/zhaotq/WebstormProjects/wx-admin/src/components/PageLoading/index')
                    .default,
                })
              : require('../system/role').default,
            exact: true,
          },
          {
            name: 'organization',
            path: '/system/organization',
            authority: ['gjcgl'],
            component: __IS_BROWSER
              ? _dvaDynamic({
                  component: () =>
                    import(/* webpackChunkName: "p__system__organization" */ '../system/organization'),
                  LoadingComponent: require('/home/zhaotq/WebstormProjects/wx-admin/src/components/PageLoading/index')
                    .default,
                })
              : require('../system/organization').default,
            exact: true,
          },
          {
            name: 'dictManage',
            path: '/system/dict-manage',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  component: () =>
                    import(/* webpackChunkName: "p__system__dictManage" */ '../system/dictManage'),
                  LoadingComponent: require('/home/zhaotq/WebstormProjects/wx-admin/src/components/PageLoading/index')
                    .default,
                })
              : require('../system/dictManage').default,
            exact: true,
          },
          {
            component: () =>
              React.createElement(
                require('/home/zhaotq/WebstormProjects/wx-admin/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                  .default,
                { pagesPath: 'src/pages', hasRoutesInConfig: true },
              ),
          },
        ],
      },
      {
        name: '500',
        path: '/500',
        hideInMenu: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__500" */ '../500'),
              LoadingComponent: require('/home/zhaotq/WebstormProjects/wx-admin/src/components/PageLoading/index')
                .default,
            })
          : require('../500').default,
        exact: true,
      },
      {
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__404" */ '../404'),
              LoadingComponent: require('/home/zhaotq/WebstormProjects/wx-admin/src/components/PageLoading/index')
                .default,
            })
          : require('../404').default,
        exact: true,
      },
      {
        component: () =>
          React.createElement(
            require('/home/zhaotq/WebstormProjects/wx-admin/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
              .default,
            { pagesPath: 'src/pages', hasRoutesInConfig: true },
          ),
      },
    ],
  },
  {
    component: __IS_BROWSER
      ? _dvaDynamic({
          component: () => import(/* webpackChunkName: "p__404" */ '../404'),
          LoadingComponent: require('/home/zhaotq/WebstormProjects/wx-admin/src/components/PageLoading/index')
            .default,
        })
      : require('../404').default,
    exact: true,
  },
  {
    component: () =>
      React.createElement(
        require('/home/zhaotq/WebstormProjects/wx-admin/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
          .default,
        { pagesPath: 'src/pages', hasRoutesInConfig: true },
      ),
  },
];
window.g_routes = routes;
const plugins = require('umi/_runtimePlugin');
plugins.applyForEach('patchRoutes', { initialValue: routes });

export { routes };

export default class RouterWrapper extends React.Component {
  unListen = () => {};

  constructor(props) {
    super(props);

    // route change handler
    function routeChangeHandler(location, action) {
      plugins.applyForEach('onRouteChange', {
        initialValue: {
          routes,
          location,
          action,
        },
      });
    }
    this.unListen = history.listen(routeChangeHandler);
    routeChangeHandler(history.location);
  }

  componentWillUnmount() {
    this.unListen();
  }

  render() {
    const props = this.props || {};
    return (
      <RendererWrapper0>
        <Router history={history}>{renderRoutes(routes, props)}</Router>
      </RendererWrapper0>
    );
  }
}
