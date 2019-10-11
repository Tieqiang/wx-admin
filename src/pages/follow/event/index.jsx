import React, {Component} from "react";
import globalStyles from '@/global.less';
import {Button, Col, Modal, Row, Table} from "antd";
import Search from "antd/es/input/Search";
import {connect} from "dva";

@connect(({FollowEventModel})=>({FollowEventModel}))
class FollowEvent extends Component {

  columns=[
    {
      title:"事件类型",
      key:"",
      width:"30%",
      dataIndex:"",
    },
    {
      title:"事件名称",
      key:"",
      dataIndex:"",
    },
    {
      title:"操作",
      key:"",
      dataIndex:"",
      width:'10%'
    },
  ];
  render() {
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
                  }}
                >
                  新增随访事件
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
        <div className={globalStyles.tableBox}>
          <Table
            scroll={{x: '1366', y: 'calc(100vh - 300px)'}}
            columns={this.columns}
            showHeader={true}
            onRow={record => {
              return {
                onDoubleClick: event => {
                }
              }
            }}
            bordered={true}/>
        </div>

      </div>
    )
  }
}

export default FollowEvent;