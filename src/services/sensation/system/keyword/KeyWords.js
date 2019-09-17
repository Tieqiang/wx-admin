import request from '@/utils/request';

// export async
const base_url = '/api/sensation/keywords';

/**
 * 查询返回的关键字
 * @param page
 * @param pageSize
 * @param keywords
 * @returns {Promise<void>}
 */
export async function queryKeywordsByPage(page = 0, pageSize = 10, keywords) {
  return request(base_url, {
    params: {
      page: page,
      pageSize: pageSize,
      keysName: keywords,
    },
  });
}

/**
 * 保存修改关键词
 * @param keyword
 * @returns {Promise<void>}
 */
export async function mergeKeyword(keyword) {
  return request(base_url, {
    method: 'post',
    data: keyword,
  });
}

/**
 * 删除 对象
 * @param id
 * @returns {Promise<void>}
 */
export async function removeKeyword(id) {
  return request(base_url + '/remove-by-id', {
    method: 'delete',
    params: {
      id: id,
    },
  });
}
