import {
  querydocumentList,
  queryDocumentDetailById,
  queryoDocumentDbAttachmentById,
} from '@/services/front/documentService';

const Modal = {
  namespace: 'frontDocument',
  state: {
    data: {
      recordList: [],
      groupCountList: [],
    },
    loading: false,
    currentData: {},
    attachmentList: [],
  },
  effects: {
    *getListData({ payload }, { call, put }) {
      yield put({
        //开启页面加载动画
        type: 'changeLoading',
        payload: true,
      });
      const response = yield call(querydocumentList, payload);
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
    *getListDataById({ payload, callback }, { call, put }) {
      const response = yield call(queryDocumentDetailById, payload);
      if (callback && typeof callback === 'function') {
        callback(response);
      }
      yield put({
        type: 'saveCurrentData',
        payload: response,
      });
    },
    *getAttachmentById({ payload, callback }, { call, put }) {
      const response = yield call(queryoDocumentDbAttachmentById, payload);
      if (callback && typeof callback === 'function') {
        callback(response);
      }
      yield put({
        type: 'saveAttachmentData',
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
    changeLoading(state, action) {
      return {
        ...state,
        loading: action.payload,
      };
    },
    saveCurrentData(state, action) {
      return {
        ...state,
        currentData: action.payload, //将数据返回给页面
      };
    },
    saveAttachmentData(state, action) {
      return {
        ...state,
        attachmentList: action.payload, //将数据返回给页面
      };
    },
  },
};

export default Modal;
