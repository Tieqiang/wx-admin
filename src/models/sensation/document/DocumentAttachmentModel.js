import DocumentAttachmentService from '@/services/sensation/document/DocumentAttachmentService';

const DocumentAttachModel = {
  namespace: 'documentAttachModel',
  state: {
    documentAttachments: [],
  },
  effects: {
    *loadDocumentAttachments({ payload }, { call, put }) {
      let response = yield call(
        DocumentAttachmentService.loadDocumentAttachments,
        payload.documentId,
      );
      yield put({
        type: 'setDocumentAttachments',
        payload: response,
      });
    },
  },
  reducers: {
    setDocumentAttachments(state, { payload }) {
      return {
        ...state,
        documentAttachments: payload,
      };
    },
  },
};
export default DocumentAttachModel;
