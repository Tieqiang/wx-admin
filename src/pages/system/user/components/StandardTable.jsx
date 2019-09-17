import { Alert, Table } from 'antd';
import React, { Component, Fragment } from 'react';

import styles from './style.less';

// function initTotalList(columns) {
//   if (!columns) {
//     return [];
//   }

//   const totalList = [];
//   columns.forEach(column => {
//     if (column.needTotal) {
//       totalList.push({ ...column, total: 0 });
//     }
//   });
//   return totalList;
// }

class StandardTable extends Component {
  constructor(props) {
    super(props);
    const { columns } = props;
    this.state = {};
  }
  handleTableChange = (pagination, filters, sorter, ...rest) => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(pagination, filters, sorter, ...rest);
    }
  };

  render() {
    const { data, ...rest } = this.props;
    const { list = [], pagination = false } = data || {};
    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      pageSizeOptions: ['10', '20', '50'],
      showTotal: total => {
        return `共 ${pagination.total} 条`;
      },
      // showTotal: true,
      ...pagination,
    };
    return (
      <div className={styles.standardTable}>
        <Table
          size="small"
          rowKey={record => record.id}
          dataSource={list}
          pagination={paginationProps}
          onChange={this.handleTableChange}
          {...rest}
        />
      </div>
    );
  }
}

export default StandardTable;
