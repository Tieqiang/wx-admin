import request from '@/utils/request';

export async function queryAllOrg(params) {
  return request('/api/sys/org', {
    params,
  });
}

export async function addOrg(params) {
  return request('/api/sys/org', {
    method: 'POST',
    data: { ...params },
  });
}

//删除机构
export async function removeOrg(id) {
  return request('/api/sys/org/remove-org-by-id', {
    method: 'delete',
    params: {
      id: id,
    },
  });
}

/**
 * 获取机构所属的单位信息
 * @param orgId
 * @returns {Promise<void>}
 */
export async function getOrgCompany(orgId) {
  return request('/api/sys/org/get-org-company', {
    method: 'get',
    params: {
      orgId: orgId,
    },
  });
}

/**
 * 获取机构信息
 * @param orgId
 * @returns {Promise<void>}
 */
export async function getOrgById(orgId) {
  return request('/api/sys/org/get-by-id', {
    method: 'get',
    params: {
      orgId: orgId,
    },
  });
}
