import { parse, stringify } from 'qs';
import { routerRedux } from 'dva/router';

import router from 'umi/router';

import { loginToServer, logout } from '../services/user';
import { removeToken } from '@/utils/token';
import { removeAuthority } from '@/utils/authority';
import defaultSetting from '../../config/defaultSettings';
export function getPageQuery() {
  return parse(window.location.href.split('?')[1]);
}

const Model = {
  namespace: 'login',
  state: {
    token: '',
  },
  effects: {
    *logout(_, { call, put }) {
      let response = yield call(logout);
      const { redirect } = getPageQuery(); // redirect
      if (window.location.pathname !== '/user/login' && !redirect && response.resCode === '0') {
        removeToken();
        removeAuthority();
        if (defaultSetting.adminFlag) {
          location.reload('/user/login');
        } else {
          location.reload('/');
        }
      } else {
        console.log(response.resDescription);
      }
    },
    *login(action, { call, put }) {
      const response = yield call(
        loginToServer,
        action.payload.username,
        action.payload.password,
        action.payload.imageCode,
      );
      yield put({
        type: 'changeLoginStatus',
        payload: {
          ...response,
        },
      });
      return response;
    },
    *resetLoginToken(_, { put }) {
      yield put({
        type: 'resetToken',
        payload: {},
      });
    },
  },
  reducers: {
    changeLoginStatus(state, { payload }) {
      return { ...state, ...payload.data, token: payload.response.headers.get('authorization') };
    },
    resetToken(state, { payload }) {
      return {
        ...state,
        token: '',
      };
    },
  },
};
export default Model;
