import { Component } from 'react';
import { connect } from 'dva';
import {
  Form,
  Modal,
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
  Tree,
} from 'antd';
import Button from 'antd/es/button';
import Search from 'antd/es/input/Search';
import globalStyles from '@/global.less';
import OrgForm from './components/OrgForm';

@connect(({ orgaManage, userManage }) => ({ orgaManage, userManage }))
class Organization extends Component {
  state = {
    showEditModal: false,
    showTree: false,
    modalTitle: '',
    currentOrg: {},
    params: {
      orgName: '',
      sysId: 1,
      parentId: '',
      dataSource: [],
      showSearch: false,
    },
  };

  constructor(props) {
    super(props);
  }

  // 页面初始化
  componentDidMount() {
    this.getOrgList(this.state.params);
    // this.initData();
  }

  initData() {
    let { form, orgaManage } = this.props;
    let { orgAllList } = orgaManage;
    console.log(orgAllList);
    this.setState({
      ...this.state,
      dataSource: this.getTreeData(orgAllList),
    });
  }

  // 请求列表数据
  getOrgList = params => {
    const { dispatch } = this.props;
    dispatch({
      type: 'orgaManage/getAllOrg',
      payload: params,
      callback: () => {
        this.initData();
      },
    });
  };

  getTreeData(orgAllList) {
    let target = [];
    target = orgAllList.filter(item => item.parentId === '0');
    (target = target.map(value => {
      return {
        ...value,
        key: value.id,
        title: value.orgName,
        children: [],
      };
    })),
      target.forEach(item => {
        orgAllList.forEach(item1 => {
          if (item1.parentId == item.key) {
            let obj = {
              ...item1,
              key: item1.id,
              title: item1.orgName,
            };
            item.children.push(obj);
          }
        });
      });
    //console.log(target);
    return target;
  }

  //查询
  getSearchData(value, orgAllList) {
    let queryResult = [];
    let newTarget = []; //根据搜索值过滤得到的数组
    let ParCompany = []; //父级公司
    let delParCompany = []; //查询结果
    ParCompany = orgAllList.filter(item => item.parentId === '0'); //父级公司
    console.log(ParCompany);
    newTarget = orgAllList.filter(item => item.orgName.indexOf(value) > -1); //根据搜索值过滤全部,得到非树形结果
    //newParTarget=newTarget.filter(item => item.parentId === '0');//从搜索后的结果中筛出公司
    console.log(newTarget);
    (ParCompany = ParCompany.map(value => {
      return {
        ...value,
        key: value.id,
        title: value.orgName,
        children: [],
      };
    })),
      ParCompany.forEach(item => {
        newTarget.forEach(item1 => {
          if (item1.parentId == item.key) {
            let obj = {
              ...item1,
              key: item1.id,
              title: item1.orgName,
            };
            item.children.push(obj);
          }
        });
      });
    delParCompany = ParCompany.filter(
      item => item.children.length == [] && item.orgName.indexOf(value) < 0,
    ); //将不含搜索词并且不含搜索词的子级的父级拿出
    if (delParCompany == []) {
      //如果所有公司都包含查询条件
      queryResult = ParCompany;
    } else {
      //如果部分公司不符合查询条件，也没有符合条件的子级，就删除
      queryResult = ParCompany.concat(delParCompany).filter(function(v, i, arr) {
        return arr.indexOf(v) == arr.lastIndexOf(v);
      });
    }
    console.log(delParCompany);
    console.log(queryResult);
    console.log(queryResult.key);
    return queryResult;
  }

  //删除机构
  removeOrg(id) {
    let { dispatch } = this.props;
    dispatch({
      type: 'orgaManage/removeOrg',
      payload: id,
    }).then(res => {
      message.success('停用成功！');
      this.getOrgList(this.state.params);
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
      title: '机构名称',
      width: 350,
      align: 'left',
      dataIndex: 'orgName',
      key: 'orgName',
    },
    {
      title: '机构编码',
      width: 200,
      align: 'center',
      dataIndex: 'orgCode',
      key: 'orgCode',
    },
    {
      title: '创建日期',
      width: 200,
      align: 'center',
      dataIndex: 'createDate',
      key: 'createDate',
      render: (text, record, index) => {
        if (text) {
          let date = new Date(text);
          let year = date.getFullYear();
          let month = (date.getMonth() + 1).toString().padStart(2, '0');
          let day = date
            .getDate()
            .toString()
            .padStart(2, 0);
          return <div>{year + '-' + month + '-' + day}</div>;
        } else {
          return <div>-</div>;
        }
      },
    },
    {
      title: '备注',
      dataIndex: 'remark',
      key: 'remark',
      align: 'left',
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
                    content: '是否确认停用名称为：' + record.orgName + ' 的机构？',
                    onOk: () => {
                      this.removeOrg(record.id);
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
      currentOrg: {},
      showTree: false,
    });
  };

  // 打开modal
  openModalForm(record, type) {
    const typeModal = type === 'update' ? '编辑机构' : '新增机构';
    this.setState({
      ...this.state,
      currentOrg: record,
      showEditModal: true,
      showTree: false,
      modalTitle: typeModal,
    });
  }

  //保存机构
  saveOrg(orgObj) {
    let { dispatch } = this.props;
    dispatch({
      type: 'orgaManage/addOrg',
      payload: {
        ...this.state.currentOrg,
        ...orgObj,
        sysId: '1',
      },
    }).then(res => {
      message.success('保存成功！');
      this.setState({
        ...this.state,
        showEditModal: false,
      });
      this.getOrgList(this.state.params);
    });
  }

  render() {
    const { columns, onChange, scroll, onRow } = this.props;
    let { form, orgaManage } = this.props;
    let { orgAllList } = orgaManage;
    let ParCompany = [];

    ParCompany = orgAllList.filter(item => item.parentId === '0'); //父级公司
    //let target = this.getTreeData(orgAllList);
    //console.log(target);
    // this.initData();
    let tableContent = <Table />;
    if (this.state.showSearch) {
      tableContent = (
        <Table
          columns={this.columns}
          dataSource={this.state.dataSource}
          expandedRowKeys={[
            'b923179f-ba52-11e9-8f49-1418772e7691',
            'b9231c2b-ba52-11e9-8f49-1418772e7691',
            'b9231e06-ba52-11e9-8f49-1418772e7691',
            'b9231fa5-ba52-11e9-8f49-1418772e7691',
            'b9232143-ba52-11e9-8f49-1418772e7691',
            'b92322d7-ba52-11e9-8f49-1418772e7691',
            'b9232467-ba52-11e9-8f49-1418772e7691',
          ]}
          onRow={record => {
            return {
              onDoubleClick: e => {
                this.openModalForm(record, 'update');
              },
            };
          }}
          scroll={{ x: 1360, y: 'calc(100vh - 380px)' }}
          pagination={false}
        />
      );
    } else {
      tableContent = (
        <Table
          columns={this.columns}
          dataSource={this.state.dataSource}
          onRow={record => {
            return {
              onDoubleClick: e => {
                this.openModalForm(record, 'update');
              },
            };
          }}
          scroll={{ x: 1360, y: 'calc(100vh - 380px)' }}
          pagination={false}
        />
      );
    }
    let modalContent = <div />;
    if (this.state.showTree) {
      modalContent = <Tree treeData={target} />;
    } else {
      modalContent = <OrgForm ref="orgForm" {...this.state.currentOrg} />;
    }

    return (
      <div>
        <div className={globalStyles.headBox}>
          <div className={globalStyles.searchBox}>
            <Row>
              <Col>
                <Button
                  type={'primary'}
                  className={globalStyles.right}
                  onClick={e => {
                    this.setState({
                      ...this.state,
                      showEditModal: true,
                      modalTitle: '树状结构查看',
                      showTree: true,
                    });
                  }}
                  icon={'more'}
                >
                  树状结构查看
                </Button>
                <Button
                  icon="plus"
                  type="primary"
                  className={globalStyles.right}
                  onClick={() => {
                    this.openModalForm({}, 'add');
                  }}
                >
                  新增
                </Button>
                <Search
                  placeholder="请输入机构名称查询"
                  onSearch={(value, event) => {
                    event.preventDefault();
                    this.setState({
                      dataSource: this.getSearchData(value, orgAllList),
                      showSearch: true,
                    });
                  }}
                  style={{ width: 240 }}
                  className={globalStyles.left}
                  enterButton="查询"
                />
              </Col>
            </Row>
          </div>
        </div>
        <div className={globalStyles.tableOneBox}>
          {tableContent}
          {/*  <Table
            columns={this.columns}
            dataSource={this.state.dataSource}
            expandedRowKeys={[
              'b923179f-ba52-11e9-8f49-1418772e7691', 
              'b9231c2b-ba52-11e9-8f49-1418772e7691', 
              'b9231e06-ba52-11e9-8f49-1418772e7691',
              'b9231fa5-ba52-11e9-8f49-1418772e7691',
              'b9232143-ba52-11e9-8f49-1418772e7691',
              'b92322d7-ba52-11e9-8f49-1418772e7691',
              'b9232467-ba52-11e9-8f49-1418772e7691']}
            onRow={record => {
              return {
                onDoubleClick: e => {
                  this.openModalForm(record, 'update');
                },
              };
            }}
            scroll={{ x: 1360, y: 'calc(100vh - 380px)' }}
            pagination={false}
          /> */}
          {/*<span style={{ width: '100%', paddingLeft: '95%' }}> 共 {orgAllList.length} 条</span>*/}
        </div>
        <Modal
          visible={this.state.showEditModal}
          onOk={() => {
            // alert('ok')
            this.refs.orgForm.validateFields((error, values) => {
              if (!error) {
                //验证通过
                this.saveOrg(values);
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
          {modalContent}
        </Modal>
      </div>
    );
  }
}

export default Organization;
