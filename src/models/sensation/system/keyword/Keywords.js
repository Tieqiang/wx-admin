import {
  queryKeywordsByPage,
  mergeKeyword,
  removeKeyword,
} from '../../../../services/sensation/system/keyword/KeyWords';

const KeywordModel = {
  namespace: 'keywords',
  state: {
    keyWords: {
      records: [],
    },
    currentKeyword: {
      id: '',
      keysName: '',
      synonym: '',
      remark: '',
    },
  },
  effects: {
    getKeys: function*(action, { call, put }) {
      const response = yield call(
        queryKeywordsByPage,
        action.payload.page,
        action.payload.pageSize,
        action.payload.keyName,
      );
      yield put({
        type: 'loadKeywords',
        payload: {
          ...response,
        },
      });
    },
    mergeKeywords: function({ payload }, { call, put }) {
      return mergeKeyword(payload);
    },
    removeKeyWord: function({ payload }, { call }) {
      return removeKeyword(payload.id);
    },
  },
  reducers: {
    loadKeywords: function(state, { payload }) {
      return {
        ...state,
        keyWords: payload,
      };
    },
  },
};

export default KeywordModel;
