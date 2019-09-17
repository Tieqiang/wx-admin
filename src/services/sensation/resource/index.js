import request from '@/utils/request';

const BASE_URL = '/api/sensation/inner-information';
const ResourceService = {
  /**
   * 加载内部信息
   * @param resourceType
   * @param status
   * @param title
   * @param uploadTime
   * @param page
   * @param pageSize
   * @returns {Promise<void>}
   */
  loadAllInnerInformation: async function(
    resourceType,
    status,
    title,
    uploadTime,
    page = 1,
    pageSize = 10,
  ) {
    return request(BASE_URL, {
      method: 'get',
      params: {
        resourceType: resourceType,
        status: status,
        title: title,
        uploadTime: uploadTime,
        page: page,
        pageSize: pageSize,
      },
    });
  },
  /**
   * 获取资源分类
   * @returns {Promise<void>}
   */
  loadResourceType: async function() {
    return request('/api/sensation/inner-information-type');
  },
  /**n
   * 保存
   * @param values
   * @returns {Promise<void>}
   *
   */
  saveResourceType: async function(values) {
    return request(BASE_URL, { method: 'post', data: values });
  },
};
export default ResourceService;
