import request from '@/utils/request';

const base_url = 'api/sensation/user-collection';

/**
 * 查询我的收藏
 * @param objectName
 * @param page
 * @param pageSize
 * @returns {Promise<void>}
 */
export async function getMyCollection(objectName, page = 1, pageSize = 10) {
  return request(base_url, {
    method: 'get',
    params: {
      objectName: objectName,
      page: page,
      pageSize: pageSize,
    },
  });
}

/**
 * 添加收藏
 * @param collectionObject
 * @returns {Promise<void>}
 */
export async function addCollection(collectionObject) {
  return request(base_url, { method: 'post', data: collectionObject });
}

/**
 * 取消收藏
 * @param collectionObjectId 被收藏对象的ID,企业、文献等收ID
 * @returns {Promise<void>}
 */
export async function removeCollection(collectionObjectId) {
  console.log(collectionObjectId);
  return request(base_url, {
    method: 'delete',
    params: { collectionObjectId: collectionObjectId },
  });
}

/**判断是否收藏 */

export async function getCollectionFlag(collectionObjectId) {
  return request('/api/sensation/user-collection/if-in-collections', {
    method: 'get',
    params: {
      collectionObjectId: collectionObjectId,
    },
  });
}
