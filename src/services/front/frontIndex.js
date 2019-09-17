import request from '@/utils/request';

export async function queryAllDbCount() {
  return request('/api/sensation/search/get-all-db-count');
}
