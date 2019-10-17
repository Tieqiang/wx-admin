import React, { Component } from "react";
import globalStyles from '@/global.less';
import { Button, Col, Modal, Row, Table } from "antd";
import Search from "antd/es/input/Search";
import { connect } from "dva";

@connect(({ FollowEventModel }) => ({ FollowEventModel }))
class FollowEvent extends Component {

  state={
    modalVisible:true,
    modalTtile:"随访事件编辑"
  }

  componentDidMount() {
    this.loadFollowEvent()
  }

  loadFollowEvent(eventType = "", eventName = "") {
    let { dispatch } = this.props;
    dispatch({
      type: "FollowEventModel/getFollowEvent",
      payload: {
        eventType: eventType,
        eventName: eventName
      }
    })
  }

  columns = [
    {
      title: "事件类型",
      key: "",
      width: "30%",
      dataIndex: "",
    },
    {
      title: "事件名称",
      key: "",
      dataIndex: "",
    },
    {
      title: "操作",
      key: "",
      dataIndex: "",
      width: '10%'
    },
  ];
  render() {
    let { FollowEventModel } = this.props;
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
                    this.setState({
                      ...this.state,
                      modalVisible:true,
                      modalTtile:"新增随访事件"
                    })
                  }}
                >
                  新增随访事件
                </Button>


                <Search
                  placeholder="请输入事件名成进行查询"
                  onSearch={(value, event) => {
                  }}
                  style={{ width: 240 }}
                  className={globalStyles.left}
                  enterButton="查询"
                />
              </Col>
            </Row>
          </div>
        </div>
        <div className={globalStyles.tableBox}>
          <Table
            scroll={{ x: '1366', y: 'calc(100vh - 300px)' }}
            columns={this.columns}
            showHeader={true}
            dataSource={FollowEventModel.followEventPage.records}
            onRow={record => {
              return {
                onDoubleClick: event => {
                }
              }
            }}
            bordered={true} />
        </div>
        <Modal
          onCancel={ e=>{
            e.preventDefault();
            this.setState({
              ...this.state,
              modalVisible:false,
            })
          }}
          visible={this.state.modalVisible}
          title={this.state.modalTtile}>

        </Modal>
      </div>
    )
  }
}

export default FollowEvent;