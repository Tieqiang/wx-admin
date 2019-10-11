import request from '@/utils/request';

const BASE_URL = "/api/wx/pat-master";

export default {


  /**
   * 查询病人
   * @param params
   * @returns {Promise<void>}
   */
  searchPats: async function (params) {
    return request(BASE_URL, {method: "get", params: {...params, pageSize: 20, current: 1}})
  },
  savePat: async function (pat) {
    return request(BASE_URL, {method: "post", data: pat});
  },
  deletePat: async function (id) {
    return request(BASE_URL, {method: "delete", params: {id: id}})
  },
  getById: async function (id) {
    return request(BASE_URL + "/get-by-id", {method: "get", params: {id: id}})
  }

}