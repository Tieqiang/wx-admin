import { getMyContract, getObjectContractList } from '@/services/front/contract';

export default {
  namespace: 'frontContractModel',
  state: {
    //我的接洽列表
    myContract: {
      records: [],
    },
    //被接洽对象的接洽列表
    objectContract: {
      records: [],
    },
  },
  effects: {
    *loadMyContracts({ payload }, { call, put }) {
      let response = yield call(
        getMyContract,
        payload.contractObjectName,
        payload.page,
        payload.pageSize,
      );
      yield put({
        type: 'setMyContracts',
        payload: response,
      });
    },
    *loadObjectContracts({ payload }, { call, put }) {
      let response = yield call(
        getObjectContractList,
        payload.contractObjectId,
        payload.contractObjectName,
        payload.contractOur,
        payload.contractThires,
        payload.page,
        payload.pageSize,
      );
      yield put({
        type: 'setObjectContracts',
        payload: response,
      });
    },
  },
  reducers: {
    setMyContracts(state, { payload }) {
      return {
        ...state,
        myContract: payload,
      };
    },
    setObjectContracts(state, { payload }) {
      return {
        ...state,
        objectContract: payload,
      };
    },
  },
};
