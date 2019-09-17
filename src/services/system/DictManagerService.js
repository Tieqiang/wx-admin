import request from '@/utils/request';

const BASE_URL = '/api/sys/dict';

export default {
  /**
   * 获取所有的字典值
   * @returns {Promise<void>}
   */
  getDictValues: async function(dictType) {
    return request(BASE_URL + '/get-dict-values', { method: 'get', params: { typeId: dictType } });
  },
};
