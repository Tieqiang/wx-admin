import DocumentService from '@/services/sensation/document/';

export default {
  namespace: 'document',
  state: {
    documentType: [],
    documentPage: {
      records: [],
    },
  },
  effects: {
    loadDocumentType: function*({ payload }, { call, put }) {
      let response = yield call(DocumentService.loadDocumentType);
      yield put({
        type: 'setDocumentType',
        payload: response,
      });
    },
    loadDocumentPages: function*({ payload }, { call, put }) {
      let response = yield call(
        DocumentService.loadDocumentPages,
        payload.title,
        payload.source,
        payload.author,
        payload.status,
        payload.dbType,
        payload.startTime,
        payload.endTime,
        payload.page ? payload.page : 1,
        payload.pageSize ? payload.pageSize : 10,
      );
      yield put({
        type: 'setDocumentPage',
        payload: response,
      });
    },
    *saveDocumentDb({ payload }, { call }) {
      let response = yield call(DocumentService.saveDocumentDb, payload);
      return response;
    },
    *updateDocumentDb({ payload }, { call }) {
      return yield call(DocumentService.updateDocumentDb, payload.id, payload.status);
    },
  },
  reducers: {
    setDocumentType: function(state, { payload }) {
      return {
        ...state,
        documentType: payload,
      };
    },
    setDocumentPage: function(state, { payload }) {
      return {
        ...state,
        documentPage: payload,
      };
    },
  },
};
