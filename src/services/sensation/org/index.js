import request from '@/utils/request';

export async function queryOrgList(params) {
  return request('/api/sensation/org-db/get-page-org-dbs', {
    params,
  });
}

export async function queryOrgTypeList(params) {
  return request('/api/sensation/org-db-type/get-all-org-type', {
    params,
  });
}

export async function queryOrgListById(params) {
  return request('/api/sensation/org-db/get-org-db-by-id', {
    params,
  });
}

export async function saveOrg(params) {
  return request('/api/sensation/org-db/save-or-update-org-db', {
    method: 'post',
    data: params,
  });
}

/**
 *
 * @param {id} params
 */
export async function removeOrg(params) {
  return request('/api/sensation/org-db/remove-by-id', {
    method: 'delete',
    params,
  });
}

// POST /api/sensation/org-db/set-status-by-id
export async function setOrgStatus(params) {
  return request('/api/sensation/org-db/set-status-by-id', {
    method: 'post',
    params,
  });
}

//领导信息  GET /api/sensation/org-leader/get-all-org-leader
export async function queryAllOrgLeaderList(params) {
  return request('/api/sensation/org-leader/get-all-org-leader', {
    method: 'get',
    params,
  });
}
export async function saveOrgLeader(params) {
  return request('/api/sensation/org-leader/save-org-leader', {
    method: 'post',
    data: params,
  });
}
export async function removeOneOrgLeader(params) {
  return request('/api/sensation/org-leader/remove-by-id', {
    method: 'delete',
    params,
  });
}
//接洽信息  GET GET /api/sensation/org-contract/getallOrgs
export async function queryAllOrgContractList(params) {
  return request('/api/sensation/org-contract/getallOrgs', {
    method: 'get',
    params,
  });
}
export async function saveOrgContract(params) {
  return request('/api/sensation/org-contract/save-org-contract', {
    method: 'post',
    data: params,
  });
}
export async function removeOneOrgContract(params) {
  return request('/api/sensation/org-contract/remove-by-id', {
    method: 'delete',
    params,
  });
}
//重要资料  GET /api/sensation/org-important-information/get-all-org-Informations
export async function queryAllOrgImportantInfoList(params) {
  return request('/api/sensation/org-important-information/get-all-org-Informations', {
    method: 'get',
    params,
  });
}
export async function saveOrgImportantInfo(params) {
  return request('/api/sensation/org-important-information/save-org-important-information', {
    method: 'post',
    data: params,
  });
}
export async function removeOneOrgImportantInfo(params) {
  return request('/api/sensation/org-important-information/remove-by-id', {
    method: 'delete',
    params,
  });
}
