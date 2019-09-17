import React, { Component } from 'react';
import styles from './BlankLayout.less';
import { Button, Icon, Avatar } from 'antd';
import { connect } from 'dva';
import router from 'umi/router';
import iconFont from '../../public/assets-front/iconfont';

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: iconFont,
});

// const { Header, Footer, Sider, Content } = Layout;

@connect(({ user, loginMessage, login }) => ({ user, loginMessage, login }))
class IndexLayout extends Component {
  componentDidMount() {
    this.loadCurrentUser();
  }

  componentWillReceiveProps(nextProps, nextContext) {}

  loadCurrentUser() {
    let { dispatch } = this.props;
    dispatch({
      type: 'user/fetchCurrent',
      payload: {},
    });
  }

  showLoginModal() {
    let { dispatch } = this.props;
    dispatch({
      type: 'loginMessage/setShowFrontLoginModal',
      payload: true,
    });
  }
  logout() {
    let { dispatch } = this.props;
    dispatch({
      type: 'login/logout',
      payload: {},
    }).then(res => {
      window.location.href = '/';
    });
  }
  btnGroup() {
    let { currentUser } = this.props.user;
    if (currentUser.user) {
      return (
        <div className={styles.headBtn}>
          <Icon type="bell" style={{ color: '#004EA2' }} />
          <span style={{ margin: '0 15px' }}>
            <Avatar size="small" style={{ marginTop: '-4px' }} src="assets-front/avator.png" />
            <Button
              type="link"
              style={{ padding: '5px' }}
              onClick={e => {
                // this.showLoginModal();
                router.push('/usercenter');
              }}
            >
              {currentUser.user.username}
            </Button>
          </span>
          <IconFont
            type="icon-Logout"
            style={{ color: '#004EA2' }}
            onClick={e => {
              this.logout();
            }}
          />
        </div>
      );
    } else {
      return (
        <div className={styles.headBtn}>
          <Avatar size="small" style={{ marginTop: '-4px' }} src="assets-front/avator.png" />
          <Button
            type="link"
            style={{ padding: '10px' }}
            onClick={e => {
              this.showLoginModal();
            }}
          >
            请登录
          </Button>
        </div>
      );
    }
  }
  render() {
    let { children } = this.props;
    let { currentUser } = this.props.user;
    return (
      <div className={styles.indexFront}>
        <div className={styles.head}>
          <div className={styles.headTitle}>竞争情报与政策研究平台</div>
          {this.btnGroup()}
        </div>
        {children}
        {/* <Footer>CopyRight@2019-2020</Footer> */}
      </div>
    );
  }
}

export default IndexLayout;
