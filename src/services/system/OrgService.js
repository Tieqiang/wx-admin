import request from '@/utils/request';
const BASE_URL = '/api/sys/org';
const OrgService = {
  /**
   * 获取所有的机构
   */
  loadAllOrg: async function(sysId = '1', orgName = '') {
    return request(BASE_URL, {
      method: 'get',
      params: {
        sysId: sysId,
        orgName: orgName,
      },
    });
  },
};
export default OrgService;
