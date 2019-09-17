import { connect } from 'dva';
import React, { Component } from 'react';
import {
  Form,
  Modal,
  Button,
  Col,
  Row,
  Input,
  Icon,
  Link,
  Pagination,
  message,
  Tooltip,
} from 'antd';
import styles from './style.less';
import Search from 'antd/es/input/Search';
import StandardTable from '@/components/TableList/tableList';
import RoleManagerForm from './components/RoleManagerForm.jsx';
import moment from 'moment';
import globalStyles from '@/global.less';

const FormItem = Form.Item;

@connect(({ roleManage }) => ({
  roleManage,
}))
@Form.create()
class RoleManagement extends Component {
  state = {
    params: {
      page: '1',
      pageSize: '20',
      sysId: '1',
      roleName: '',
    },
    modalVisible: false,
    currentRole: {},
    modalTitle: '',
  };

  roleManagerForm = undefined;

  constructor(props) {
    super(props);
  }

  /**
   * 获取当前角色信息
   */
  getSingleRole(currentRoleId) {
    let { dispatch } = this.props;
    dispatch({
      type: 'roleManage/getSingleRole',
      payload: {
        roleId: currentRoleId,
      },
    });
  }

  //停用角色
  removeSingleRole = record => {
    let { dispatch } = this.props;
    dispatch({
      type: 'roleManage/removeSingleRole',
      payload: {
        ...record,
      },
    }).then(res => {
      message.success('停用成功！');
      this.getRoleData(this.state.params);
    });
  };

  // 表格表头列
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
      title: '角色',
      dataIndex: 'roleName',
      key: 'roleName',
      width: 180,
      align: 'center',
    },
    {
      title: '物理名称',
      dataIndex: 'roleCode',
      key: 'roleCode',
      width: 180,
      align: 'center',
    },
    {
      title: '描述',
      dataIndex: 'remark',
      key: 'remark',
      align: 'left',
    },
    {
      title: '创建人',
      dataIndex: 'creator',
      key: 'creator',
      width: 180,
      align: 'center',
    },
    {
      title: '创建日期',
      dataIndex: 'createDate',
      key: 'createDate',
      width: 180,
      align: 'center',
      render: text => {
        return <div>{moment(text).format('YYYY-MM-DD')}</div>;
      },
    },
    {
      title: '操作',
      fixed: 'right',
      align: 'center',
      width: 200,
      render: (text, record, index) => {
        return (
          <div>
            <Tooltip title="编辑">
              <Icon
                type="edit"
                theme="twoTone"
                style={{ marginRight: '10px' }}
                onClick={() => {
                  this.getSingleRole(record.id);
                  this.openModalForm(record, 'update');
                }}
              />
            </Tooltip>
            <Tooltip title="停用">
              <Icon
                type="stop"
                theme="twoTone"
                style={{ marginLeft: '10px' }}
                rotate="90"
                onClick={() => {
                  Modal.confirm({
                    content: '确认要停用该角色?',
                    onOk: () => {
                      this.removeSingleRole(record);
                    },
                    okText: '确认停用',
                    cancelText: '取消',
                  });
                }}
              />
            </Tooltip>
          </div>
        );
      },
    },
  ];

  // 初始化页面
  componentDidMount() {
    this.getRoleData(this.state.params);
  }

  // 获取角色列表数据
  getRoleData = params => {
    const { dispatch } = this.props;
    dispatch({
      type: 'roleManage/getRoleList',
      payload: params,
    });
  };
  // 当表格分页发生改变时
  handleTableChangeFun = pagination => {
    let data = {
      page: pagination.current,
      pageSize: pagination.pageSize,
    };
    let values = { ...this.state.params, ...data };
    this.setState({
      params: values,
    });
    this.getRoleData(values);
  };

  // 查询框组件
  createForm() {
    const { form } = this.props;
    const { getFieldDecorator, getFieldsValue, setFieldsValue } = form;
    return (
      <Form onSubmit={this.handleSearch.bind(this)} layout="inline">
        <FormItem
          className={globalStyles.left}
          style={{ width: 160, marginLeft: 10, marginTop: -5 }}
        >
          {getFieldDecorator('roleName')(<Input placeholder="请输入角色进行查询" />)}
        </FormItem>
        <FormItem
          className={globalStyles.left}
          style={{ width: 240, marginTop: -5, marginLeft: 5 }}
        >
          <Button type="primary" htmlType="submit">
            查询
          </Button>
        </FormItem>
      </Form>
    );
  }

  handleSearch(e) {
    e.preventDefault();
    let valObj = this.props.form.getFieldsValue();
    let values = { ...this.state.params, ...valObj };
    this.setState({
      params: values,
    });
    this.getRoleData(values);
  }

  // 打开modal
  openModalForm(record, type) {
    const typeModal = type === 'update' ? '编辑角色' : '添加角色';
    this.setState({
      ...this.state,
      modalVisible: true,
      currentRole: record,
      modalTitle: typeModal,
    });
  }

  saveRole(roleObj) {
    let { dispatch } = this.props;
    dispatch({
      type: 'roleManage/addRole',
      payload: {
        ...roleObj,
      },
    }).then(res => {
      message.success('保存成功！');
      this.setState({
        ...this.state,
        modalVisible: false,
      });
      this.getRoleData(this.state.params);
    });
  }

  resetSingleRole(roleObj) {
    let { dispatch } = this.props;
    dispatch({
      type: 'roleManage/resetSingleRole',
      payload: roleObj,
    });
  }

  render() {
    const {
      roleManage: { data },
      loading,
    } = this.props;
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
                  onClick={() => {
                    this.resetSingleRole({});
                    this.openModalForm({}, 'add');
                  }}
                >
                  添加角色
                </Button>
                {this.createForm()}
              </Col>
            </Row>
          </div>
        </div>
        <div className={globalStyles.tableOneBox}>
          <StandardTable
            loading={loading}
            data={data}
            columns={this.columns}
            scroll={{ x: 1200, y: 'calc(100vh - 380px)' }}
            onChange={this.handleTableChangeFun}
            onRow={record => {
              return {
                // onClick: event => {}, // 点击行
                onDoubleClick: e => {
                  this.getSingleRole(record.id);
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
          width={'60%'}
          title={this.state.modalTitle}
          onCancel={() => {
            this.setState({
              ...this.state,
              modalVisible: false,
              currentRole: {},
            });
          }}
          onOk={() => {
            this.refs.roleManagerForm.validateFields((errors, values) => {
              let obj = {};
              if (this.roleManagerForm) {
                let roleVsMenuList = this.roleManagerForm.getRoleVsMenuList();
                roleVsMenuList.forEach(item => {
                  delete item.id;
                });
                obj.roleVsMenuList = roleVsMenuList;
              }
              obj.id = values.id;
              obj.role = values;
              obj.role.sysId = '1';
              this.saveRole(obj);
            });
          }}
          visible={this.state.modalVisible}
          okText="保存"
          cancelText="关闭"
        >
          <div>
            <RoleManagerForm
              setRef={item => {
                this.roleManagerForm = item;
              }}
              ref={'roleManagerForm'}
              currentRole={this.state.currentRole}
            />
          </div>
        </Modal>
      </div>
    );
  }
}

export default RoleManagement;
