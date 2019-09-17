import { Component } from 'react';
import { connect } from 'dva';
import StandardTable from '@/components/TableList/tableList';
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
} from 'antd';
import Button from 'antd/es/button';
import Search from 'antd/es/input/Search';
import styles from './style.less';
import KeywordForm from './components/KeywordForm';
import globalStyles from '@/global.less';

@connect(({ keywords, userManage }) => ({ keywords, userManage }))
class Keywords extends Component {
  state = {
    keyword: '',
    showEditModal: false,
    modalTile: '',
    currentKeyword: {},
    page: '1',
    pageSize: '20',
  };

  constructor(props) {
    super(props);
  }

  //保存关键词
  saveKeywords = keyword => {
    let { dispatch } = this.props;
    dispatch({
      type: 'keywords/mergeKeywords',
      payload: keyword,
    }).then(res => {
      message.success('保存成功！');
      this.setState({
        ...this.state,
        showEditModal: false,
      });
      this.searchKeyWords(this.state.keyword, this.state.page, this.state.pageSize);
    });
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
      title: '关键词名称',
      dataIndex: 'keysName',
      key: 'keysName',
      align: 'center',
      className: styles.columnBack,
    },
    {
      title: '同义词',
      dataIndex: 'synonym',
      key: 'synonym',
      width: 240,
      align: 'center',
      className: styles.columnBack,
    },
    {
      title: '创建日期',
      dataIndex: 'createDate',
      key: 'createDate',
      width: 220,
      align: 'center',
      className: styles.columnBack,
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
      title: '创建者',
      dataIndex: 'creator',
      key: 'creator',
      width: 220,
      align: 'center',
      className: styles.columnBack,
      render: (text, record, index) => {
        let { userManage } = this.props;
        let nickName = '';
        if (text && userManage && userManage.userAllList instanceof Array) {
          let creator = userManage.userAllList.find(item => {
            return item.id === text;
          });
          if (creator) {
            nickName = creator.nikeName;
          }
        }
        return <div>{nickName}</div>;
      },
    },
    {
      title: '备注',
      dataIndex: 'remark',
      key: 'remark',
      width: 340,
      align: 'left',
      className: styles.columnBack,
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
                    content: '是否确认停用名称为：' + record.keysName + ' 的关键词？',
                    onOk: () => {
                      this.removeKeyword(record);
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

  componentDidMount() {
    this.searchKeyWords();
  }

  searchKeyWords = (keywords, page = 1, pageSize = 20) => {
    let { dispatch } = this.props;
    this.setState({
      ...this.state,
      page: page,
      pageSize: pageSize,
    });
    dispatch({
      type: 'keywords/getKeys',
      payload: {
        keyName: keywords ? keywords : '',
        page: page,
        pageSize: pageSize,
      },
    });
  };
  closeModal = () => {
    this.setState({
      ...this.state,
      showEditModal: false,
      currentKeyword: {},
    });
  };

  //打开Modal窗口
  openModal(keyword, type) {
    // this.refs.keywordForm.setFields(keyword) ;
    const typeModal = type === 'update' ? '编辑关键词' : '添加关键词';
    this.setState({
      ...this.state,
      showEditModal: true,
      currentKeyword: keyword,
      modalTile: typeModal,
    });
  }

  removeKeyword = record => {
    let { dispatch } = this.props;
    dispatch({
      type: 'keywords/removeKeyWord',
      payload: {
        ...record,
      },
    }).then(res => {
      message.success('停用成功！');
      this.searchKeyWords(this.state.keyword, this.state.page, this.state.pageSize);
    });
  };

  // 表格页码变化时
  handleTableChangeFun = pagination => {
    this.searchKeyWords(this.state.keyword, pagination.current, pagination.pageSize);
  };

  render() {
    let { keywords } = this.props;
    let datas = keywords.keyWords ? keywords.keyWords : { records: [] };
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
                  添加
                </Button>
                <Search
                  placeholder="请输入关键词进行查询"
                  className={globalStyles.left}
                  onSearch={value => {
                    this.setState({
                      ...this.state,
                      keyword: value,
                    });
                    this.searchKeyWords(value);
                  }}
                  style={{ width: 240 }}
                  enterButton="查询"
                />
              </Col>
            </Row>
          </div>
        </div>
        <div className={globalStyles.tableOneBox}>
          <StandardTable
            data={datas}
            rowKey="id"
            onChange={this.handleTableChangeFun}
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
          />
        </div>

        <Modal
          visible={this.state.showEditModal}
          onOk={() => {
            // alert('ok')
            this.refs.keywordForm.validateFields((error, values) => {
              if (!error) {
                //验证通过
                this.saveKeywords(values);
              }
            });
          }}
          onCancel={() => {
            this.closeModal();
          }}
          title={this.state.modalTile}
          okText="保存"
          cancelText="关闭"
        >
          <KeywordForm ref="keywordForm" {...this.state.currentKeyword} />
        </Modal>
      </div>
    );
  }
}

export default Keywords;
