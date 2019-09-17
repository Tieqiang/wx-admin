import request from '@/utils/request';

export async function queryModuleList(params) {
  return request('/api/sys/module', {
    params,
  });
}

export async function addModule(params) {
  return request('/api/sys/module', {
    method: 'POST',
    data: { ...params },
  });
}

//删除部门
export async function removeModule(id) {
  return request('/api/sys/module/remove-module', {
    method: 'delete',
    params: {
      id: id,
    },
  });
}
