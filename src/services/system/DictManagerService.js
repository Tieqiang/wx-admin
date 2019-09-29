import request from '@/utils/request';

const BASE_URL = '/api/sys/dict';

export default {
  /**
   * 获取所有的字典值
   * @returns {Promise<void>}
   */
  getDictValues: async function (dictType) {
    return request(BASE_URL + '/get-dict-values', {method: 'get', params: {typeId: dictType}});
  },

  /**
   * 分页获取字典类型
   * @returns {Promise<void>}
   */
  getDictTypeByPage: async function (dictType, pageSize = 10, currentPage = 1) {
    return request(BASE_URL + "/get-dict-type-page", {
      method: "get",
      params: {typeName: dictType, pageSize: pageSize, current: currentPage}
    })
  },

  /**
   * 添加字典
   * @param dictType
   * @returns {Promise<void>}
   */
  saveDictType: async function (dictType) {
    return request(BASE_URL, {method: "POST", data: dictType});
  },
  /**
   * 删除字典
   * @param id
   * @returns {Promise<void>}
   */
  removeDictType: async function (id) {
    return request(BASE_URL, {method: "DELETE", params: {id: id}})
  },
 /**
   * 添加字典
   * @param dictType
   * @returns {Promise<void>}
   */
  saveDict: async function (dictObj) {
    return request(BASE_URL+"/save-dict", {method: "POST", data: dictObj});
  },
  /**
   * 删除字典
   * @param id
   * @returns {Promise<void>}
   */
  removeDict: async function (id) {
    return request(BASE_URL+"/remove-dict-by-id", {method: "DELETE", params: {id: id}})
  },

};
