import request from '@/utils/request';

export async function queryOrgList(params) {
  return request('/api/sensation/search/get-orgDb-searchPage', {
    params,
  });
}

export async function queryOrgListById(params) {
  return request('/api/sensation/org-db/get-org-db-by-id', {
    params,
  });
}
