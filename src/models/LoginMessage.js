//用于传递登陆消息的model

const loginMessage = {
  namespace: 'loginMessage',
  state: {
    clickLogin: false,
  },
  effects: {
    *setShowFrontLoginModal({ payload }, { put }) {
      yield put({
        type: 'changeClickLogin',
        payload: payload,
      });
    },
  },
  reducers: {
    changeClickLogin(state, { payload }) {
      return {
        ...state,
        clickLogin: payload,
      };
    },
  },
};

export default loginMessage;
