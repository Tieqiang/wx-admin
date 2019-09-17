import request from '@/utils/request';

export async function queryUserList(params) {
  return request('/api/sys/user', {
    params,
  });
}
export async function getCurrentUser(params) {
  return request('/api/sys/user/get-current-user', {
    params,
  });
}
export async function getUserById(params) {
  return request('/api/sys/user/get-user-by-id', {
    params,
  });
}
export async function addUser(params) {
  return request('/api/sys/user', {
    method: 'POST',
    data: { ...params },
  });
}
export async function queryAllOrgList(params) {
  return request('/api/sys/org', {
    params,
  });
}
export async function queryAllUserList(params) {
  return request('/api/sys/user/get-all-users', {
    params,
  });
}
/**
 *
 * @param {id} params
 */
export async function removeUser(params) {
  return request('/api/sys/user/remove-by-id', {
    method: 'delete',
    params,
  });
}
export async function resetPassword(params) {
  return request('/api/sys/user/rest-pwd', {
    method: 'post',
    params,
  });
}

/**
 * 查询当前用户的关系人
 * @param currentUserId
 * @returns {Promise<void>}
 */
export async function getAssociatedUsers(ids) {
  return request('/api/sys/user/get-associated-users', {
    method: 'get',
    params: {
      ids: ids,
    },
  });
}

/**
 * 查询关系是当前用户的用户
 * @param currentUserId
 * @returns {Promise<void>}
 */
export async function getAssociateUsers(currentUserId) {
  return request('/api/sys/user/get-associate-users', {
    method: 'get',
    params: {
      id: currentUserId,
    },
  });
}
