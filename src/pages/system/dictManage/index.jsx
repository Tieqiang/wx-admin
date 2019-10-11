import React, {Component} from "react";
import {connect} from "dva";
import dictModel from "../../../models/system/dictModel";
import {Button, Col, Modal, Row, Table, message} from "antd";
import Search from "antd/es/input/Search";
import globalStyles from '@/global.less';
import DictForm from "./components/DictForm";
import DictTypeForm from "./components/DictTypeForm";
import DictManagerService from "@/services/system/DictManagerService"


@connect(({dictModel}) => ({dictModel}))
class DictManage extends Component {


  state = {
    currentDictType: {
      id: "",
      name: "",
      typeCode: ""
    },
    savedTypeCode: "",
    dictTypeModalView: false,
    currentSelectedKeys: [],
    dictValueModalView:false,
    //当前字典编辑
    editDictType: {
      id: "",
      name: "",
      typeCode: ""
    },
    editDictValue:{
      id:"",
      name:"",
      value:"",
      typeId:""
    }
  };

  componentDidMount() {
    this.init();
  }

  init() {
    this.getDictTypeData("").then(res => {
      let {dictTypePage} = this.props.dictModel;
      if (dictTypePage.records.length > 0) {
        let index = 0;
        if (this.state.savedTypeCode) {
          index = dictTypePage.records.findIndex(item => {
            return item.typeCode === this.state.savedTypeCode;
          });
        }

        index = index > -1 ? index : 0;

        this.selectDictType(dictTypePage.records[index], [index])
      }
    });
  }

  columns = [
    {
      title: "字典名称",
      key: "name",
      dataIndex: "name",
      width:100,
    },
    {
      title: "字典编码",
      key: "typeCode",
      dataIndex: 'typeCode',
      width:100,
    },
    {
      title: "操作",
      key: "id",
      dataIndex: "id",
      width:100,
      fixed:"right",
      render: (text, record, index) => {
        return (
          <div>
            <Button type={"link"} onClick={e => {
              e.preventDefault();
              this.deleteDictType(text, record);
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
  deleteDictType(id, record) {
    // alert(id);
    Modal.confirm({
      title: "系统提示",
      content: "确认要删除名称为[" + record.name + "] 的字典",
      okText: "确认删除",
      cancelText: "取消删除",
      onOk: (e) => {
        let {dispatch} = this.props;
        return dispatch({
          type: "dictModel/removeDictType",
          payload: {
            id: id
          }
        }).then(res => {
          this.init();
        })
      }
    });
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

  selectDictType(record, selectedRowKeys = []) {
    let {dispatch} = this.props;
    this.setState({
      ...this.state,
      currentDictType: {
        ...record
      },
      currentSelectedKeys: selectedRowKeys
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
  saveDictType(value) {
    // console.log(value);
    DictManagerService.saveDictType(value).then(res => {
      if (res) {
        message.success("添加成功！");
        this.setState({
          ...this.state,
          dictTypeModalView: false,
          savedTypeCode:value.typeCode
        });
        this.init();
      } else {
        message.error("保存失败,请检查！")
      }
    }) ;
  }

  openDictTypeForm(action='add'){
    if(action==='add'){
      this.setState({
        ...this.state,
        dictTypeModalView:true,
        editDictType: {
          id: "",
          name: "",
          typeCode: ""
        }
      })
    }else if(action==='edit'){
      console.log(this.state.currentDictType)
      this.setState({
        ...this.state,
        dictTypeModalView:true,
        editDictType:{
          ...this.state.currentDictType
        }
      })
    }else{
      return ;
    }
  }

  openDictValueForm(record){

    if(!record){
      record={
        id:"",
        name:"",
        value:"",
        typeId:""
      }
    }

    this.setState({
      ...this.state,
      dictValueModalView:true,
      editDictValue:{
        ...record
      }
    })
  }

  saveDictValue(value){
    DictManagerService.saveDict(value).then(res => {
      if (res) {
        message.success("操作成功！");
        this.setState({
          ...this.state,
          dictValueModalView: false,
        });
        this.selectDictType(this.state.currentDictType,this.state.currentSelectedKeys&&this.state.currentSelectedKeys.length>0?this.state.currentSelectedKeys[0]:0);
      } else {
        message.error("保存失败,请检查！")
      }
    }) ;
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
                  type="default"
                  className={globalStyles.right}
                  onClick={() => {
                    this.openDictTypeForm('add');
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
                    this.openDictValueForm();
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
                <h4 style={{textAlign:'center','color':"red"}}>双击进行编辑</h4>
              </Col>
            </Row>
          </div>
        </div>
        <div className={globalStyles.tableBox}>
          <Row>
            <Col span={6} style={{marginRight: 2}}>
              <Table
                title={() => {
                  return (<h3 style={{'textAlign': 'center'}}>数据字典</h3>)
                }}
                scroll={{x:390,y: 'calc(100vh - 300px)'}}
                pagination={false}
                bordered={true}
                showHeader={true}
                onRowClick={
                  (record, index) => {
                    this.selectDictType(record, [index]);
                  }
                }
                onRow={
                  (record,index) => {
                    return {
                      onDoubleClick:event=>{
                        console.log(record);
                        this.openDictTypeForm("edit")
                      }
                    }
                  }
                }
                rowSelection={{
                  columnTitle: "选择",
                  type: 'radio',
                  selectedRowKeys: this.state.currentSelectedKeys,
                  onChange: ((selectedRowKeys, selectRows) => {
                    this.selectDictType(selectRows[0], selectedRowKeys);
                  }),
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
                scroll={{x:'1000',y: 'calc(100vh - 300px)'}}
                pagination={false}
                showHeader={true}
                onRow={record => {
                  return {
                    onDoubleClick:event=>{
                      this.openDictValueForm(record);
                    }
                  }
                }}
                bordered={true}/>

            </Col>
          </Row>

          <Modal>
            <DictForm/>
          </Modal>
          <Modal
            title={"字典编辑"}
            onOk={(e) => {
              this.refs.dictTypeForm.validateFields((errors, value) => {
                console.log(errors);
                if (!errors) {
                  this.saveDictType(value);
                }
              })
            }}
            onCancel={(e)=>{
              this.setState({
                ...this.state,
                dictTypeModalView:false
              })
            }}
            visible={this.state.dictTypeModalView}>
            <DictTypeForm currentDictType={this.state.editDictType} ref={"dictTypeForm"}/>
          </Modal>

          <Modal
            visible={this.state.dictValueModalView}
            onCancel={
              e=>{
                e.preventDefault();
                this.setState({
                  ...this.state,
                  dictValueModalView:false
                })
              }
            }
            onOk={e=>{
              e.preventDefault();
              this.refs.dictValueForm.validateFields((errors,value) =>{
                if(!errors){
                  this.saveDictValue(value);
                }
              })
            }}
            title={"键值编辑"}>
            <DictForm currentDict={this.state.editDictValue} currentDictType={this.state.currentDictType} ref={"dictValueForm"}/>
          </Modal>

        </div>

      </div>
    )
  }

}

export default DictManage