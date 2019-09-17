import request from '@/utils/request' ;

const BASE_URL = '/api/sys/menu';
const MenuService = {
  /**
   * 加载菜单和菜单权限
   * @param sysId
   * @returns {Promise<void>}
   */
  loadAllMenus: async function (sysId) {

    return request(BASE_URL, {
      method: 'get',
      params: { sysId: sysId }
    });

  }
};

export default MenuService;
