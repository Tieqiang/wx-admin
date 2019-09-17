import { Form, Row, Col, Button, Input, Select, TreeSelect, Tree } from 'antd';
import React, { Component } from 'react';

import styles from './style.less';
import { connect } from 'dva';
const FormItem = Form.Item;
const { Option } = Select;
const { TreeNode } = TreeSelect;

@connect(({ userManage }) => ({ userManage }))
class AddUserForm extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    confirmDirty: false,
  };
  handleConfirmBlur = e => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };
  checkConfirm = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['passwordConfirm'], { force: true });
    }
    callback();
  };
  checkPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('两次密码输入不一致!');
    } else {
      callback();
    }
  };

  getTreeData(orgAllList) {
    let target = [];
    target = orgAllList.filter(item => item.parentId === '0');
    (target = target.map(value => {
      return {
        key: value.id,
        value: value.id,
        title: value.orgName,
        children: [],
      };
    })),
      target.forEach(item => {
        orgAllList.forEach(item1 => {
          if (item1.parentId == item.key) {
            let obj = {
              key: item1.id,
              value: item1.id,
              title: item1.orgName,
              children: [],
            };
            item.children.push(obj);
          }
        });
      });
    return target;
  }

  handleOrgChange(value) {
    return value;
  }

  render() {
    // const formItemLayout = { labelCol: { span: 6 }, wrapperCol: { span: 12, offset: 1 } };
    const formItemLayout = {
      labelCol: {
        xs: { span: 12 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24, offset: 1 },
        sm: { span: 19, offset: 1 },
      },
    };
    const formItemHalfLayout = {
      labelCol: {
        xs: { span: 12 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24, offset: 2 },
        sm: { span: 14, offset: 2 },
      },
    };
    const itemStyle = {
      marginBottom: '5px',
    };

    const { form, roleAllList, userAllList, associates, userManage } = this.props;
    const { getFieldDecorator } = form; // 校验控件
    let { org } = this.props;
    const { orgAllList } = userManage;
    let target = this.getTreeData(orgAllList);

    let associatesOptions = this.props.userAllList.map(item => {
      return (
        <Select.Option value={item.id} key={item.id}>
          {item.realName}
        </Select.Option>
      );
    });
    return (
      <Form style={{ backgroundColor: '#fff' }} className={styles.addForm}>
        <Row>
          <Col span={24}>
            <FormItem {...formItemLayout} style={itemStyle} label="姓名">
              {form.getFieldDecorator('user.realName', {
                rules: [
                  {
                    required: true,
                    message: '请输入姓名!',
                  },
                ],
              })(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <FormItem {...formItemLayout} style={itemStyle} label="用户名">
              {form.getFieldDecorator('user.username', {
                rules: [
                  {
                    required: true,
                    message: '请输入用户名!',
                  },
                ],
              })(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem {...formItemHalfLayout} style={itemStyle} label="工号">
              {form.getFieldDecorator('user.nikeName', {
                rules: [
                  {
                    required: true,
                    message: '请输入工号!',
                  },
                ],
              })(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem {...formItemHalfLayout} style={itemStyle} label="部门">
              {form.getFieldDecorator('orgId', {
                rules: [
                  {
                    required: true,
                    message: '请选择部门!',
                  },
                ],
              })(
                <TreeSelect
                  placeholder="请选择"
                  allowClear={true}
                  treeData={target}
                  onChange={this.handleOrgChange.bind(this)}
                  dropdownStyle={{ maxHeight: 400, overflow: 'scroll' }}
                />,
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={40}>
          <Col span={24}>
            <FormItem {...formItemLayout} style={itemStyle} label="角色">
              {form.getFieldDecorator('roleOfUser', {
                rules: [
                  {
                    required: true,
                    message: '请至少选择一个角色!',
                  },
                ],
              })(
                <Select mode="multiple" placeholder="请选择" onChange={this.handleRoleChange}>
                  {roleAllList.map((item, index) => (
                    <Option key={item.id} value={item.id} label={item.roleName}>
                      {item.roleName}
                    </Option>
                  ))}
                </Select>,
              )}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <FormItem {...formItemLayout} style={itemStyle} label="关系人">
              {form.getFieldDecorator('user.associatedUserId', {
                getValueFromEvent: args => {
                  if (typeof args === 'string') {
                    this.props.user.associatedUserId = args.join(',');
                  }
                  return args;
                },
              })(
                <Select
                  placeholder="请选择"
                  mode="multiple"
                  tokenSeparators={[',']}
                  autoClearSearchValue={true}
                >
                  {associatesOptions}
                </Select>,
              )}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem {...formItemHalfLayout} style={itemStyle} label="职位">
              {form.getFieldDecorator('user.title')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem {...formItemHalfLayout} style={itemStyle} label="手机号">
              {form.getFieldDecorator('user.phoneNumber', {
                rules: [
                  {
                    validator: this.checkPhoneNumber,
                  },
                ],
              })(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default Form.create({
  mapPropsToFields: props => {
    if (props.id) {
      return {
        'user.realName': Form.createFormField({
          ...props.user,
          value: props.user.realName,
        }),
        'user.username': Form.createFormField({
          ...props.user,
          value: props.user.username,
        }),
        password: Form.createFormField({
          ...props.user,
          value: props.user.password,
        }),
        passwordConfirm: Form.createFormField({
          ...props.user,
          value: props.user.password,
        }),
        roleOfUser: Form.createFormField({
          ...props.roleList,
          value: props.roleList.map(item => {
            return item.id;
          }),
        }),
        'user.id': Form.createFormField({
          ...props.user,
          value: props.user.id,
        }),
        'user.associatedUserId': Form.createFormField({
          ...props.user,
          value: props.user.associatedUserId ? props.user.associatedUserId.split(',') : [],
        }),
        'user.nikeName': Form.createFormField({
          ...props.user,
          value: props.user.nikeName,
        }),
        'user.title': Form.createFormField({
          ...props.user,
          value: props.user.title,
        }),
        'user.phoneNumber': Form.createFormField({
          ...props.user,
          value: props.user.phoneNumber,
        }),
        orgId: Form.createFormField({
          ...props.org,
          value: props.org.id,
        }),
      };
    } else {
      return {};
    }
  },
})(AddUserForm);
