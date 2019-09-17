import request from '@/utils/request';

export async function queryPersonalList(params) {
  return request('/api/sensation/search/get-personDb-searchPage', {
    params,
  });
}

export async function queryPersonalDetailById(params) {
  return request('/api/sensation/person-db/get-person-db-by-id', {
    params,
  });
}
