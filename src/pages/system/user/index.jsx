import { connect } from 'dva';
import React, { Component } from 'react';

import {
  Form,
  Modal,
  Button,
  Col,
  Table,
  Row,
  Input,
  Icon,
  Link,
  Divider,
  Select,
  message,
  Tooltip,
  TreeSelect,
} from 'antd';
import { formatMessage } from 'umi-plugin-react/locale';
import StandardTable from '@/components/TableList/tableList';
import AddUserForm from './components/addUser';
import { Encrypt } from '@/utils/aes';

import styles from './style.less';
import globalStyles from '@/global.less';

const FormItem = Form.Item;
const { Option } = Select;
const { confirm } = Modal;

@connect(({ userManage, roleManage }) => ({
  userManage,
  roleManage,
}))
@Form.create()
class UserManagement extends Component {
  state = {
    modalVisible: false,
    formType: 'add',
    formValues: {},
    modalTitle: '',
    params: {
      page: '1',
      pageSize: '20',
      sysId: '1',
      realName: '',
      nikeName: '',
      orgId: '',
      parentId: '',
      orgName: '',
    },
  };
  columns = [
    {
      title: '序号',
      render: (text, record, index) => `${index + 1}`,
      key: 'index',
      align: 'center',
      fixed: 'left',
      width: 80,
    },
    {
      title: '工号',
      dataIndex: 'user.nikeName',
      key: 'nikeName',
      align: 'center',
      width: 160,
    },
    {
      title: '用户名',
      dataIndex: 'user.username',
      key: 'username',
      align: 'center',
    },
    {
      title: '姓名',
      dataIndex: 'user.realName',
      key: 'realName',
      width: 160,
      align: 'center',
    },
    {
      title: '部门',
      dataIndex: 'org.orgName',
      key: 'orgName',
      width: 180,
      align: 'center',
    },
    {
      title: '职位',
      dataIndex: 'user.title',
      key: 'title',
      width: 180,
      align: 'center',
    },
    {
      title: '角色',
      dataIndex: 'role',
      key: 'role',
      align: 'center',
      render: (text, record) => {
        let roles = [];
        record.roleList.forEach(element => {
          roles.push(element.roleName);
        });
        return roles.join(',');
      },
      width: 240,
    },
    {
      title: '手机号',
      dataIndex: 'user.phoneNumber',
      key: 'phoneNumber',
      width: 160,
      align: 'center',
    },
    {
      title: '操作',
      fixed: 'right',
      width: 200,
      align: 'center',
      render: (text, record) => (
        <div>
          <Tooltip title="重置密码">
            <Icon
              type="redo"
              style={{ marginRight: 15, color: '#1890ffff' }}
              onClick={() => {
                Modal.confirm({
                  content: '是否确认重置用户名为：' + record.user.realName + ' 的密码么？',
                  onOk: () => {
                    this.resetPassword(record);
                  },
                });
              }}
            />
          </Tooltip>
          <Tooltip title="编辑">
            <Icon
              type="edit"
              theme="twoTone"
              style={{ marginRight: 10 }}
              onClick={() => {
                this.openModalForm(record, 'update');
              }}
            />
          </Tooltip>

          <Tooltip title="停用">
            <Icon
              type="stop"
              theme="twoTone"
              style={{ marginLeft: 10 }}
              rotate="90"
              onClick={() => {
                Modal.confirm({
                  content: '是否确认停用名称为：' + record.user.realName + ' 的用户？',
                  onOk: () => {
                    this.removeOneUser(record);
                  },
                  okText: '确认停用',
                  cancelText: '取消',
                });
              }}
            />
          </Tooltip>
        </div>
      ),
    },
  ];

  // 页面初始化
  componentDidMount() {
    const { dispatch } = this.props;
    this.queryListData(this.state.params);
    this.initPageData();
  }

  // 初始化获取页面数据
  initPageData() {
    const { dispatch } = this.props;
    dispatch({
      type: 'userManage/getUser',
      payload: {},
    });
    dispatch({
      type: 'roleManage/getAllRole',
      payload: {
        sysId: '1',
      },
    });
    dispatch({
      type: 'userManage/getAllOrgList',
      payload: {
        sysId: '1',
        orgName: '',
        parentId: '',
        id: '',
      },
    });
    dispatch({
      type: 'userManage/getAllUserList',
      payload: {
        sysId: '1',
        queryParms: '',
      },
    });
  }

  // 获取用户列表数据
  queryListData(params) {
    const { dispatch } = this.props;
    dispatch({
      type: 'userManage/userList',
      payload: params,
    });
  }

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
    //console.log(target);
    return target;
  }

  // 表格页码变化时
  handleTableChangeFun = pagination => {
    let data = {
      page: pagination.current,
      pageSize: pagination.pageSize,
    };
    let values = { ...this.state.params, ...data };
    this.setState({
      params: values,
    });
    this.queryListData(values);
  };

  // 创建查询主体
  createFormMan() {
    const { form, userManage } = this.props;
    const { getFieldDecorator, getFieldsValue } = form;
    const { orgList } = userManage;
    const { orgAllList } = userManage;
    let target = this.getTreeData(orgAllList);
    return (
      <Form onSubmit={this.handleSearch.bind(this)} layout="inline">
        <FormItem style={{ marginTop: -5 }} className={globalStyles.left}>
          {getFieldDecorator('orgId')(
            <TreeSelect
              placeholder="请选择部门"
              value={this.state.orgId}
              style={{ width: 160 }}
              allowClear={true}
              treeData={target}
              dropdownStyle={{ maxHeight: 400, overflow: 'scroll' }}
            >
              {/*  {orgOptions} */}
            </TreeSelect>,
          )}
        </FormItem>
        <FormItem
          className={globalStyles.left}
          style={{ width: 160, marginLeft: 10, marginTop: -5 }}
        >
          {getFieldDecorator('nikeName')(<Input placeholder="请输入工号" />)}
        </FormItem>
        <FormItem
          className={globalStyles.left}
          style={{ width: 160, marginLeft: 10, marginTop: -5 }}
        >
          {getFieldDecorator('realName')(<Input placeholder="请输入姓名" />)}
        </FormItem>
        <FormItem className={globalStyles.left} style={{ marginLeft: 10, marginTop: -5 }}>
          <Button type="primary" htmlType="submit">
            查询
          </Button>
        </FormItem>
      </Form>
    );
  }

  // 触发查询按钮
  handleSearch(e) {
    e.preventDefault();
    let valObj = this.props.form.getFieldsValue();
    let values = { ...this.state.params, ...valObj };
    this.setState({
      params: values,
    });
    this.queryListData(values);
  }

  // 停用用户
  removeOneUser(record) {
    let { dispatch } = this.props;
    dispatch({
      type: 'userManage/removeOneUser',
      payload: {
        id: record.id,
      },
    });
    message.success('停用成功！');
    this.queryListData(this.state.params);
  }

  resetPassword(record) {
    let { dispatch } = this.props;
    dispatch({
      type: 'userManage/resetUserPassword',
      payload: {
        id: record.id,
      },
    });
    message.success('重置成功！');
    this.queryListData(this.state.params);
  }

  // 打开modal
  openModalForm(userInfo, type) {
    const { dispatch } = this.props;
    dispatch({
      type: 'userManage/getUserInfo',
      payload: {
        id: userInfo.id,
      },
    });
    const typeModal = type === 'update' ? '编辑用户' : '添加用户';
    this.setState({
      ...this.state,
      modalVisible: true,
      formType: type,
      modalTitle: typeModal,
    });
  }

  handleModalVisible = flag => {
    this.setState({
      modalVisible: !!flag,
    });
  };

  handleUpdateUser(data) {
    const { dispatch } = this.props;
    dispatch({
      type: 'userManage/createUser',
      payload: data,
    }).then(res => {
      message.success('保存成功！');
      this.handleModalVisible();
      this.queryListData(this.state.params);
    });
  }

  // 点击保存按钮
  handleCreate = e => {
    e.preventDefault();
    this.refs.formRef.validateFields((error, values) => {
      if (!error) {
        //验证通过
        values.user.associatedUserId =
          values.user.associatedUserId && values.user.associatedUserId.length
            ? values.user.associatedUserId.join(',')
            : '';
        if (this.state.formType === 'add') {
          const data = {
            org: { id: values.orgId },
            roleList: this.getRoleList(values.roleOfUser),
            user: {
              ...values.user,
              //password: pwd,
              sysId: 1,
            },
          };
          this.handleUpdateUser(data);
        } else {
          const data = {
            id: this.props.userManage.currentUserInfo.id,
            org: { id: values.orgId },
            roleList: this.getRoleList(values.roleOfUser),
            user: {
              ...values.user,
              sysId: 1,
              id: this.props.userManage.currentUserInfo.user.id,
            },
          };
          this.handleUpdateUser(data);
        }
      }
    });
  };

  // 转化角色列表为obj
  getRoleList(data) {
    let obj = [];
    if (data && data.length) {
      data.forEach(item => {
        obj.push({
          id: item,
        });
      });
    }
    return obj;
  }

  render() {
    const { modalVisible, formType, orgName, parentId } = this.state;
    const { userManage, loading } = this.props;
    const { userListData, orgList, userAllList, currentUserInfo } = userManage;
    const roleAllList = this.props.roleManage.roleList;
    return (
      <div>
        <div className={globalStyles.headBox}>
          <div className={globalStyles.searchBox}>
            <Row>
              <Col>
                <Button
                  icon="plus"
                  type="primary"
                  className={globalStyles.right}
                  onClick={() => this.openModalForm({}, 'add')}
                >
                  添加用户
                </Button>
                {this.createFormMan()}
              </Col>
            </Row>
          </div>
        </div>
        <div className={globalStyles.tableBox}>
          <StandardTable
            loading={loading}
            data={userListData}
            columns={this.columns}
            scroll={{ x: 1460, y: 'calc(100vh - 380px)' }}
            onChange={this.handleTableChangeFun}
            onRow={record => {
              return {
                // onClick: event => {}, // 点击行
                onDoubleClick: event => {
                  this.openModalForm(record, 'update');
                },
                // onContextMenu: event => {},
                // onMouseEnter: event => {}, // 鼠标移入行
                // onMouseLeave: event => {},
              };
            }}
          />
        </div>
        <Modal
          destroyOnClose
          centered
          width="40%"
          visible={modalVisible}
          title={this.state.modalTitle}
          maskClosable={false}
          onOk={this.handleCreate}
          onCancel={() => this.handleModalVisible(false)}
          okText="保存"
          cancelText="关闭"
        >
          <AddUserForm
            roleAllList={roleAllList}
            orgAllList={orgList}
            userAllList={userAllList}
            type={formType}
            ref="formRef"
            // wrappedComponentRef={form => (this.formRef = form)}
            {...currentUserInfo}
          />
        </Modal>
      </div>
    );
  }
}

export default UserManagement;
