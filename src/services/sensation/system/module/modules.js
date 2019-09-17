import request from '@/utils/request';

// export async
const base_url = '/api/sensation/';

/**
 * 查询返回的机构
 * @param page
 * @param pageSize
 * @param moduleName
 * @param moduleCode
 * @returns {Promise<void>}
 */
export async function queryModulesByPage(page = 0, pageSize = 10, moduleName, moduleCode) {
  return request(base_url, {
    params: {
      page: page,
      pageSize: pageSize,
      moduleName: moduleName,
      moduleCode: moduleCode,
    },
  });
}

/**
 * 保存修改关键词
 * @param moduleName
 * @param moduleCode
 * @returns {Promise<void>}
 */
export async function mergeModule(moduleName, moduleCode) {
  return request(base_url, {
    method: 'post',
    data: moduleName,
    moduleCode,
  });
}

/**
 * 删除 对象
 * @param moduleCode
 * @returns {Promise<void>}
 */
export async function removeModule(moduleCode) {
  return request(base_url + '/remove-by-moduleCode', {
    method: 'delete',
    params: {
      moduleCode: moduleCode,
    },
  });
}
