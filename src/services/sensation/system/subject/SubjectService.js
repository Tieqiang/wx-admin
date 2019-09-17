import request from '@/utils/request';

let BaseUrl = '/api/sensation/subject-class';
const SubjectService = {
  /**
   * 分页获取所有的主题分类
   * @param subjectName
   * @param page
   * @param pageSize
   * @returns {Promise<void>}
   */
  findSubjectsByPage: async (subjectName, orgDbTypeId, page = 1, pageSize = 10) => {
    return request(BaseUrl, {
      method: 'get',
      params: {
        subjectName: subjectName,
        orgDbTypeId: orgDbTypeId,
        page: page,
        pageSize: pageSize,
      },
    });
  },
  /**
   * 获取所有的数据库类型
   * @returns {Promise<void>}
   */
  findSubjectDbTypes: async () => {
    return request(BaseUrl + '/get-db-type');
  },

  /***
   * 根据Id获取数据结果
   * @param id
   */
  findSubjectById: async id => {
    if (!id) {
      return new Promise(resolve => {
        resolve(null);
      });
    }
    return request(BaseUrl + '/get-subject-class-by-id', {
      method: 'get',
      params: { id: id },
    });
  },
  /***
   * 获取所有的分类信息
   * @param id
   */
  findAllSubject: async () => {
    return request(BaseUrl + '/get-all-subject-class', {
      method: 'get',
    });
  },
  /**
   * 删除主题分类
   * @param id
   * @returns {Promise<void>}
   */
  removeSubject: async id => {
    return request(BaseUrl + '/remove-subject-class-by-id', {
      method: 'delete',
      params: {
        id: id,
      },
    });
  },
  /**
   * 保存主题分类
   * @param subject
   * @returns {Promise<void>}
   */
  saveSubject: async subject => {
    return request(BaseUrl, {
      method: 'post',
      data: subject,
    });
  },
};

export default SubjectService;
