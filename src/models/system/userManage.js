import {
  queryUserList,
  addUser,
  getCurrentUser,
  getUserById,
  queryAllOrgList,
  queryAllUserList,
  removeUser,
  resetPassword,
} from '@/services/system/userManage';

const Model = {
  namespace: 'userManage',
  state: {
    userListData: {}, // 数据详情
    loading: true,
    currentUser: '',
    currentUserInfo: {},
    orgAllList: [],
    userAllList: [],
  },
  effects: {
    *userList({ payload }, { call, put }) {
      yield put({
        //开启页面加载动画
        type: 'changeLoading',
        payload: true,
      });
      const response = yield call(queryUserList, payload);
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
    *createUser({ payload, callback }, { call, put }) {
      const response = yield call(addUser, payload);
      yield put({
        type: 'add',
        payload: response,
      });
      if (callback) callback();
    },
    *getUser({ payload, callback }, { call, put }) {
      const response = yield call(getCurrentUser, payload);
      yield put({
        type: 'getCurrentUserInfo',
        payload: response,
      });
      if (callback) callback();
    },
    *getUserInfo({ payload, callback }, { call, put }) {
      const response = yield call(getUserById, payload);
      yield put({
        type: 'getUserOne',
        payload: response,
      });
      if (callback) callback();
    },
    *getAllOrgList({ payload, callback }, { call, put }) {
      const response = yield call(queryAllOrgList, payload);
      yield put({
        type: 'saveOrg',
        payload: response,
      });
      if (callback) callback();
    },
    *getAllUserList({ payload, callback }, { call, put }) {
      const response = yield call(queryAllUserList, payload);
      yield put({
        type: 'saveUser',
        payload: response,
      });
      if (callback) callback();
    },
    removeOneUser: function({ payload }, { call }) {
      return removeUser(payload);
    },
    resetUserPassword: function({ payload }, { call }) {
      return resetPassword(payload);
    },
  },
  reducers: {
    saveData(state, action) {
      return {
        ...state,
        userListData: action.payload, //将数据返回给页面
      };
    },
    changeLoading(state, action) {
      return {
        ...state,
        loading: action.payload,
      };
    },
    getCurrentUserInfo(state, action) {
      return {
        ...state,
        currentUser: action.payload.user.realName,
      };
    },
    getUserOne(state, action) {
      return {
        ...state,
        currentUserInfo: action.payload,
      };
    },
    saveOrg(state, action) {
      return {
        ...state,
        orgAllList: action.payload,
      };
    },
    saveUser(state, action) {
      return {
        ...state,
        userAllList: action.payload,
      };
    },
    add(state, action) {
      return {
        ...state,
      };
    },
  },
};
export default Model;
