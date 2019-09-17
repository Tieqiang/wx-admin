import request from '@/utils/request';

export async function queryRoleList(params) {
  return request('/api/sys/role', {
    params,
  });
}

export async function queryAllRole(params) {
  return request('/api/sys/role/get-all-roles', {
    params,
  });
}

export async function getSingleRole(roleId) {
  return request('/api/sys/role/get-role-by-id', {
    method: 'get',
    params: { id: roleId, time: new Date().getTime() },
  });
}

export async function addRole(params) {
  return request('/api/sys/role', {
    method: 'POST',
    data: { ...params },
  });
}

export async function removeSingleRole(params) {
  return request('/api/sys/role', {
    method: 'delete',
    params,
  });
}
