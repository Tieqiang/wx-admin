import request from '@/utils/request';

export async function queryInnerList(params) {
  return request('/api/sensation/search/get-innerInformationDb-searchPage', {
    params,
  });
}
