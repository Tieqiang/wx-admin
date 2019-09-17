import request from '@/utils/request';

export async function querydocumentList(params) {
  return request('/api/sensation/search/get-documentDb-searchPage', {
    params,
  });
}
export async function queryDocumentDetailById(params) {
  return request('/api/sensation/document-db', {
    params,
  });
}
export async function queryoDocumentDbAttachmentById(params) {
  return request('/api/sensation/document-db/getDocumentDbAttachment', {
    params,
  });
}
