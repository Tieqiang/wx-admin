import {
  getMyCollection,
  addCollection,
  removeCollection,
  getCollectionFlag,
} from '@/services/front/collectionService';

export default {
  state: {
    collectionData: {
      records: [],
    },
    collectedFlag: false,
  },
  namespace: 'myCollectionModel',
  effects: {
    *loadMyCollections({ payload }, { call, put }) {
      let response = yield call(
        getMyCollection,
        payload.objectName,
        payload.page,
        payload.pageSize,
      );
      yield put({
        type: 'setCollectionData',
        payload: response,
      });
    },
    *addCollection({ payload }, { call }) {
      return yield call(addCollection, payload);
    },
    *removeCollection({ payload }, { call }) {
      return yield call(removeCollection, payload.collectionObjectId);
    },
    *getCollectedFlag({ payload, callback }, { call, put }) {
      let response = yield call(getCollectionFlag, payload.collectionObjectId);
      if (callback && typeof callback === 'function') {
        callback(response);
      }
      yield put({
        type: 'setCollectedFlag',
        payload: response,
      });
    },
  },
  reducers: {
    setCollectionData(state, { payload }) {
      return {
        ...state,
        collectionData: payload,
      };
    },
    setCollectedFlag(state, { payload }) {
      return {
        ...state,
        collectedFlag: payload,
      };
    },
  },
};
