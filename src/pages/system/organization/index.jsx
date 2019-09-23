import React, {Component} from 'react';
import {connect} from 'dva';
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

@connect(({orgaManage, userManage}) => ({orgaManage, userManage}))
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
    let {form, orgaManage} = this.props;
    let {orgAllList} = orgaManage;
    this.setState({
      ...this.state,
      dataSource: this.getTreeData(orgAllList),
    });
  }

  // 请求列表数据
  getOrgList = params => {
    const {dispatch} = this.props;
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

    //添加key,title,children字段
    target = orgAllList.map(value => {
      return {
        ...value,
        key: value.id,
        title: value.orgName,
        children: [],
      };
    });

    //根据parentId 添加到children中去。此处要理解对象的引用属性
    target.forEach(item => {
      target.forEach(item1 => {
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

    //过滤出所有的顶级元素
    target = target.filter(item => item.parentId === '0');
    return target;
  }

  //查询
  getSearchData(value, orgAllList) {
    let queryResult = [];
    let newTarget = []; //根据搜索值过滤得到的数组
    let ParCompany = []; //父级公司
    let delParCompany = []; //查询结果
    ParCompany = orgAllList.filter(item => item.parentId === '0'); //父级公司
    newTarget = orgAllList.filter(item => item.orgName.indexOf(value) > -1); //根据搜索值过滤全部,得到非树形结果
    //newParTarget=newTarget.filter(item => item.parentId === '0');//从搜索后的结果中筛出公司
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
      queryResult = ParCompany.concat(delParCompany).filter(function (v, i, arr) {
        return arr.indexOf(v) == arr.lastIndexOf(v);
      });
    }
    return queryResult;
  }

  //删除机构
  removeOrg(id) {
    let {dispatch} = this.props;
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
                style={{marginRight: '10px'}}
                onClick={() => {
                  this.openModalForm(record, 'update');
                }}
              />
            </Tooltip>
            <Tooltip title="停用">
              <Icon
                type="stop"
                theme="twoTone"
                style={{marginLeft: '10px'}}
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
    let {dispatch} = this.props;
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
    const {columns, onChange, scroll, onRow} = this.props;
    let {form, orgaManage} = this.props;
    let {orgAllList} = orgaManage;
    let ParCompany = [];

    ParCompany = orgAllList.filter(item => item.parentId === '0'); //父级公司
    let tableContent = (
      <Table
        columns={this.columns}
        dataSource={this.state.dataSource}
        expandIcon={props => {
          let {record, expandable, expanded} = props;
          if (expandable && record.children.length > 0) {
            if (expanded) {
              return (<Icon type={"folder-open"} theme={"twoTone"} style={{marginRight: 5}}/>)
            } else {
              return (<Icon type="folder" style={{marginRight: 5}} theme={"twoTone"}/>)
            }
          } else {
            return (<span/>)
          }

        }}
        expandRowByClick={true}
        indentSize={30}
        onRow={record => {
          return {
            onDoubleClick: e => {
              this.openModalForm(record, 'update');
            },
          };
        }}
        scroll={{x: 1360, y: 'calc(100vh - 380px)'}}
        pagination={false}
      />
    );

    let modalContent = <div/>;
    if (this.state.showTree) {
      modalContent = <Tree treeData={target}/>;
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
                  style={{width: 240}}
                  className={globalStyles.left}
                  enterButton="查询"
                />
              </Col>
            </Row>
          </div>
        </div>
        <div className={globalStyles.tableOneBox}>
          {tableContent}
        </div>
        <Modal
          visible={this.state.showEditModal}
          onOk={() => {
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
