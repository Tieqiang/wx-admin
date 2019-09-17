import { Form, Icon, Input, Button, Checkbox, Row, Col, message } from 'antd';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import React, { Component } from 'react';
import { connect } from 'dva';

import routes from '../../../config/routes';
import router from 'umi/router';

import { setAuthority } from '../../utils/authority';
import { reloadAuthorized } from '../../utils/Authorized';
import { setToken } from '../../utils/token';
import styles from './style.less';
import { Encrypt } from '@/utils/aes';

@connect(({ login }) => ({
  login,
}))
class Login extends Component {
  loginForm = undefined;

  constructor(props) {
    super(props);
  }

  state = {
    autoLogin: true,
    code: '/api/validate/get-code',
  };

  componentDidMount() {
    this.getValidateCode();
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        values.password = Encrypt(
          values.password,
          formatMessage({
            id: 'layout.user.aesKey',
          }),
          formatMessage({
            id: 'layout.user.ivKey',
          }),
        ); //加密
        const { dispatch, login } = this.props;
        dispatch({
          type: 'login/login',
          payload: { ...values },
        });
      }
    });
  };

  getValidateCode() {
    this.setState({ code: `/api/validate/get-code?${Math.random()}` });
  }

  findHasRightMenuIndex(rightRouters, menuCode) {
    //判断后台路由中当前用户拥有权限的。然后记录index
    let hasRightIndex = [];

    rightRouters.forEach((r, index) => {
      let obj = {
        path: '',
        index: [-1],
      };

      if (r.path && r.path.startsWith('.')) {
        obj.path = r.path.substring(1);
      } else if (r.path && r.path.startsWith('/')) {
        obj.path = r.path;
      } else {
        obj.path = '/' + r.path;
      }

      if (r.routes && r.routes instanceof Array) {
        let v = this.findHasRightMenuIndex(r.routes, menuCode);
        v.forEach(sub => {
          let subObj = {
            path: obj.path + sub.path,
            index: [index].concat(sub.index),
          };
          hasRightIndex.push(subObj);
        });
      }
      if (r && r.authority instanceof Array) {
        let righItem = r.authority.find(authority => {
          return authority === menuCode;
        });

        if (righItem) {
          obj.index = [index];
        }
      }
      if (obj.index[0] !== -1) {
        hasRightIndex.push(obj);
      }
    });
    return hasRightIndex;
  }

  findDefaultAdminPath(routerIndex, layer = 0) {
    //找到对应的登录地址
    let min = 10000;
    routerIndex.forEach(item => {
      if (item.index[layer] <= min) {
        min = item.index[layer];
      }
    });
    let nextRouter = [];
    routerIndex.forEach(item => {
      if (item.index[layer] === min) {
        nextRouter.push(item);
      }
    });

    layer = layer + 1;
    if (nextRouter.length > 1) {
      return this.findDefaultAdminPath(nextRouter, layer);
    } else {
      return nextRouter[0].path;
    }
  }

  resetLogin() {
    let { dispatch } = this.props;
    dispatch({
      type: 'login/resetLoginToken',
      payload: {},
    });
  }

  render() {
    let { getFieldDecorator, getFieldValue } = this.props.form;
    const { login } = this.props;
    const { autoLogin } = this.state;

    let adminRoutes = routes[1].routes;
    if (login.token) {
      let authority = [];

      let hasRightMenuIndex = [];

      login.menus.forEach(item => {
        authority.push(item.menu.menuCode);
        hasRightMenuIndex = hasRightMenuIndex.concat(
          this.findHasRightMenuIndex(adminRoutes, item.menu.menuCode),
        );
      });
      if (hasRightMenuIndex.length <= 0) {
        message.error('非竞争情报及政策研究数据管理平台用户,不允许登录和使用！', 1, () => {
          this.resetLogin();
        });
      } else {
        let defaultPath = this.findDefaultAdminPath(hasRightMenuIndex);
        if (defaultPath) {
          setAuthority(authority);
          setToken(login.token);
          reloadAuthorized();
          router.push(defaultPath);
        } else {
          message.error('非竞争情报及政策研究数据管理平台用户,不允许登录和使用！', 1, () => {
            this.resetLogin();
          });
        }
      }
    }

    return (
      <div className={styles.main}>
        <div className={styles.head}>
          <div className={styles.logo}></div>
          <div>
            竞争情报及政策研究平台
            <br />
            数据管理后台
          </div>
        </div>
        <Form onSubmit={this.handleSubmit}>
          <Form.Item>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: '请输入用户名！' }],
            })(
              <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="账户"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入密码！' }],
            })(
              <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="密码"
              />,
            )}
          </Form.Item>
          <Row style={{ marginBottom: '0px' }}>
            <Col span={16}>
              <Form.Item style={{ marginBottom: '0px' }}>
                {getFieldDecorator('imageCode', {
                  rules: [
                    {
                      required: true,
                      message: '请输入验证码!',
                    },
                  ],
                })(<Input placeholder="验证码" />)}
              </Form.Item>
            </Col>
            <Col span={1}></Col>
            <Col span={7}>
              <img
                style={{ width: '100%', height: '32px', lineHeight: '32px', marginTop: '4px' }}
                src={this.state.code}
                onClick={this.getValidateCode.bind(this)}
                alt={'验证码'}
              />
            </Col>
          </Row>

          <Form.Item style={{ marginBottom: '0px' }}>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: false,
            })(<Checkbox style={{ color: 'rgba(255,255,255,0.65)' }}>记住密码</Checkbox>)}
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className={styles.subBtn}>
              登 录
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const LoginForm = Form.create({})(Login);

export default LoginForm;
