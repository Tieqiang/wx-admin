import request from '@/utils/request';

const BASE_URL = '/api/sensation/document-db';

export default {
  loadDocumentAttachments: async function(documentId) {
    return request(BASE_URL + '/getDocumentDbAttachment', {
      method: 'get',
      params: {
        documentId: documentId,
      },
    });
  },
};
