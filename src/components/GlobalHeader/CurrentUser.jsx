import { Component } from 'react';
import { connect } from 'dva';
import { Button, Form, Input, Modal, message } from 'antd';
import { Encrypt } from '../../utils/aes';
import { formatMessage } from 'umi-plugin-react/locale';

@connect(({ user }) => ({ user }))
class CurrentUser extends Component {
  state = {
    changePasswordModal: false,
  };

  formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
  };
  constructor(props) {
    super(props);
  }
  logout() {
    let { dispatch } = this.props;
    Modal.confirm({
      content: '确认要退出当前用户?',
      onOk: () => {
        if (dispatch) {
          dispatch({
            type: 'login/logout',
          });
        }
      },
    });
  }
  changePassword(info) {
    let { dispatch } = this.props;

    let oldPassword = Encrypt(
      info.oldPassword,
      formatMessage({
        id: 'layout.user.aesKey',
      }),
      formatMessage({
        id: 'layout.user.ivKey',
      }),
    );
    let newPassword = Encrypt(
      info.newPassword,
      formatMessage({
        id: 'layout.user.aesKey',
      }),
      formatMessage({
        id: 'layout.user.ivKey',
      }),
    );

    dispatch({
      type: 'user/changePassword',
      payload: {
        oldPassword: oldPassword,
        newPassword: newPassword,
      },
    }).then(res => {
      message.success('密码修改成功!');
      this.setState({
        ...this.state,
        changePasswordModal: false,
      });
    });
  }

  render() {
    let { currentUser } = this.props.user;
    let { getFieldDecorator } = this.props.form;
    let userDom = '';
    if (currentUser && currentUser.user) {
      userDom = currentUser.user.realName;
    }
    return (
      <div>
        <Button icon={'user'} type={'link'}>
          {userDom}
        </Button>
        <Button
          type={'link'}
          icon={'edit'}
          onClick={e => {
            e.preventDefault();
            this.setState({
              ...this.state,
              changePasswordModal: true,
            });
          }}
        >
          修改密码
        </Button>
        <Button
          type={'link'}
          icon={'logout'}
          onClick={e => {
            this.logout();
          }}
        >
          退出登录
        </Button>
        <Button type={'link'} icon={'link'}>
          前往首页
        </Button>

        <Modal
          title={'个人密码修改'}
          okText={'修改密码'}
          onCancel={e => {
            this.setState({
              ...this.state,
              changePasswordModal: false,
            });
          }}
          onOk={e => {
            this.props.form.validateFields((errors, values) => {
              if (!errors) {
                this.changePassword(values);
              }
            });
          }}
          cancelText={'取消修改'}
          visible={this.state.changePasswordModal}
        >
          <Form {...this.formItemLayout}>
            <Form.Item label={'原密码'}>
              {getFieldDecorator('oldPassword', {
                rules: [
                  {
                    required: true,
                    message: '请输入原密码',
                  },
                ],
              })(<Input type={'password'} placeholder={'请输入原密码'} />)}
            </Form.Item>
            <Form.Item label={'新密码'}>
              {getFieldDecorator('newPassword', {
                rules: [
                  {
                    required: true,
                    message: '请输入新密码',
                  },
                ],
              })(<Input type={'password'} placeholder={'请输入新密码'} />)}
            </Form.Item>
            <Form.Item label={'确认新密码'}>
              {getFieldDecorator('confirmPassword', {
                rules: [
                  {
                    validator: (rule, value, callback) => {
                      let newValue = this.props.form.getFieldValue('newPassword');
                      if (newValue === value) {
                        callback();
                      } else {
                        callback(new Error('与新密码不相同！'));
                      }
                    },
                  },
                ],
              })(<Input type={'password'} placeholder={'请再次输入新密码'} />)}
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default Form.create({})(CurrentUser);
