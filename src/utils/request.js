/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import { extend } from 'umi-request';
import { notification } from 'antd';
import router from 'umi/router';
import defaultSettings from '../../config/defaultSettings';
import { getToken, removeToken } from '@/utils/token';
import { removeAuthority } from '@/utils/authority';
import moment from 'moment';

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};
/**
 * 异常处理程序
 */

const errorHandler = error => {
  const { response } = error;
  let message = response.clone().json();
  message.then(data => {
    console.log(data);
    if (data.resCode === '4003') {
      removeToken(); //清楚缓存
      removeAuthority();

      if (defaultSettings.adminFlag) {
        notification.error({
          message: '登录失效，即将返回登录页,请重新登录！',
          onClose: () => {
            window.location = '/usr/login';
          },
        });
      }
    } else {
      console.log(data);
      notification.error({
        message: `请求服务错误：${data.resDescription ? data.resDescription : data.message}`,
      });
    }
  });

  return message;
};
/**
 * 配置request请求时的默认参数
 */
let token = getToken();
const request = extend({
  errorHandler,
  // 默认错误处理
  credentials: 'include', // 默认请求是否带上cookie
  headers: {
    authorization: token,
  },
});
// request拦截器, 改变url 或 options.
request.interceptors.request.use((url, options) => {
  let pos = url.indexOf('?');
  //添加时间戳，防止缓存
  if (pos > 0) {
    url = url + '&queryTime = ' + moment();
  } else {
    url = url + '?queryTime=' + moment();
  }
  if (!getToken() && window.location.pathname !== '/user/login' && defaultSettings.adminFlag) {
    notification.error({
      message: `token丢失，请重新登录！`,
    });
    location.href = '/user/login';
  } else {
    return {
      url: `${url}`,
      options: {
        ...options,
        headers: {
          authorization: getToken(),
        },
      },
    };
  }
});

// response拦截器, 处理response
// request.interceptors.response.use((response, options) => {
//   response.headers.append('interceptors', 'yes yo');
//   return response;
// });
export default request;
