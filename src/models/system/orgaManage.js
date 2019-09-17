import { queryAllOrg, addOrg, removeOrg } from '@/services/system/orgaService';

const Model = {
  namespace: 'orgaManage',
  state: {
    data: {}, // 数据详情
    loading: true,
    orgAllList: [],
  },
  effects: {
    *getAllOrg({ payload, callback }, { call, put }) {
      const response = yield call(queryAllOrg, payload);
      yield put({
        type: 'saveOrg',
        payload: response,
      });
      if (callback) callback();
    },
    *addOrg({ payload }, { call }) {
      let response = yield call(addOrg, payload);
      return response;
    },
    removeOrg: function({ payload }, { call }) {
      return removeOrg(payload);
    },
  },
  reducers: {
    loadOrgs: function(state, { payload }) {
      return {
        ...state,
        orgs: payload,
      };
    },
    saveOrg(state, action) {
      return {
        ...state,
        orgAllList: action.payload, //将数据返回给页面
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
