import request from '@/utils/request';

export async function queryEnterpriseList(params) {
  return request('/api/sensation/search/get-companyDb-searchPage', {
    params,
  });
}
export async function queryEnterpriseListById(params) {
  return request('/api/sensation/company-db/get-company-db-by-id', {
    params,
  });
}
