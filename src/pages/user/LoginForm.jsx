import React, { Component } from 'react';
import { Button, Checkbox, Col, Form, Icon, Input, Row } from 'antd';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import styles from './style.less';
import { Encrypt } from '@/utils/aes';

class LoginForm extends Component {
  state = {
    autoLogin: true,
    code: '/api/validate/get-code',
  };

  componentDidMount() {
    this.getValidateCode();
  }

  getValidateCode() {
    this.setState({ code: `/api/validate/get-code?${Math.random()}` });
  }

  render() {
    let { getFieldDecorator, getFieldValue } = this.props.form;
    return (
      <div>
        <Form
          onSubmit={e => {
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
                this.props.handleSubmit(err, values);
              }
            });
            // this.props.handleSubmit
          }}
        >
          <Form.Item>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: '请输入账户名!' }],
            })(
              <Input
                // style={{width: '100%'}}
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="text"
                autoComplete="off"
                placeholder="账户"
              />,
            )}
          </Form.Item>

          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入密码!' }],
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
                      message: '验证码不能为空',
                    },
                  ],
                })(<Input placeholder="验证码" />)}
              </Form.Item>
            </Col>
            <Col span={1}></Col>
            <Col span={7}>
              <img
                style={{
                  width: '100%',
                  height: '32px',
                  lineHeight: '32px',
                  marginTop: '4px',
                  background: '#d9d9d9',
                }}
                src={this.state.code}
                onClick={this.getValidateCode.bind(this)}
                alt={'验证码'}
              />
            </Col>
          </Row>

          <Form.Item style={{ textAlign: 'left' }}>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: false,
            })(<Checkbox>记住密码</Checkbox>)}
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              登 录
            </Button>
            {/* <Button
              type={'default'}
              className={styles.subBtn}
              onClick={e => {
                this.props.cancelLogin();
              }}
            >
              取消登录
            </Button> */}
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default Form.create({})(LoginForm);
