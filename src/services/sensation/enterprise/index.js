import request from '@/utils/request';

/**
 *
 * @param {page, pageSize, CompanyName, province, unionCode} params
 */
export async function queryEnterpriseList(params) {
  return request('/api/sensation/company-db/get-page-company-dbs', {
    params,
  });
}
export async function queryEnterpriseListById(params) {
  return request('/api/sensation/company-db/get-company-db-by-id', {
    params,
  });
}
export async function saveEnterprise(params) {
  return request('/api/sensation/company-db/save-or-update-company-db', {
    method: 'post',
    data: params,
  });
}
/**
 *
 * @param {id} params
 */
export async function removeCompany(params) {
  return request('/api/sensation/company-db/remove-by-id', {
    method: 'delete',
    params,
  });
}
export async function queryCompanyTypeList(params) {
  return request('/api/sensation/company-db-type/get-all-company-type', {
    params,
  });
}
// POST /api/sensation/company-db/set-status-by-id
export async function setCompanyStatus(params) {
  return request('/api/sensation/company-db/set-status-by-id', {
    method: 'post',
    params,
  });
}

// 生态企业产品/服务列表
export async function queryAllCompanyEcologicalList(params) {
  return request('/api/sensation/company-ecological/get-ecological-by-company-id', {
    method: 'get',
    params,
  });
}
export async function saveCompanyEcological(params) {
  return request('/api/sensation/company-ecological/save-company-ecological', {
    method: 'post',
    data: params,
  });
}
export async function removeOneCompanyEcological(params) {
  return request('/api/sensation/company-ecological/remove-by-id', {
    method: 'delete',
    params,
  });
}
// 合作伙伴
export async function queryAllCompanyPartnersList(params) {
  return request('/api/sensation/company-partners/get-partners-by-company-id', {
    method: 'get',
    params,
  });
}
export async function saveCompanyPartners(params) {
  return request('/api/sensation/company-partners/save-company-partners', {
    method: 'post',
    data: params,
  });
}
export async function removeOneCompanyPartners(params) {
  return request('/api/sensation/company-partners/remove-by-id', {
    method: 'delete',
    params,
  });
}
// 竞争对手GET /sensation/company-competitor/get-all-company-competitors
export async function queryAllCompanyCompetitorsList(params) {
  return request('/api/sensation/company-competitor/get-all-company-competitors', {
    method: 'get',
    params,
  });
}
export async function saveCompanyCompetitors(params) {
  return request('/api/sensation/company-competitor/save-company-competitor', {
    method: 'post',
    data: params,
  });
}
export async function removeOneCompanyCompetitors(params) {
  return request('/api/sensation/company-competitor/remove-by-id', {
    method: 'delete',
    params,
  });
}
// 接洽信息 GET /sensation/company-contract/get-all-company-contract-by-id
export async function queryAllCompanyContractList(params) {
  return request('/api/sensation/company-contract/get-all-company-contract-by-id', {
    method: 'get',
    params,
  });
}
export async function saveCompanyContract(params) {
  return request('/api/sensation/company-contract/save-company-Certificate', {
    method: 'post',
    data: params,
  });
}
export async function removeOneCompanyContract(params) {
  return request('/api/sensation/company-contract/remove-by-id', {
    method: 'delete',
    params,
  });
}
// 重要资料 GET /sensation/company-important-information/get-all-important-information-by-id
export async function queryAllCompanyImportantInfoList(params) {
  return request(
    '/api/sensation/company-important-information/get-all-important-information-by-id',
    {
      method: 'get',
      params,
    },
  );
}
export async function saveCompanyImportantInfo(params) {
  return request(
    '/api/sensation/company-important-information/save-company-important-information',
    {
      method: 'post',
      data: params,
    },
  );
}
export async function removeOneCompanyImportantInfo(params) {
  return request('/api/sensation/company-important-information/remove-by-id', {
    method: 'delete',
    params,
  });
}
// 产品/解决 GET /api/sensation/company-products/get-all-company-contract-by-id
export async function queryAllCompanyProductsList(params) {
  return request('/api/sensation/company-products/get-all-company-contract-by-id', {
    method: 'get',
    params,
  });
}
export async function saveCompanyProducts(params) {
  return request('/api/sensation/company-products/save-company-products', {
    method: 'post',
    data: params,
  });
}
export async function removeOneCompanyProducts(params) {
  return request('/api/sensation/company-products/remove-by-id', {
    method: 'delete',
    params,
  });
}
// 资质证书 GET /api/sensation/company-certificate/get-competitors-by-company-id
export async function queryAllCompanyCertificateList(params) {
  return request('/api/sensation/company-certificate/get-competitors-by-company-id', {
    method: 'get',
    params,
  });
}
export async function saveCompanyCertificate(params) {
  return request('/api/sensation/company-certificate/save-company-Certificate', {
    method: 'post',
    data: params,
  });
}
export async function removeOneCompanyCertificate(params) {
  return request('/api/sensation/company-certificate/remove-by-id', {
    method: 'delete',
    params,
  });
}
//招投标  GET /api/sensation/company-bidding/get-competitors-by-company-id
export async function queryAllCompanyBiddingList(params) {
  return request('/api/sensation/company-bidding/get-competitors-by-company-id', {
    method: 'get',
    params,
  });
}
export async function saveCompanyBidding(params) {
  return request('/api/sensation/company-bidding/save-company-bidding', {
    method: 'post',
    data: params,
  });
}
export async function removeOneCompanyBidding(params) {
  return request('/api/sensation/company-bidding/save-company-bidding', {
    method: 'delete',
    params,
  });
}
//融资历程  GET /api/sensation/company-financing-record/get-all-company-contract-by-id
export async function queryAllCompanyFinancingList(params) {
  return request('/api/sensation/company-financing-record/get-all-company-contract-by-id', {
    method: 'get',
    params,
  });
}
//股东及出资信息  GET /api/sensation/company-stockholder/get-all-company-contract-by-id
export async function queryAllCompanyStockholderList(params) {
  return request('/api/sensation/company-stockholder/get-all-company-contract-by-id', {
    method: 'get',
    params,
  });
}
//对外投资  GET /api/sensation/company-foreignInvestment/get-foreignInvestment-by-company-id
export async function queryAllCompanyForeignInvestmentList(params) {
  return request('/api/sensation/company-foreignInvestment/get-foreignInvestment-by-company-id', {
    method: 'get',
    params,
  });
}
// 核心成员  GET /api/sensation/company-important-person/get-all-important-person-by-id
export async function queryAllCompanyImportantPersonList(params) {
  return request('/api/sensation/company-important-person/get-all-important-person-by-id', {
    method: 'get',
    params,
  });
}
//发展历史  GET /api/sensation/company-history/get-all-company-contract-by-id
export async function queryAllCompanyHistoryList(params) {
  return request('/api/sensation/company-history/get-all-company-contract-by-id', {
    method: 'get',
    params,
  });
}
