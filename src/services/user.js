import request from '@/utils/request';

export async function query() {
  return request('/api/users');
}

export async function queryCurrent() {
  return null;
}

export async function queryNotices() {
  return request('/api/notices');
}

export async function loginToServer(username, password, imageCode) {
  return request('/api/login.html', {
    method: 'post',
    getResponse: true,
    params: {
      username: username,
      password: password,
      imageCode: imageCode,
    },
  });
}

export async function getCurrentUser() {
  return request('/api/sys/user/get-current-user');
}

export async function logout() {
  return request('/api/logout', { method: 'post' });
}

/**
 * 修改密码
 * @param oldPassword
 * @param newPassword
 * @returns {Promise<void>}
 */
export async function changePassword(oldPassword, newPassword) {
  return request('/api/sys/user/change-pwd', {
    method: 'post',
    params: { oldPassword: oldPassword, newPassword: newPassword },
  });
}
