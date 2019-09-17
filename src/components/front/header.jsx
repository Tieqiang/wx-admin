import React, { Component } from 'react';
import { Button, Icon, Avatar } from 'antd';
import { connect } from 'dva';
import iconFont from '../../../public/assets-front/iconfont';
import styles from './style.less';
import router from 'umi/router';

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: iconFont,
});

@connect(({ user, loginMessage, login }) => ({ user, loginMessage, login }))
class HeaderComponent extends Component {
  componentDidMount() {
    this.loadCurrentUser();
  }

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
    return (
      <div className={styles.headBox}>
        <div className={styles.headContent}>
          <div
            className={styles.headLogo}
            onClick={() => {
              router.push('/');
            }}
          >
            竞争情报与政策研究平台
          </div>
          {this.btnGroup()}
        </div>
      </div>
    );
  }
}

export default HeaderComponent;
