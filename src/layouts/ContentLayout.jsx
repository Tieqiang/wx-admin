import React, { Component } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import HeaderComponent from '@/components/front/header';
import BreadcrumbComponent from '@/components/front/Breadcrumb';
import FooterBox from '@/components/front/footerLink';
import styles from './BlankLayout.less';

class ContentLayout extends Component {
  getFooterBox() {
    let { hasFooterLink } = this.props;
    if (hasFooterLink) {
      return <FooterBox hasCopyRight={true} />;
    } else {
      return <div></div>;
    }
  }
  render() {
    let { children, breadcrumbRouter } = this.props;
    return (
      <div className={styles.resultPage}>
        <HeaderComponent />
        <BreadcrumbComponent breadcrumbRouter={breadcrumbRouter} />
        <div className={styles.resultContent}>{children}</div>
        {/* {this.getSkeleton()} */}
        {this.getFooterBox()}
      </div>
    );
  }
}

export default ContentLayout;
