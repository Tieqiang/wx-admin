import React, {Component} from "react";
import globalStyles from '@/global.less';
import {Button, Col, Input, Modal, Row, Table, message} from "antd";
import {connect} from "dva";
import PatEditForm from "./PatEditForm";

@connect(({patAdmitModel}) => ({patAdmitModel}))
class AdmitIndex extends Component {

  state = {
    params: {
      patId: "",
      phoneNum: "",
      patName: "",
      idNo: "",
      inpNo: ""
    },
    patEditModalVisible: false,
    currentPat: {}
  };

  patColumns = [
    {
      title: "序号",
      key: "id",
      dataIndex: "id",
      width: 60,
      align: 'center',
      render: (text, record, index) => {
        return <span>{index + 1}</span>
      }
    },
    {
      title: "病人姓名",
      key: 'patName',
      dataIndex: "patName"
    },
    {
      title: "身份证号",
      key: "idNo",
      dataIndex: "idNo"
    },
    {
      title: "联系电话",
      key: "phoneNum",
      dataIndex: "phoneNum"
    },
    {
      title: "病人ID",
      key: "patId",
      dataIndex: "patId"
    },
    {
      title: "住院号",
      key: "patNo",
      dataIndex: "patNo"
    },
    {
      title: "微信号",
      key: "openId",
      dataIndex: "openId"
    },
    {
      title: "操作",
      align: "center",
      width: 180,
      render: (text,record) => {
        return (
          <div>
            <Button type={"link"}>绑定</Button>
            <Button
              onClick={
                e=>{
                  e.preventDefault();
                  this.setState({
                    ...this.state,
                    patEditModalVisible:true,
                    currentPat:{
                      ...record
                    }
                  })
                }
              }
              type={"link"}>编辑</Button>
          </div>
        )
      }
    }
  ];

  componentDidMount() {
    this.searchPat();
  }

  /**
   * 病人信息查询
   */
  searchPat() {
    let {dispatch} = this.props;
    dispatch({
      type: "patAdmitModel/searchPats",
      payload: this.state.params
    })
  }

  render() {

    return (
      <div>
        <div className={globalStyles.headBox}>
          <div className={globalStyles.searchBox}>
            <Row>
              <Col>
                <Input
                  onChange={value => {
                    this.setState({
                      ...this.state,
                      params: {
                        ...this.state.params,
                        patName: value.target.value
                      }
                    })
                  }}
                  value={this.state.params.patName}
                  style={{width: 200}}
                  placeholder={"输入姓名进行检索"}
                  className={globalStyles.left}/>
                <Input
                  onChange={value => {
                    this.setState({
                      ...this.state,
                      params: {
                        ...this.state.params,
                        idNo: value.target.value
                      }
                    })
                  }}
                  value={this.state.params.idNo}
                  placeholder={"请输入身份证号进行检索"}
                  className={globalStyles.left}
                  style={{width: 200}}/>
                <Input
                  onChange={value => {
                    this.setState({
                      ...this.state,
                      params: {
                        ...this.state.params,
                        inpNo: value.target.value
                      }
                    })
                  }}
                  value={this.state.params.inpNo}
                  placeholder={"请输入住院号进行检索"} className={globalStyles.left} style={{width: 200}}/>
                <Input
                  onChange={value => {
                    this.setState({
                      ...this.state,
                      params: {
                        ...this.state.params,
                        phoneNum: value.target.value
                      }
                    })
                  }}
                  value={this.state.params.phoneNum}
                  placeholder={"请输入手机号进行检索"} className={globalStyles.left} style={{width: 200}}/>
                <Input
                  onChange={value => {
                    this.setState({
                      ...this.state,
                      params: {
                        ...this.state.params,
                        patId: value.target.value
                      }
                    })
                  }}
                  value={this.state.params.patId}
                  placeholder={"请输入病人ID进行检索"} className={globalStyles.left} style={{width: 200}}/>
                <Button type={"primary"} icon={'search'} onClick={
                  e => {
                    this.searchPat();
                  }
                }>检索</Button>
                <Button type={"default"} icon={'delete'} onClick={
                  e => {
                    this.setState({
                      ...this.state,
                      params: {
                        patId: "",
                        phoneNum: "",
                        patName: "",
                        idNo: "",
                      }
                    })
                  }
                }>重置</Button>
                <Button
                  onClick={
                    e => {
                      e.preventDefault();
                      this.setState({
                        ...this.state,
                        patEditModalVisible: true,
                      });
                    }
                  }
                  type={"primary"}
                  icon={'plus'}
                  className={globalStyles.right}>添加病人</Button>
              </Col>
            </Row>
          </div>
        </div>
        <div className={globalStyles.tableBox}>
          <Table
            columns={this.patColumns}
            dataSource={this.props.patAdmitModel.pats.records}
            bordered={true}/>
        </div>
        <Modal
          title={"病人信息编辑"}
          onCancel={e => {
            e.preventDefault();
            this.setState({
              ...this.state,
              patEditModalVisible: false,
            })
          }}
          onOk={e => {
            e.preventDefault();
            this.refs.patEditForm.validateFields((errors, values) => {
              let {dispatch} = this.props;
              if (!errors) {
                return dispatch({
                  type: "patAdmitModel/savePat",
                  payload: values
                }).then(res => {
                  message.success("操作成功！");
                  this.setState({
                    ...this.state,
                    patEditModalVisible: false,
                    currentPat: {}
                  })
                }).then(res => {
                  this.searchPat();
                })
              }
            })
          }}
          visible={this.state.patEditModalVisible}>
          <PatEditForm currentPat={this.state.currentPat} ref={"patEditForm"}/>
        </Modal>
      </div>
    )
  }

}

export default AdmitIndex;