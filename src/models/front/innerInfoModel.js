import { queryInnerList } from '@/services/front/innerService';

const Modal = {
  namespace: 'frontInnerInfo',
  state: {
    data: {
      recordList: [],
      groupCountList: [],
    },
    loading: false,
  },
  effects: {
    *getListData({ payload }, { call, put }) {
      yield put({
        //开启页面加载动画
        type: 'changeLoading',
        payload: true,
      });
      const response = yield call(queryInnerList, payload);
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
  },
  reducers: {
    saveData(state, action) {
      return {
        ...state,
        data: action.payload, //将数据返回给页面
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

export default Modal;
