import React, { Component } from 'react';
import styles from './style.less';

class PageTemplate extends Component {
  render() {
    const { title, status, color, children } = this.props;
    return (
      <div className={styles.page}>
        <div className={styles.header}>
          {title}
          <span style={{ color: color }}>{status}</span>
        </div>
        <div className={styles.content}>{children}</div>
      </div>
    );
  }
}

export default PageTemplate;
