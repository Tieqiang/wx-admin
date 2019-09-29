import dva from 'dva';
import { Component } from 'react';
import createLoading from 'dva-loading';
import history from '@tmp/history';

let app = null;

export function _onCreate() {
  const plugins = require('umi/_runtimePlugin');
  const runtimeDva = plugins.mergeConfig('dva');
  app = dva({
    history,
    
    ...(runtimeDva.config || {}),
    ...(window.g_useSSR ? { initialState: window.g_initialData } : {}),
  });
  
  app.use(createLoading());
  (runtimeDva.plugins || []).forEach(plugin => {
    app.use(plugin);
  });
  
  app.model({ namespace: 'global', ...(require('/home/zhaotq/WebstormProjects/wx-admin/src/models/global.js').default) });
app.model({ namespace: 'login', ...(require('/home/zhaotq/WebstormProjects/wx-admin/src/models/login.js').default) });
app.model({ namespace: 'LoginMessage', ...(require('/home/zhaotq/WebstormProjects/wx-admin/src/models/LoginMessage.js').default) });
app.model({ namespace: 'product', ...(require('/home/zhaotq/WebstormProjects/wx-admin/src/models/product.js').default) });
app.model({ namespace: 'setting', ...(require('/home/zhaotq/WebstormProjects/wx-admin/src/models/setting.js').default) });
app.model({ namespace: 'dictModel', ...(require('/home/zhaotq/WebstormProjects/wx-admin/src/models/system/dictModel.js').default) });
app.model({ namespace: 'moduleManage', ...(require('/home/zhaotq/WebstormProjects/wx-admin/src/models/system/moduleManage.js').default) });
app.model({ namespace: 'Org', ...(require('/home/zhaotq/WebstormProjects/wx-admin/src/models/system/Org.js').default) });
app.model({ namespace: 'orgaManage', ...(require('/home/zhaotq/WebstormProjects/wx-admin/src/models/system/orgaManage.js').default) });
app.model({ namespace: 'roleManage', ...(require('/home/zhaotq/WebstormProjects/wx-admin/src/models/system/roleManage.js').default) });
app.model({ namespace: 'userManage', ...(require('/home/zhaotq/WebstormProjects/wx-admin/src/models/system/userManage.js').default) });
app.model({ namespace: 'user', ...(require('/home/zhaotq/WebstormProjects/wx-admin/src/models/user.js').default) });
  return app;
}

export function getApp() {
  return app;
}

export class _DvaContainer extends Component {
  render() {
    const app = getApp();
    app.router(() => this.props.children);
    return app.start()();
  }
}
