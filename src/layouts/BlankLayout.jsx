import React, { Component } from 'react';
import router from 'umi/router';

// const { Header, Footer, Sider, Content } = Layout;

class BlankLayout extends Component {
  render() {
    let { children } = this.props;
    return <div style={{ height: '100%' }}>{children}</div>;
  }
}

export default BlankLayout;
