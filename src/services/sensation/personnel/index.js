import request from '@/utils/request';

export async function queryPersonnelList(params) {
  return request('/api/sensation/person-db', {
    params,
  });
}

/**
 * 加载所有的人员类型分类
 * @returns {Promise<void>}
 */
export async function loadPersionType() {
  return request('/api/sensation/person-db-type');
}

/**
 * 添加/修改人员信息
 * @param person
 * @returns {Promise<void>}
 */
export async function savePersonnel(person) {
  return request('/api/sensation/person-db', {
    method: 'post',
    data: person,
  });
}

/**
 * 获取人员信息
 * @param id
 * @returns {Promise<void>}
 */
export async function getPersonById(id) {
  return request('/api/sensation/person-db/get-person-db-by-id', {
    method: 'get',
    params: { id: id },
  });
}

/**
 * 设置当前用户状态
 * @param personId
 * @param status
 * @returns {Promise<void>}
 */
export async function setPersonStatus(personId, status) {
  return request('/api/sensation/person-db/set-status-by-id', {
    method: 'post',
    params: {
      id: personId,
      status: status,
    },
  });
}

export async function getPersonContractList(personId) {
  return request('/api/sensation/person-contract/get-all-person-contracts', {
    method: 'get',
    params: { personId: personId },
  });
}

/**
 * 保存洽谈信息
 * @param personContract
 * @returns {Promise<void>}
 */
export async function savePersonContract(personContract) {
  return request('/api/sensation/person-contract/save-person-contract', {
    method: 'post',
    data: personContract,
  });
}

/**
 * 删除洽谈信息
 * @param id
 * @returns {Promise<void>}
 */
export async function deletePersonContract(id) {
  return request('/api/sensation/person-contract/remove-by-id', {
    method: 'delete',
    params: { id: id },
  });
}

/**
 * 获取人员相关的重要信息
 * @param personId
 * @returns {Promise<void>}
 */
export async function getPersonImportantInformList(personId) {
  return request('/api/sensation/person-important-information/get-all-by-person-id', {
    method: 'get',
    params: {
      personId: personId,
    },
  });
}

/**
 * 保存重要资料
 * @param personImportInformation
 * @returns {Promise<void>}
 */
export async function savePersonImprotInformation(personImportInformation) {
  return request('/api/sensation/person-important-information/save-person-important-information', {
    method: 'post',
    data: personImportInformation,
  });
}

/**
 * 删除重要资料
 * @param id
 * @returns {Promise<void>}
 */
export async function deletePersonInformation(id) {
  return request('/aip/sensation/person-important-information/remove-by-id', {
    method: 'delete',
    params: { id: id },
  });
}

/**
 * 获取人员为销售人员时获取人员的负责的项目
 * @param personId
 * @returns {Promise<void>}
 */
export async function getPersonDbProjectsByPersonId(personId) {
  return request('/api/sensation/person-db-project', {
    method: 'get',
    params: { personId: personId },
  });
}

/**
 * 保存
 * @param personId
 * @returns {Promise<void>}
 */
export async function savePersonDbProjects(personDbProject) {
  return request('/api/sensation/person-db-project', { method: 'post', data: personDbProject });
}

/**
 * 保存
 * @param personId
 * @returns {Promise<void>}
 */
export async function deletePersonDbProjectsById(personId) {
  return request('/api/sensation/person-db-project/remove-by-id', {
    method: 'delete',
    params: { personId: personId },
  });
}

/**
 * 获取人员为销售人员时获取人员的负责的企业信息
 * @param personId
 * @returns {Promise<void>}
 */
export async function getPersonDbCompanyByPersonId(personId) {
  return request('/api/sensation/person-db-company', {
    method: 'get',
    params: { personId: personId },
  });
}

/**
 * 保存
 * @param personId
 * @returns {Promise<void>}
 */
export async function savePersonDbCompany(personDbCompany) {
  return request('/api/sensation/person-db-company', { method: 'post', data: personDbCompany });
}

/**
 * 保存
 * @param personId
 * @returns {Promise<void>}
 */
export async function deletePersonDbComnpanyById(personId) {
  return request('/api/sensation/person-db-company/remove-by-id', {
    method: 'delete',
    params: { personId: personId },
  });
}
