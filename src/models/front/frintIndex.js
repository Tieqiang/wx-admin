import { queryAllDbCount } from '@/services/front/frontIndex';

const Modal = {
  namespace: 'frontIndex',
  state: {
    dbCountList: [],
  },
  effects: {
    *getAllDbCount({ payload, callback }, { call, put }) {
      const response = yield call(queryAllDbCount, payload);
      if (callback && typeof callback === 'function') {
        callback(response);
      }
      yield put({
        type: 'saveAllDbCount',
        payload: response,
      });
    },
  },
  reducers: {
    saveAllDbCount(state, action) {
      return {
        ...state,
        dbCountList: action.payload,
      };
    },
  },
};

export default Modal;
