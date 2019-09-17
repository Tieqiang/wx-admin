import React, { Component } from 'react';
import { Breadcrumb, Icon } from 'antd';
import router from 'umi/router';
import styles from './style.less';

class BreadcrumbComponent extends Component {
  render() {
    let { breadcrumbRouter, recordCount, totalCount } = this.props;
    return (
      <div className={styles.navBox}>
        <div className={styles.breadcrumb}>
          <Breadcrumb>
            <Breadcrumb.Item>
              <Icon type="home" /> <a href="/">首页</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <a href={breadcrumbRouter.path}>{breadcrumbRouter.name}</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>{breadcrumbRouter.currentTitle}</Breadcrumb.Item>
          </Breadcrumb>
          {totalCount ? (
            <div className={styles.statistic}>
              检索结果
              <span className={styles.number}>{Number(recordCount).toLocaleString('en-US')}</span>
              条信息&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;共
              <span className={styles.number}>{Number(totalCount).toLocaleString('en-US')}</span>
              条信息
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

export default BreadcrumbComponent;
