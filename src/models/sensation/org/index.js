// import {
//   queryOrgList,
//   queryOrgTypeList,
//   queryOrgListById,
//   saveOrg,
//   removeOrg,
//   setOrgStatus,
// } from '@/services/sensation/org';
import * as orgService from '@/services/sensation/org/index';
const Modal = {
  namespace: 'organization',
  state: {
    data: {
      records: [],
    },
    loading: false,
    orgTypeList: [],
    currentData: {},
    orgLeaderList: [],
    orgImportantInformationList: [],
    orgContractInfoList: [],
  },
  effects: {
    *getListData({ payload }, { call, put }) {
      yield put({
        //开启页面加载动画
        type: 'changeLoading',
        payload: true,
      });
      const response = yield call(orgService.queryOrgList, payload);
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
    *getOrgTypeList({ payload }, { call, put }) {
      const response = yield call(orgService.queryOrgTypeList, payload);
      yield put({
        type: 'saveOrgTypeList',
        payload: response,
      });
    },
    *getListDataById({ payload, callback }, { call, put }) {
      const response = yield call(orgService.queryOrgListById, payload);
      if (callback && typeof callback === 'function') {
        callback(response);
      }
      yield put({
        type: 'saveCurrentData',
        payload: response,
      });
    },
    *updateOrgInfo({ payload, callback }, { call, put }) {
      const response = yield call(orgService.saveOrg, payload);
      if (callback && typeof callback === 'function') {
        callback(response);
      }
      yield put({
        type: 'update',
        payload: response,
      });
    },
    *removeOneOrg({ payload, callback }, { call, put }) {
      const response = yield call(orgService.removeOrg, payload);
      if (callback && typeof callback === 'function') {
        callback();
      }
      yield put({
        type: 'update',
        payload: response,
      });
      // return removeUser(payload);
    },
    *modifyOrgStatus({ payload, callback }, { call, put }) {
      const response = yield call(orgService.setOrgStatus, payload);
      if (callback && typeof callback === 'function') {
        callback();
      }
      yield put({
        type: 'update',
        payload: response,
      });
    },
    *getOrgLeaderList({ payload, callback }, { call, put }) {
      const response = yield call(orgService.queryAllOrgLeaderList, payload);
      if (callback && typeof callback === 'function') {
        callback();
      }
      yield put({
        type: 'saveOrgLeaderList',
        payload: response,
      });
    },
    *getOrgContractList({ payload, callback }, { call, put }) {
      const response = yield call(orgService.queryAllOrgContractList, payload);
      if (callback && typeof callback === 'function') {
        callback();
      }
      yield put({
        type: 'saveOrgContractList',
        payload: response,
      });
    },
    *getOrgImportantInfoList({ payload, callback }, { call, put }) {
      const response = yield call(orgService.queryAllOrgImportantInfoList, payload);
      if (callback && typeof callback === 'function') {
        callback();
      }
      yield put({
        type: 'saveOrgImportantInfoList',
        payload: response,
      });
    },
    *updateOrgLeader({ payload, callback }, { call, put }) {
      const response = yield call(orgService.saveOrgLeader, payload);
      if (callback && typeof callback === 'function') {
        callback(response);
      }
      yield put({
        type: 'update',
        payload: response,
      });
    },
    *updateOrgContract({ payload, callback }, { call, put }) {
      const response = yield call(orgService.saveOrgContract, payload);
      if (callback && typeof callback === 'function') {
        callback(response);
      }
      yield put({
        type: 'update',
        payload: response,
      });
    },
    *updateOrgImportantInfo({ payload, callback }, { call, put }) {
      const response = yield call(orgService.saveOrgImportantInfo, payload);
      if (callback && typeof callback === 'function') {
        callback(response);
      }
      yield put({
        type: 'update',
        payload: response,
      });
    },
    *deleteOneOrgLeader({ payload, callback }, { call, put }) {
      const response = yield call(orgService.removeOneOrgLeader, payload);
      if (callback && typeof callback === 'function') {
        callback();
      }
      yield put({
        type: 'update',
        payload: response,
      });
    },
    *deleteOneOrgContract({ payload, callback }, { call, put }) {
      const response = yield call(orgService.removeOneOrgContract, payload);
      if (callback && typeof callback === 'function') {
        callback();
      }
      yield put({
        type: 'update',
        payload: response,
      });
    },
    *deleteOneOrgImportantInfo({ payload, callback }, { call, put }) {
      const response = yield call(orgService.removeOneOrgImportantInfo, payload);
      if (callback && typeof callback === 'function') {
        callback();
      }
      yield put({
        type: 'update',
        payload: response,
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
    saveOrgTypeList(state, action) {
      return {
        ...state,
        orgTypeList: action.payload, //将数据返回给页面
      };
    },
    saveCurrentData(state, action) {
      return {
        ...state,
        currentData: action.payload, //将数据返回给页面
      };
    },
    update(state, action) {
      return {
        ...state,
      };
    },
    changeLoading(state, action) {
      return {
        ...state,
        loading: action.payload,
      };
    },
    saveOrgLeaderList(state, action) {
      return {
        ...state,
        orgLeaderList: action.payload, //将数据返回给页面
      };
    },
    saveOrgContractList(state, action) {
      return {
        ...state,
        orgContractInfoList: action.payload, //将数据返回给页面
      };
    },
    saveOrgImportantInfoList(state, action) {
      return {
        ...state,
        orgImportantInformationList: action.payload, //将数据返回给页面
      };
    },
  },
};

export default Modal;
