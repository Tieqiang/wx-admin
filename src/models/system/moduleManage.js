import { queryModuleList, addModule, removeModule } from '@/services/system/moduleService';

const Model = {
  namespace: 'moduleManage',
  state: {
    data: {}, // 数据详情
    loading: true,
    moduleAllList: [],
  },
  effects: {
    *moduleList({ payload }, { call, put }) {
      yield put({
        //开启页面加载动画
        type: 'changeLoading',
        payload: true,
      });
      const response = yield call(queryModuleList, payload);
      yield put({
        type: 'saveModule',
        payload: response,
      });
      yield put({
        //结束页面加载动画
        type: 'changeLoading',
        payload: false,
      });
    },
    *addModule({ payload }, { call }) {
      let response = yield call(addModule, payload);
      return response;
    },
    removeModule: function({ payload }, { call }) {
      return removeModule(payload);
    },
  },
  reducers: {
    saveModule(state, action) {
      return {
        ...state,
        moduleAllList: action.payload, //将数据返回给页面
      };
    },
    changeLoading(state, action) {
      return {
        ...state,
        loading: action.payload,
      };
    },
  },
};
export default Model;
