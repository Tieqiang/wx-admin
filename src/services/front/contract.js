import request from '@/utils/request';

const base_url = '/api/sensation/contract';

/**
 * 获取我的接洽信息
 * @returns {Promise<void>}
 */
export async function getMyContract(
  contractObjectName,
  page,
  pageSize,
  contractOur = '',
  contractThires = '',
) {
  return request(base_url + '/get-contracts', {
    method: 'get',
    params: {
      contractObjectName: contractObjectName,
      page: page,
      pageSize: pageSize,
      contractOur: contractOur,
      contractThires: contractThires,
    },
  });
}

/**
 * 获取被接洽对象的接洽列表
 * @param contractObjectId
 * @param contractObjectName
 * @param contractOur
 * @param contractThires
 * @param page
 * @param pageSize
 * @returns {Promise<void>}
 */
export async function getObjectContractList(
  contractObjectId,
  contractObjectName,
  contractOur = '',
  contractThires = '',
  page = 1,
  pageSize = 10,
) {
  return request(base_url + '/get-contracts-by-contract-object-id', {
    method: 'get',
    params: {
      contractObjectId: contractObjectId,
      page: page,
      pageSize: pageSize,
      contractObjectName: contractObjectName,
      contractOur: contractOur,
      contractThires: contractThires,
    },
  });
}

/***
 * 保存接洽对象
 * @param contractObject
 * @param contractType
 * @returns {Promise<void>}
 */
export async function saveContract(contractObject, contractType) {
  let url = '';
  switch (contractType) {
    case 'COMPANY':
      url = '/api/sensation/company-contract/save-company-Certificate';
      break;
    case 'PERSON':
      url = '/api/sensation/person-contract/save-person-contract';
      break;
    case 'ORG':
      url = '/api/sensation/org-contract/save-org-contract';
      break;
  }

  return request(url, {
    method: 'post',
    data: {
      ...contractObject,
    },
  });
}
