import request from '@/utils/request';

const BASE_URL = '/api/sensation/document-db';
const DocumentService = {
  loadDocumentType: async function() {
    return request('/api/sensation/document-db-type/getAllDocumentDbType');
  },
  loadDocumentPages: async function(
    title = '',
    source = '',
    author = '',
    status = '',
    dbType = '',
    startTime = '',
    endTime = '',
    page = 0,
    pageSize = 20,
  ) {
    return request(BASE_URL + '/getDocumentDbPage', {
      method: 'get',
      params: {
        title: title,
        source: source,
        author: author,
        status: status,
        dbType: dbType,
        startTime: startTime,
        endTime: endTime,
        page: page,
        pageSize: pageSize,
      },
    });
  },
  saveDocumentDb: async function(documentVo) {
    return request(BASE_URL, { method: 'post', data: documentVo });
  },
  /**
   * 修改状态
   * @param id
   * @param status
   * @returns {Promise<void>}
   */
  updateDocumentDb: async function(id, status) {
    return request(BASE_URL + '/update-status', {
      method: 'post',
      params: { id: id, status: status },
    });
  },
};

export default DocumentService;
