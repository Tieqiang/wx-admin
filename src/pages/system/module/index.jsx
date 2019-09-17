import { Component } from 'react';
import { connect } from 'dva';
import { PageHeader, message, Modal, Input, Row, Col, Tooltip, Table, Icon } from 'antd';
import Search from 'antd/es/input/Search';
import Button from 'antd/es/button';
import ModuleForm from './components/ModuleForm';
import moment from 'moment';
import globalStyles from '@/global.less';

@connect(({ moduleManage }) => ({ moduleManage }))
class Modules extends Component {
  state = {
    params: {
      moduleName: '',
    },
    showEditModal: false,
    modalTitle: '',
    currentModule: {},
  };

  constructor(props) {
    super(props);
  }

  // 页面初始化
  componentDidMount() {
    this.getListData(this.state.params);
  }

  // 请求列表数据
  getListData = params => {
    const { dispatch } = this.props;
    dispatch({
      type: 'moduleManage/moduleList',
      payload: params,
    });
  };

  //保存模块
  saveModule(moduleObj) {
    let { dispatch } = this.props;
    dispatch({
      type: 'moduleManage/addModule',
      payload: {
        ...this.state.currentModule,
        ...moduleObj,
      },
    }).then(res => {
      message.success('保存成功！');
      this.setState({
        ...this.state,
        showEditModal: false,
      });
      this.getListData(this.state.params);
      //console.log(moduleObj);
    });
  }

  removeModule(id) {
    let { dispatch } = this.props;
    dispatch({
      type: 'moduleManage/removeModule',
      payload: id,
    }).then(res => {
      message.success('停用成功！');
      this.getListData(this.state.params);
    });
  }

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
      title: '模块名称',
      width: 300,
      align: 'center',
      dataIndex: 'moduleName',
      key: 'moduleName',
    },
    {
      title: '创建日期',
      width: 200,
      align: 'center',
      dataIndex: 'createDate',
      key: 'createDate',
      render: (text, record, index) => {
        return <div>{moment(text).format('YYYY-MM-DD')}</div>;
      },
    },
    {
      title: '创建者',
      width: 220,
      align: 'center',
      dataIndex: 'creator',
      key: 'creator',
    },
    {
      title: '备注',
      dataIndex: 'remark',
      align: 'left',
      key: 'remark',
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
                  this.openModal(record, 'update');
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
                    content: '是否确认停用名称为：' + record.moduleName + ' 的模块？',
                    onOk: () => {
                      this.removeModule(record.id);
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

  closeModal = () => {
    this.setState({
      ...this.state,
      showEditModal: false,
      currentModule: {},
    });
  };

  //打开Modal窗口
  openModal = (record, type) => {
    const typeModal = type === 'add' ? '新增模块' : '编辑模块';
    this.setState({
      ...this.state,
      showEditModal: true,
      currentModule: record,
      modalTitle: typeModal,
    });
  };

  render() {
    const { moduleManage } = this.props;
    const { data, moduleAllList } = moduleManage;
    console.log(moduleAllList);
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
                    this.openModal({}, 'add');
                  }}
                >
                  新增
                </Button>
                <Search
                  style={{ width: '240px' }}
                  className={globalStyles.left}
                  enterButton="查询"
                  placeholder="请输入模块名称查询"
                  onSearch={value => {
                    let params = {
                      ...this.state.params,
                      moduleName: value,
                    };
                    this.setState({
                      ...this.state,
                      params,
                    });
                    this.getListData(params);
                  }}
                />
              </Col>
            </Row>
          </div>
        </div>
        <div className={globalStyles.tableOneBox}>
          <Table
            dataSource={moduleAllList}
            rowKey="id"
            onRow={record => {
              return {
                // onClick: event => {}, // 点击行
                onDoubleClick: event => {
                  this.openModal(record, 'update');
                },

                // onContextMenu: event => {},
                // onMouseEnter: event => {}, // 鼠标移入行
                // onMouseLeave: event => {},
              };
            }}
            scroll={{ x: 1360, y: 'calc(100vh - 380px)' }}
            columns={this.columns}
            pagination={false}
          />
          {/* <span style={{ width: '100%', paddingLeft: '95%' }}> 共 {moduleAllList.length} 条</span> */}
        </div>
        <Modal
          visible={this.state.showEditModal}
          onOk={() => {
            alert('ok');
            this.refs.moduleForm.validateFields((error, values) => {
              if (!error) {
                //验证通过
                this.saveModule(values);
              }
            });
          }}
          onCancel={() => {
            this.closeModal();
          }}
          title={this.state.modalTitle}
          okText="保存"
          cancelText="关闭"
        >
          <ModuleForm ref="moduleForm" {...this.state.currentModule} />
        </Modal>
      </div>
    );
  }
}
export default Modules;
