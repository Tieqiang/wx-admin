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
  
  app.model({ namespace: 'contract', ...(require('/home/zhaotq/WebstormProjects/wx-admin/src/models/front/contract.js').default) });
app.model({ namespace: 'documentModel', ...(require('/home/zhaotq/WebstormProjects/wx-admin/src/models/front/documentModel.js').default) });
app.model({ namespace: 'enterpriseModel', ...(require('/home/zhaotq/WebstormProjects/wx-admin/src/models/front/enterpriseModel.js').default) });
app.model({ namespace: 'frintIndex', ...(require('/home/zhaotq/WebstormProjects/wx-admin/src/models/front/frintIndex.js').default) });
app.model({ namespace: 'innerInfoModel', ...(require('/home/zhaotq/WebstormProjects/wx-admin/src/models/front/innerInfoModel.js').default) });
app.model({ namespace: 'MyCollectionModel', ...(require('/home/zhaotq/WebstormProjects/wx-admin/src/models/front/MyCollectionModel.js').default) });
app.model({ namespace: 'orgModel', ...(require('/home/zhaotq/WebstormProjects/wx-admin/src/models/front/orgModel.js').default) });
app.model({ namespace: 'personalModel', ...(require('/home/zhaotq/WebstormProjects/wx-admin/src/models/front/personalModel.js').default) });
app.model({ namespace: 'global', ...(require('/home/zhaotq/WebstormProjects/wx-admin/src/models/global.js').default) });
app.model({ namespace: 'login', ...(require('/home/zhaotq/WebstormProjects/wx-admin/src/models/login.js').default) });
app.model({ namespace: 'LoginMessage', ...(require('/home/zhaotq/WebstormProjects/wx-admin/src/models/LoginMessage.js').default) });
app.model({ namespace: 'product', ...(require('/home/zhaotq/WebstormProjects/wx-admin/src/models/product.js').default) });
app.model({ namespace: 'CurrentModel', ...(require('/home/zhaotq/WebstormProjects/wx-admin/src/models/sensation/document/CurrentModel.js').default) });
app.model({ namespace: 'DocumentAttachmentModel', ...(require('/home/zhaotq/WebstormProjects/wx-admin/src/models/sensation/document/DocumentAttachmentModel.js').default) });
app.model({ namespace: 'index', ...(require('/home/zhaotq/WebstormProjects/wx-admin/src/models/sensation/document/index.js').default) });
app.model({ namespace: 'index', ...(require('/home/zhaotq/WebstormProjects/wx-admin/src/models/sensation/Enterprise/index.js').default) });
app.model({ namespace: 'index', ...(require('/home/zhaotq/WebstormProjects/wx-admin/src/models/sensation/org/index.js').default) });
app.model({ namespace: 'index', ...(require('/home/zhaotq/WebstormProjects/wx-admin/src/models/sensation/personnel/index.js').default) });
app.model({ namespace: 'index', ...(require('/home/zhaotq/WebstormProjects/wx-admin/src/models/sensation/resource/index.js').default) });
app.model({ namespace: 'Keywords', ...(require('/home/zhaotq/WebstormProjects/wx-admin/src/models/sensation/system/keyword/Keywords.js').default) });
app.model({ namespace: 'index', ...(require('/home/zhaotq/WebstormProjects/wx-admin/src/models/sensation/system/menu/index.js').default) });
app.model({ namespace: 'SubjectModel', ...(require('/home/zhaotq/WebstormProjects/wx-admin/src/models/sensation/system/subject/SubjectModel.js').default) });
app.model({ namespace: 'setting', ...(require('/home/zhaotq/WebstormProjects/wx-admin/src/models/setting.js').default) });
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
