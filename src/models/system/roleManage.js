import {
  queryRoleList,
  queryAllRole,
  getSingleRole,
  addRole,
  removeSingleRole,
} from '@/services/system/roleService';

const Model = {
  namespace: 'roleManage',
  state: {
    data: {}, // 数据详情
    loading: true,
    roleList: [],
    singleRole: {}, //单个角色维护
  },
  effects: {
    *getRoleList({ payload }, { call, put }) {
      yield put({
        //开启页面加载动画
        type: 'changeLoading',
        payload: true,
      });
      const response = yield call(queryRoleList, payload);
      yield put({
        type: 'saveData',
        payload: response,
      });
      yield put({
        //结束页面加载动画
        type: 'changeLoading',
        payload: false,
      });
    },
    *getAllRole({ payload, callback }, { call, put }) {
      const response = yield call(queryAllRole, payload);
      yield put({
        type: 'getRole',
        payload: response,
      });
      if (callback) callback();
    },
    *getSingleRole({ payload }, { call, put }) {
      let response = yield call(getSingleRole, payload.roleId);
      yield put({
        type: 'setSingleRole',
        payload: response,
      });
    },
    *addRole({ payload }, { call }) {
      let response = yield call(addRole, payload);
      return response;
    },
    removeSingleRole: function({ payload }, { call }) {
      return removeSingleRole(payload);
    },
    *resetSingleRole({ payload }, { put }) {
      yield put({
        type: 'setSingleRole',
        payload: payload,
      });
    },
  },
  reducers: {
    saveData(state, action) {
      return {
        ...state,
        data: action.payload, //将数据返回给页面
      };
    },
    getRole(state, action) {
      return {
        ...state,
        roleList: action.payload, //将数据返回给页面
      };
    },
    changeLoading(state, action) {
      return {
        ...state,
        loading: action.payload,
      };
    },
    setSingleRole(state, { payload }) {
      return {
        ...state,
        singleRole: payload,
      };
    },
  },
};
export default Model;
