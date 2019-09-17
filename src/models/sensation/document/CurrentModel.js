export default {
  namespace: 'currentDocumentModel',
  state: {
    currentDocumentDb: {},
  },
  effects: {
    *setCurrentDocumentDb({ payload }, { put }) {
      yield put({
        type: 'setCurrentDb',
        payload: payload,
      });
    },
  },
  reducers: {
    setCurrentDb(state, { payload }) {
      return {
        ...state,
        currentDocumentDb: payload,
      };
    },
  },
};
