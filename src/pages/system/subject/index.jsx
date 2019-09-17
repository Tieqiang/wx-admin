import { Component } from 'react';
import { connect } from 'dva';
import {
  PageHeader,
  message,
  Modal,
  Row,
  Col,
  Menu,
  Dropdown,
  Icon,
  Input,
  Table,
  Tooltip,
} from 'antd';
import Button from 'antd/es/button';
import Search from 'antd/es/input/Search';
import SubjectTree from './components/SubjectTree';
import SubjectForm from './components/SubjectForm';
import globalStyles from '@/global.less';

@connect(({ subject }) => ({ subject }))
class Subject extends Component {
  state = {
    currentDb: {
      name: '数据库类别',
      id: '',
    },
    current: 1,
    size: 20,
    keyword: '',
    modalShowFlag: false,
    modalTitle: '',
    showTree: false,
    currentSubject: {
      id: '',
      typeName: '',
      subjectClass: {
        id: '',
        subjectName: '',
        parentId: '',
        remark: '',
        synonym: '',
      },
    },
  };

  loadDbType() {
    let { dispatch } = this.props;
    dispatch({
      type: 'subject/getDbTypes',
      payload: {},
    });
  }

  loadSubjectClasses(subjectName, dbTypeId, page = 1, pageSize = 20) {
    let { dispatch } = this.props;
    dispatch({
      type: 'subject/loadSubjectPage',
      payload: {
        subjectName: subjectName,
        orgDbTypeId: dbTypeId,
        page: page,
        pageSize: pageSize,
      },
    });
  }

  loadAllSubjectClasses() {
    let { dispatch } = this.props;
    dispatch({
      type: 'subject/getAllSubject',
      payload: {},
    });
  }

  /**
   * 构造器
   * @param props
   */
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.loadDbType();
    this.loadSubjectClasses();
    this.loadAllSubjectClasses();
  }

  //删除主题分类
  removeSubject(id) {
    let { dispatch } = this.props;
    dispatch({
      type: 'subject/removeSubject',
      payload: id,
    }).then(res => {
      message.success('停用成功！');
      this.loadSubjectClasses(
        this.state.keyword,
        this.state.currentDb.id == '00' ? '' : this.state.currentDb.id,
      );
    });
  }

  saveSubject(subject) {
    let { dispatch } = this.props;
    dispatch({
      type: 'subject/saveSubject',
      payload: subject,
    }).then(res => {
      this.setState({
        ...this.state,
        modalShowFlag: false,
      });
      message.success('保存成功！');
      this.setState({
        ...this.state,
        currentSubject: {
          id: '',
          typeName: '',
          subjectClass: {
            id: '',
            subjectName: '',
            parentId: '',
            remark: '',
            synonym: '',
          },
        },
      });
      this.loadSubjectClasses(
        this.state.keyword,
        this.state.currentDb.id == '00' ? '' : this.state.currentDb.id,
      );
    });
  }

  openModalForm(record, type) {
    const typeModal = type === 'update' ? '编辑主题分类' : '添加主题分类';
    this.setState({
      ...this.state,
      currentSubject: type === 'add' ? this.state.currentSubject : record,
      modalShowFlag: true,
      showTree: false,
      modalTitle: typeModal,
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
      title: '名称',
      dataIndex: 'subjectClass.subjectName',
      key: 'subjectClass.subjectName',
      align: 'center',
    },
    {
      title: '数据库类别',
      align: 'left',
      dataIndex: 'subjectClass.orgDbTypeId',
      key: 'subjectClass.orgDbTypeId',
      width: 120,
      filters: [
        { text: '政府部门', value: 'org_db_type_1' },
        { text: '科研机构', value: 'org_db_type_2' },
        { text: '医疗机构', value: 'dorg_db_type_3' },
        { text: '政策法规', value: 'document_db_type_0' },
        { text: '行业标准', value: 'document_db_type_1' },
        { text: '行业专利', value: 'document_db_type_2' },
        { text: '发文咨讯', value: 'document_db_type_3' },
        { text: '会议报告', value: 'document_db_type_4' },
        { text: '新闻事件', value: 'document_db_type_5' },
        { text: '竞争对手', value: 'company_type_1' },
        { text: '合作企业', value: 'company_type_2' },
        { text: '生态企业', value: 'dcompany_type_3' },
        { text: '政府官员', value: 'person_db_type_01' },
        { text: '专家学者', value: 'person_db_type_02' },
        { text: '企业领导', value: 'person_db_type_03' },
        { text: '销售/市场人员', value: 'person_db_type_04' },
      ],
      filterMultiple: true,
      render: (text, record) => {
        let { subject } = this.props;
        let item = subject.DbTypes.find(item => {
          return item.id === record.subjectClass.orgDbTypeId;
        });
        if (item) {
          return <div>{item.typeName}</div>;
        } else {
          return <div>{text}</div>;
        }
      },
    },

    {
      title: '父级分类',
      dataIndex: 'subjectClass.parentId',
      key: 'subjectClass.parentId',
      width: 210,
      align: 'center',
      render: (text, record, index) => {
        let { subject } = this.props;
        let subjectClass = subject.AllSubject.find(value => {
          return value.subjectClass.id == text;
        });
        if (subjectClass) {
          return <div>{subjectClass.subjectClass.subjectName}</div>;
        } else {
          return <div>--</div>;
        }
      },
    },
    {
      title: '创建日期',
      dataIndex: 'subjectClass.createDate',
      key: 'subjectClass.createDate',
      width: 200,
      align: 'center',
      render: text => {
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
      title: '创建者',
      dataIndex: 'subjectClass.creator',
      key: 'subjectClass.creator',
      width: 200,
      align: 'center',
    },
    {
      title: '备注',
      dataIndex: 'subjectClass.remark',
      key: 'subjectClass.remark',
      align: 'left',
      width: 200,
    },
    {
      title: '操作',
      width: 200,
      align: 'center',
      fixed: 'right',
      render: (text, record, index) => {
        return (
          <div>
            <Tooltip title="编辑">
              <Icon
                type="edit"
                theme="twoTone"
                style={{ marginRight: '10px' }}
                onClick={e => {
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
                onClick={e => {
                  Modal.confirm({
                    content:
                      '确认要删除名称为：' + record.subjectClass.subjectName + '的主题分类？',
                    onOk: () => {
                      this.removeSubject(record.id);
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

  render() {
    let { subject } = this.props;
    /* let menuItems =
      subject && subject.DbTypes instanceof Array
        ? subject.DbTypes.map(dbType => {
            return <Menu.Item key={dbType.id}>{dbType.typeName}</Menu.Item>;
          })
        : [];
    menuItems.push(<Menu.Item key={'00'}>全部</Menu.Item>);
    let menus = (
      <Menu
        onClick={e => {
          this.dbTypeClick(e, subject.DbTypes);
        }}
      >
        {menuItems}
      </Menu>
    ); */

    let current = subject.SubjectPage ? subject.SubjectPage.current : 1;
    let size = subject.SubjectPage ? subject.SubjectPage.size : 20;
    let total = subject.SubjectPage ? subject.SubjectPage.total : 0;
    let modalContent = <div />;
    if (this.state.showTree) {
      modalContent = <SubjectTree treeData={subject.AllSubject} dbTypes={subject.DbTypes} />;
    } else {
      modalContent = <SubjectForm dbTypes={subject.DbTypes} ref="subjectForm" {...this.state} />;
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
                      modalShowFlag: true,
                      modalTitle: '树状结构查看',
                      showTree: true,
                    });
                  }}
                  icon={'more'}
                >
                  树状结构查看
                </Button>
                <Button
                  type={'primary'}
                  className={globalStyles.right}
                  icon="plus"
                  onClick={() => {
                    this.openModalForm({}, 'add');
                  }}
                >
                  添加
                </Button>
                <Input.Search
                  className={globalStyles.left}
                  placeholder={'请输入主题分类名称'}
                  enterButton={'查询'}
                  style={{ width: 240 }}
                  onSearch={value => {
                    this.setState({
                      ...this.state,
                      keyword: value,
                    });
                    this.loadSubjectClasses(
                      value,
                      this.state.currentDb.id === '00' ? '' : this.state.currentDb.id,
                    );
                  }}
                />
              </Col>
            </Row>
          </div>
        </div>

        <div className={globalStyles.tableOneBox}>
          <Table
            columns={this.columns}
            size="small"
            rowKey={'id'}
            scroll={{ x: 1240, y: 'calc(100vh - 245px)' }}
            onChange={(pagination, filters) => {
              this.setState({
                ...this.state,
                params: {
                  ...this.state.params,
                  page: pagination.current,
                  pageSize: pagination.pageSize,
                  orgDbTypeId: filters['subjectClass.orgDbTypeId']
                    ? filters['subjectClass.orgDbTypeId'].join(',')
                    : '',
                },
              });
              this.loadSubjectClasses(
                this.state.subjectName,
                filters['subjectClass.orgDbTypeId']
                  ? filters['subjectClass.orgDbTypeId'].join(',')
                  : '',
                pagination.current,
                pagination.pageSize,
              );
            }}
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
            pagination={{
              showSizeChanger: true,
              showQuickJumper: true,
              pageSizeOptions: ['10', '20', '50'],
              showTotal: () => {
                return `共 ${subject.SubjectPage.total} 条`;
              },
              position: 'bottom',
              current: current,
              pageSize: size,
              total: total,
            }}
            dataSource={subject.SubjectPage.records}
          />
        </div>
        <Modal
          title={this.state.modalTitle}
          style={{ width: 400, height: 600 }}
          onCancel={e => {
            this.setState({
              ...this.state,
              modalShowFlag: false,
              currentSubject: {
                id: '',
                typeName: '',
                subjectClass: {
                  id: '',
                  subjectName: '',
                  parentId: '',
                  remark: '',
                  synonym: '',
                },
              },
            });
          }}
          onOk={e => {
            this.refs.subjectForm.validateFields((errors, values) => {
              if (!errors) {
                this.saveSubject(values);
              }
            });
          }}
          visible={this.state.modalShowFlag}
          okText="保存"
          cancelText="关闭"
        >
          {modalContent}
        </Modal>
      </div>
    );
  }
}

export default Subject;
