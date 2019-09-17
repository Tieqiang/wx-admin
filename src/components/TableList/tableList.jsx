import { Table } from 'antd';
import React, { Component, Fragment } from 'react';
import styles from './style.less';

class TableList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { data, columns, onChange, scroll, onRow } = this.props;
    const { records } = data;
    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      pageSizeOptions: ['10', '20', '50'],
      showTotal: () => {
        return `共 ${data.total} 条`;
      },
      total: data.total,
      current: data.current,
      pageSize: data.size,
    };
    return (
      <Table
        className={styles.standardTable}
        size="small"
        // bordered
        rowKey={record => record.id}
        columns={columns}
        pagination={paginationProps}
        dataSource={records}
        scroll={{ ...scroll, y: 'calc(100vh - 245px)' }}
        onChange={onChange}
        onRow={onRow}
      />
    );
  }
}

export default TableList;
