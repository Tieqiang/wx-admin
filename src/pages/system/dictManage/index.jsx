import React, {Component} from "react";
import {connect} from "dva";
import dictModel from "../../../models/system/dictModel";
import {Button, Col, Modal, Row, Table} from "antd";
import Search from "antd/es/input/Search";
import globalStyles from '@/global.less';
import DictForm from "./components/DictForm";
import DictTypeForm from "./components/DictTypeForm";


@connect(({dictModel}) => ({dictModel}))
class DictManage extends Component {


  state = {
    currentDictType: {
      id: "",
      name: ""
    },
    dictTypeModalView:true,
    currentSelectedKeys: [],
    //当前字典编辑
    editDictType:{
      id:"",
      name:""
    }
  };

  componentDidMount() {
    this.init();
  }

  init(){
    this.getDictTypeData("").then(res=>{
      let {dictTypePage} = this.props.dictModel ;
      if(dictTypePage.records.length>0){
        this.selectDictType(dictTypePage.records[0],[0])
      }
    }) ;
  }

  columns = [
    {
      title: "字典名称",
      key: "name",
      dataIndex: "name",
      width: "50%",
    },
    {
      title: "操作",
      key: "id",
      dataIndex: "id",
      align: 'center',
      width: '30%',
      render: (text, record, index) => {
        return (
          <div>
            <Button type={"link"} onClick={e => {
              e.preventDefault();
              this.deleteDictType(text,record);
            }}>删除</Button>
          </div>
        )
      }
    }
  ];

  valueColumns = [
    {
      title: "键名",
      key: "name",
      dataIndex: "name",
      width: "40"
    },
    {
      title: "键值",
      key: "value",
      dataIndex: 'value',
      width: '40%'
    },
    {
      title: "操作",
      key: 'id',
      dataIndex: "id",
      width: "20%",
      align: 'center',
      render: (text, record) => {
        return (
          <Button type={"link"} onClick={e => {
            //删除键值
            this.deleteKeyValue(text);
          }}>删除</Button>
        )
      }
    }
  ];

  //删除字典
  deleteDictType(id,record) {
    // alert(id);
    Modal.confirm({
      title:"系统提示",
      content:"确认要删除名称为["+record.name+"] 的字典",
      okText:"确认删除",
      cancelText:"取消删除",
      onOk:(e)=>{
        let {dispatch} = this.props ;
        return dispatch({
          type:"dictModel/removeDictType",
          payload:{
            id:id
          }
        }).then(res=>{
          this.init();
        })
      }
    }) ;
  }

  getDictTypeData(typeName, pageSize = 1000, currentPage = 0) {
    let {dispatch} = this.props;
    return dispatch({
      type: "dictModel/getDictTypeByPage",
      payload: {
        typeName: typeName,
        pageSize: pageSize,
        current: currentPage,
      }
    })
  }

  selectDictType(record,selectedRowKeys=[]) {
    let {dispatch} = this.props;
    this.setState({
      ...this.state,
      currentDictType: {
        ...record
      },
      currentSelectedKeys:selectedRowKeys
    });
    dispatch({
      type: "dictModel/getDictValues",
      payload: {
        dictType: record.id,
      }
    })
  }


  //删除键值
  deleteKeyValue(text) {
    Modal.confirm({
      title: "系统提示",
      content: "确定要删除该键值么？",
      okText: "确定删除",
      cancelText: "取消删除",
      onOk: () => {
        let {dispatch} = this.props;
        dispatch({
          type: "dictModel/removeDict",
          payload: {
            id: text
          }
        }).then(res => {
          if (res) {
            this.selectDictType(this.state.currentDictType)
          }
        });
      }
    })
  }
  //保存字典
  saveDictType(value){

  }

  render() {
    let {dictTypePage, currentKeyValue} = this.props.dictModel;
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
                    // this.openModalForm({}, 'add');
                  }}
                >
                  新增字典
                </Button>
                <Button
                  icon="plus"
                  type="primary"
                  className={globalStyles.right}
                  onClick={() => {
                    // this.openModalForm({}, 'add');
                  }}
                >
                  新增键值
                </Button>
                <Search
                  placeholder="请输入字典名称进行查询"
                  onSearch={(value, event) => {
                    event.preventDefault();
                    this.getDictTypeData(value);
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
          <Row>
            <Col span={6} style={{marginRight: 2}}>
              <Table
                title={currentPageData => {
                  // console.log(currentPageData);
                  return (<h3 style={{'textAlign': 'center'}}>数据字典</h3>)
                }}

                scroll={{y: 'calc(100vh - 180px)'}}
                pagination={false}
                bordered={true}
                showHeader={true}
                onRowClick={
                  (record,index)=>{
                    this.selectDictType(record,[index]) ;
                  }
                }
                rowSelection={{
                  columnTitle: "选择",
                  columnWidth: "20%",
                  type: 'radio',
                  selectedRowKeys: this.state.currentSelectedKeys,
                  onChange: ((selectedRowKeys,selectRows) => {
                    this.selectDictType(selectRows[0],selectedRowKeys);
                  }),
                  // onSelect: ((record, selected) => {
                  //   if (selected) {
                  //     this.selectDictType(record);
                  //   }
                  // })
                }}
                dataSource={dictTypePage.records}
                columns={this.columns}/>
            </Col>
            <Col span={17}>
              <Table
                title={currentPageData => {
                  return (<h3 style={{textAlign: 'center'}}>
                    <span
                      style={{color: 'red'}}>{this.state.currentDictType.name ? this.state.currentDictType.name : "请选择字典"}</span>
                    键值信息
                  </h3>)
                }}
                columns={this.valueColumns}
                dataSource={currentKeyValue}
                scroll={{y: 'calc(100vh - 180px)'}}
                pagination={false}
                showHeader={true}
                bordered={true}/>
            </Col>
          </Row>

          <Modal>
            <DictForm/>
          </Modal>
          <Modal
            title={"字典编辑"}
            onOk={(e)=>{
              this.refs.dictTypeForm.validateFields((errors,value)=>{
                // console.log(errors);
                if(!errors){
                  this.saveDictType(value) ;
                }
              })
            }}
            visible={this.state.dictTypeModalView}>
            <DictTypeForm currentDictType={this.state.editDictType} ref={"dictTypeForm"}/>
          </Modal>

        </div>

      </div>
    )
  }

}

export default DictManage